from math import ceil
from Classes.utils import dprint, toFloat
from comercial.classes.tabelaFrete import TabelaFrete
from comercial.classes.tblFaixa import TabelaFaixa
import decimal

class FreightCalculator:
    def __init__(self,dados):
        self.dados = dados
        self.carrega_tabela()
        self.vlrNf = dados['vlrNf']
        self.volumes = dados['volumes']
        self.peso = dados['peso']
        self.m3 = dados['m3']
        self.vlr_coleta=dados['vlrColeta']
        self.frete_informado = dados['freteInformado']
        self.peso_cubado = self.calcula_cubagem()
        self.peso_faturado = self.peso_calcular()
        self.aliquota_icms = self.calcula_percentual_aliquota()
        self.base_de_calculo = 0.0
        self.icms_incluso = dados['icmsIncluso']
        self.icms = 0.0 
        self.total_frete = 0.0
        self.total_frete_com_icms=0.00
        self.subtotal = []

    def carrega_tabela(self):
        tab = TabelaFrete()
        if tab.readTabela(self.dados['idTabela']):
            self.tabela = tab.tabela
        else:
            self.tabela = tab
            self.tabela.fatorCubagem = 300
            self.tabela.aliquotaIcms = 7
            self.tabela.tipoCalculo = 4
            self.tabela.adValor = 0
            self.tabela.gris = 0
            self.tabela.pedagio = 0
            self.tabela.outros = 0
            self.tabela.vlrNf = 0
            self.tabela.despacho = 0
            self.tabela.tipoPedagio = 0
            self.tabela.freteMinimo = 0

    def calcula_percentual_aliquota(self):
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
        elif self.tabela.tipoCalculo == 4:  # Cálculo de frete informado
            self.calcula_frete_informado()
        
        self.calcula_advalor()
        self.calcula_despacho()
        self.calcula_gris()
        self.calcula_pedagio()
        self.calcula_outros()
        self.calcula_coleta()
        self.calcula_subtotais()   
        self.frete_menor_que_minimo()
        self.aplica_icms()        
        self.calcula_base_de_calculo()
        self.calcula_vlr_icms()        

    def calcula_frete_informado(self):
        self.subtotal.append(toFloat(self.frete_informado))
        self.frete_calculado = self.frete_informado


    def frete_menor_que_minimo(self):
        if self.total_frete < self.tabela.freteMinimo:
            self.total_frete = self.tabela.freteMinimo
            return True
        else:
            return False
        
    def aplica_icms(self):
        if self.icms_incluso:
            if self.total_frete > 0 and self.aliquota_icms > 0:
                self.total_frete_com_icms = toFloat(round(float(self.total_frete) / self.aliquota_icms, 2))
        else:
            self.total_frete_com_icms = (round(float(self.total_frete), 2))            

    def calcula_despacho(self):
        if self.tabela and self.tabela.despacho > 0:
            self.subtotal.append(toFloat(self.tabela.despacho))
            self.despacho = toFloat(self.tabela.despacho)

    def calcula_coleta(self):
        if self.vlr_coleta and toFloat(self.vlr_coleta) > 0:
            self.subtotal.append(toFloat(self.vlr_coleta))
            self.coleta = toFloat(self.vlr_coleta)

    def calcula_outros(self):
        if self.tabela and self.tabela.outros > 0:
            self.subtotal.append(toFloat(self.tabela.outros))
            self.outros = toFloat(self.tabela.outros)

    def calcula_frete_peso(self):
        self.tabela.frete = toFloat(self.tabela.frete)
        self.peso_faturado = toFloat(self.peso_faturado)
        
        if self.frete_faixa():
            self.subtotal.append(toFloat(self.frete_faixa()))
            self.frete_calculado = self.frete_faixa()
        elif self.tabela.frete > 0 and self.peso_faturado > 0:
            self.subtotal.append(toFloat(self.tabela.frete * self.peso_faturado))
            self.frete_calculado = toFloat(self.tabela.frete * self.peso_faturado)

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
            self.subtotal.append(toFloat(volumes * self.tabela.frete))
            self.frete_calculado = toFloat(volumes * self.tabela.frete)

    def calcula_frete_valor(self):
        self.tabela.frete = toFloat(self.tabela.frete)
        vlrNf = toFloat(self.vlrNf)
        if self.tabela.frete > 0 and vlrNf > 0:
            self.subtotal.append(toFloat(vlrNf * (self.tabela.frete / 100)))
            self.frete_calculado = toFloat(vlrNf * (self.tabela.frete / 100))

    def calcula_pedagio(self):
        if not self.tabela:
            raise ValueError("Tabela de frete não encontrada")

        if self.tabela.tipoPedagio == 1 and self.tabela.pedagio > 0:
            self.subtotal.append(toFloat(self.tabela.pedagio))
            self.pedagio = toFloat(self.tabela.pedagio)
        elif self.tabela.tipoPedagio == 2 and self.tabela.pedagio > 0 and self.peso_faturado > 0:
            self.subtotal.append(toFloat(ceil(self.peso_faturado / 100) * self.tabela.pedagio))
            self.pedagio = toFloat(ceil(self.peso_faturado / 100) * self.tabela.pedagio)
   
    def calcula_gris(self):
        vlrNf = decimal.Decimal(self.vlrNf)
        if vlrNf > 0 and self.tabela and self.tabela.gris > 0:
            gris = decimal.Decimal(self.tabela.gris / 100)
            self.subtotal.append(toFloat(round(gris * vlrNf, 2)))
            self.gris =  toFloat(round(gris * vlrNf, 2))

    def calcula_advalor(self):
        vlrNf = decimal.Decimal(self.vlrNf)
        if vlrNf > 0 and self.tabela and self.tabela.adValor > 0:
            advalor = decimal.Decimal(self.tabela.adValor / 100)
            self.subtotal.append(toFloat(round(advalor * vlrNf, 2)))
            self.advalor = toFloat(round(advalor * vlrNf, 2))

    def  calcula_subtotais(self):
        self.total_frete = sum(self.subtotal)
        return self.total_frete

    def decimal_to_string(self, value):
        if isinstance(value, decimal.Decimal):
            return str(value)
        return value

    def dict_subtotais(self):
        subtotais_dict = {
            'despacho': self.despacho if hasattr(self, 'despacho') else 0,
            'coleta': self.coleta if hasattr(self, 'coleta') else 0,
            'outros': self.outros if hasattr(self, 'outros') else 0,
            'frete_calculado': self.frete_calculado if hasattr(self, 'frete_calculado') else 0,
            'pedagio': self.pedagio if hasattr(self, 'pedagio') else 0,
            'gris': self.gris if hasattr(self, 'gris') else 0,
            'advalor': self.advalor if hasattr(self, 'advalor') else 0,
            'total_frete': self.total_frete if hasattr(self, 'total_frete') else 0,
            'total_frete_com_icms': self.total_frete_com_icms if hasattr(self, 'total_frete_com_icms') else 0,
            'aliquota': self.tabela.aliquotaIcms if hasattr(self, 'tabela') else 0,
            'base_de_calculo': self.base_de_calculo if hasattr(self, 'base_de_calculo') else 0,
            'vlr_icms': self.icms if hasattr(self, 'icms') else 0,
        }
        return subtotais_dict

    def calcula_vlr_icms(self):
        subtotal = self.calcula_subtotais()
        if self.icms_incluso:
            self.icms = round(toFloat(self.total_frete_com_icms)-toFloat(subtotal),2)
        else:
            self.icms = round(toFloat(self.total_frete)-(toFloat(subtotal)*toFloat(self.aliquota_icms)),2)        
    
    def calcula_base_de_calculo(self):
        if self.icms_incluso:
            self.base_de_calculo = toFloat(self.total_frete)/toFloat(self.aliquota_icms)
        else:
            self.base_de_calculo = toFloat(self.total_frete)




   

