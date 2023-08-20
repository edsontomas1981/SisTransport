from math import ceil
from Classes.utils import dprint, toFloat
from comercial.classes.tabelaFrete import TabelaFrete
from comercial.classes.tblFaixa import TabelaFaixa
import decimal
import json



# {'id': 100, 'freteMinimo': Decimal('1500.00'), 'descricao': 'Tabela Geral Teste', 
# 'icmsIncluso': True, 'bloqueada': True, 'frete': Decimal('150.00'), 'tipoCalculo': 1, 
# 'adValor': Decimal('35.00'), 'gris': Decimal('3.90'), 'despacho': Decimal('55.00'), 
# 'outros': Decimal('35.00'), 'pedagio': Decimal('1.90'), 'tipoPedagio': 2, 'cubagem': True, 
# 'fatorCubagem': 300, 'tipoTabela': 2, 'aliquotaIcms': 0}

class FreightCalculator:
    def __init__(self,dados):
        tab = TabelaFrete()
        tab.readTabela(dados['idTabela'])
        self.tabela = tab.tabela
        self.vlrNf = dados['vlrNf']
        self.volumes = dados['volumes']
        self.peso = dados['peso']
        self.m3 = dados['m3']
        self.vlr_coleta=dados['vlrColeta']
        self.peso_cubado = self.calcula_cubagem()
        self.peso_faturado = self.peso_calcular()
        self.aliquota_icms = self.gera_percentual_aliquota()
        self.total_frete = 0.0
        self.subtotal = []

    def gera_percentual_aliquota(self):
        if self.tabela.aliquotaIcms <= 0:
            return 0
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
        
        if self.peso >= self.peso_cubado > 0:
            return self.peso
        elif self.peso_cubado > 0:
            return self.peso_cubado
        elif self.peso > 0:
            return self.peso
        else:
            return 0

    def calcula_frete(self):

        if not self.tabela:
            raise ValueError("Tabela de frete não encontrada")

        if self.tabela.tipoCalculo == 1:  # Cálculo de frete por peso
            self.calcula_frete_peso()
        elif self.tabela.tipoCalculo == 2:  # Cálculo de frete por valor
            self.calcula_frete_valor()
        elif self.tabela.tipoCalculo == 3:  # Cálculo de frete por volumes
            self.calcula_frete_volumes()
        
        self.calcula_advalor()
        self.despacho()
        self.calcula_gris()
        self.calcula_pedagio()
        self.outros()
        self.coleta()
        self.soma_subtotais()   
        self.aplica_icms()
        self.frete_menor_que_minimo()
        self.gera_subtotais_dict()

    def frete_menor_que_minimo(self):
        if self.total_frete < self.tabela.freteMinimo:
            self.total_frete = self.tabela.freteMinimo
            return True
        else:
            return False
        
    def aplica_icms(self):
        if self.total_frete > 0 and self.aliquota_icms > 0:
            self.total_frete = round(self.total_frete / self.aliquota_icms, 2)

    def despacho(self):
        if self.tabela and self.tabela.despacho > 0:
            self.subtotal.append({'despacho': self.tabela.despacho})

    def coleta(self):
        if self.vlr_coleta and toFloat(self.vlr_coleta) > 0:
            self.subtotal.append({'coleta': toFloat(self.vlr_coleta)})

    def outros(self):
        if self.tabela and self.tabela.outros > 0:
            self.subtotal.append({'outros': self.tabela.outros})


    def calcula_frete_peso(self):
        self.tabela.frete = toFloat(self.tabela.frete)
        self.peso_faturado = toFloat(self.peso_faturado)
        
        if self.frete_faixa():
            self.subtotal.append({'frete_calculado': self.frete_faixa()})
        elif self.tabela.frete > 0 and self.peso_faturado > 0:
            self.subtotal.append({'frete_calculado': self.tabela.frete * self.peso_faturado})


    def frete_faixa(self):
        faixa = TabelaFaixa()
        faixas = faixa.readFaixas(self.tabela.id)
        
        for i in faixas:
            if i.faixaInicial <= round(self.peso_faturado) <= i.faixaFinal:
                return i.vlrFaixa
        
        return None

        
    def calcula_frete_volumes(self):
        self.tabela.frete = toFloat(self.tabela.frete)
        volumes = toFloat(self.volumes)
        
        if self.tabela.frete > 0 and volumes > 0:
            self.subtotal.append({'frete_calculado': volumes * self.tabela.frete})

    def calcula_frete_valor(self):
        self.tabela.frete = toFloat(self.tabela.frete)
        vlrNf = toFloat(self.vlrNf)
        
        if self.tabela.frete > 0 and vlrNf > 0:
            self.subtotal.append({'frete_calculado': vlrNf * (self.tabela.frete / 100)})

    def calcula_pedagio(self):
        if not self.tabela:
            raise ValueError("Tabela de frete não encontrada")

        if self.tabela.tipoPedagio == 1 and self.tabela.pedagio > 0:
            self.subtotal.append({'pedagio': self.tabela.pedagio})
        elif self.tabela.tipoPedagio == 2 and self.tabela.pedagio > 0 and self.peso_faturado > 0:
            self.subtotal.append({'pedagio': ceil(self.peso_faturado / 100) * self.tabela.pedagio})
   
    def calcula_gris(self):
        vlrNf = decimal.Decimal(self.vlrNf)
        if vlrNf > 0 and self.tabela and self.tabela.gris > 0:
            gris = decimal.Decimal(self.tabela.gris / 100)
            self.subtotal.append({'gris': round(gris * vlrNf, 2)})

    def calcula_advalor(self):
        vlrNf = decimal.Decimal(self.vlrNf)
        if vlrNf > 0 and self.tabela and self.tabela.adValor > 0:
            advalor = decimal.Decimal(self.tabela.adValor / 100)
            self.subtotal.append({'advalor': round(advalor * vlrNf, 2)})

    def soma_subtotais(self):
        self.total_frete = sum(float(valor) for sub_total in self.subtotal for valor in sub_total.values())

    def decimal_to_string(self, value):
        if isinstance(value, decimal.Decimal):
            return str(value)
        return value

    def gera_subtotais_dict(self):
        subtotais_dict = {
            'despacho': next((item['despacho'] for item in self.subtotal if 'despacho' in item), 0),
            'coleta': next((item['coleta'] for item in self.subtotal if 'coleta' in item), 0),
            'outros': next((item['outros'] for item in self.subtotal if 'outros' in item), 0),
            'frete_calculado': next((item['frete_calculado'] for item in self.subtotal if 'frete_calculado' in item), 0),
            'pedagio': next((item['pedagio'] for item in self.subtotal if 'pedagio' in item), 0),
            'gris': next((item['gris'] for item in self.subtotal if 'gris' in item), 0),
            'advalor': next((item['advalor'] for item in self.subtotal if 'advalor' in item), 0)
        }

        return subtotais_dict





   

