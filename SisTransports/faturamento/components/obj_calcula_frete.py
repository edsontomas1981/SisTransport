from math import ceil
from Classes.utils import dprint, dpprint, toFloat
from comercial.classes.tabelaFrete import TabelaFrete
from comercial.classes.tblFaixa import TabelaFaixa

# {'vlrNf': '1661.79', 'volumes': 90, 'peso': 634, 
# 'm3': 0, 'idDtc': '183', 'idTabela': '72'}

# {'id': 72, 'freteMinimo': Decimal('180.00'), 
# 'descricao': 'GLACE INTERIOR', 'icmsIncluso': True, 
# 'bloqueada': True, 'frete': Decimal('10.00'), 
# 'tipoCalculo': 3, 'adValor': Decimal('0.00'), 
# 'gris': Decimal('0.00'), 'despacho': Decimal('0.00'), 
# 'outros': Decimal('0.00'), 'pedagio': Decimal('0.00'), 
# 'tipoPedagio': 2, 'cubagem': False, 
# 'fatorCubagem': 300, 'tipoTabela': 1, 
# 'aliquotaIcms': 7} 



class FreightCalculator:
    def __init__(self,dados):
        tab = TabelaFrete()
        tab.readTabela(dados['idTabela'])
        self.tabela = tab.tabela
        self.vlrNf = dados['vlrNf']
        self.volumes = dados['volumes']
        self.peso = dados['peso']
        self.m3 = dados['m3']
        self.peso_cubado = self.calcula_cubagem()
        self.peso_faturado = self.peso_calcular()
        self.aliquota_icms = self.gera_percentual_aliquota()
        self.soma_total = 0.0
        self.subtotal = []


    def gera_percentual_aliquota(self):
        if self.tabela.aliquotaIcms <= 0:
            self.tabela.aliquotaIcms = 0
        else:
            return round(1 - (self.tabela.aliquotaIcms / 100),2)
        
    def calcula_cubagem(self):
        if toFloat(self.m3) > 0:
            if self.tabela.fatorCubagem > 0:
                return self.tabela.fatorCubagem * self.m3
            else:
                return 0
        else:
            return 0
    
    def peso_calcular(self):
        self.peso = toFloat(self.peso)
        self.peso_cubado = toFloat(self.peso_cubado)
        
        if self.peso >= self.peso_cubado and self.peso > 0:
            return self.peso
        elif self.peso_cubado > 0:
            return self.peso_cubado
        elif self.peso > 0:
            return self.peso
        else:
            return 0        

    def calcula_frete(self):
        self.calcula_advalor()
        self.calcula_gris()
        self.calcula_pedagio()
        if self.tabela.tipoCalculo == 1:# calculo frete peso
            self.calcula_frete_peso()
        elif self.tabela.tipoCalculo == 2:# calculo frete valor
            self.calcula_frete_valor()
        elif self.tabela.tipoCalculo == 3:
            self.calcula_frete_volumes()

        self.despacho()
        self.soma_subtotais()   
        self.aplica_icms()

    def despacho(self):
        self.subtotal.append({'despacho':self.tabela.despacho})
    
    def outros(self):
        self.subtotal.append({'outros':self.tabela.outros})




    def calcula_frete_peso(self):
        self.tabela.frete = toFloat(self.tabela.frete)
        self.peso_faturado = toFloat(self.peso_faturado)
        if (self.frete_faixa()):
            self.subtotal.append({'frete_peso':self.frete_faixa()})
        else: 
            if self.tabela.frete > 0:
                if self.peso_faturado > 0:
                    self.subtotal.append({'frete_peso':self.tabela.frete * self.peso_faturado})

    def frete_faixa(self):
        faixa = TabelaFaixa()
        faixas = faixa.readFaixas(self.tabela.id)
        for i in faixas:
            if round(self.peso_faturado) in range(i.faixaInicial, (i.faixaFinal + 1)):
                return i.vlrFaixa
        else:
            return None
        
    def calcula_frete_volumes(self):
        self.subtotal.append({'frete_volume':toFloat(self.volumes) * float(self.tabela.frete)})        

    def calcula_frete_valor(self):
        self.subtotal.append({'frete_valor':toFloat(self.vlrNf) * float((self.tabela.frete / 100))})        

    def calcula_pedagio(self):
        if self.tabela.tipoPedagio == 1:
            self.subtotal.append({'pedagio':self.tabela.pedagio})
        elif self.tabela.tipoPedagio == 2:
            self.subtotal.append({'pedagio':ceil(self.peso_faturado / 100) * self.tabela.pedagio})            

    def calcula_gris(self):
        self.vlrNf = float(toFloat(self.vlrNf))
        if self.vlrNf > 0:
            if self.tabela.gris > 0:
                gris = float(self.tabela.gris / 100)
                self.subtotal.append({'gris':round(gris * self.vlrNf, 2)})

    def calcula_advalor(self):
        self.vlrNf = toFloat(self.vlrNf)
        if self.vlrNf > 0:
            if self.tabela.adValor > 0:
                advalor = float(self.tabela.adValor / 100)
                self.subtotal.append({'advalor':round(advalor * self.vlrNf, 2)})
    
    def soma_subtotais(self):
        self.soma_total = sum(float(valor) for sub_total in self.subtotal for valor in sub_total.values())

    def aplica_icms(self):
        if self.soma_total > 0:
            if self.aliquota_icms > 0:
                self.total_frete = round(float(self.soma_total) / float(self.aliquota_icms), 2)

   

