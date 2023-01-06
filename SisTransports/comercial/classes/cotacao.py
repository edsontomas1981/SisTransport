from comercial.models.cotacao import Cotacao as ClsCotacao
from parceiros.models.parceiros import Parceiros
from Classes.dtc import Dtc
from math import ceil


class Cotacao:
    def __init__(self):
        self.cotacao = ClsCotacao()

    def createCotacao(self, dados):
        return self.criaOuAtualizaCotacao(dados)

    def criaOuAtualizaCotacao(self, dados):
        self.cotacao.dtc_fk = dados['dtc_fk'][0]
        self.cotacao.peso = dados['peso'][0]
        self.cotacao.qtde = dados['qtde'][0]
        self.cotacao.vlrNf = dados['vlrNf'][0]
        self.cotacao.m3 = dados['m3'][0]
        self.cotacao.icms = dados['icms'][0]
        self.cotacao.totalFrete = 0

        self.cotacao.save()
        return 200

    def calcularFrete(self, tabela):
        self.tabela = tabela
        pesoCubado = self.calculaCubagem()
        
        self.pesoACalcular(pesoCubado)
        
        if tabela.tipoCalculo ==1:
            self.calculaPorPeso()
        elif tabela.tipoCalculo ==2:
            return self.calculaPorValor() 

        self.calculaAdvalor()
        self.calculaGris()
        self.geraPercentualAliquota()
        self.adicionaOutros()
        self.adicionaDespacho()
        self.calculaPedagio()
        self.somaSubtotais()
        self.adicionaIcmsAoTotal()
       

    def calculaAdvalor(self):
        if self.tabela.adValor != 0:
            advalor = self.tabela.adValor/100
            self.cotacao.adValor = advalor*self.cotacao.vlrNf

    def calculaGris(self):
        if self.tabela.gris !=0:
            gris = self.tabela.gris/100
            self.cotacao.gris = gris*self.cotacao.vlrNf

    def geraPercentualAliquota(self):
        if self.cotacao.icms <= 0:
            self.cotacao.icms = 0
        else:
            icms = 1-(self.cotacao.icms/100)
            self.cotacao.icms = round(icms, 2)

    def calculaCubagem(self):
        if self.tabela.cubagem:
            if self.tabela.fatorCubagem !=0:
                pesoCubado = self.tabela.fatorCubagem*self.cotacao.m3
                return pesoCubado

    def pesoACalcular(self, pesoCubado):
        if self.cotacao.peso >= pesoCubado:
            self.cotacao.pesoFaturar = self.cotacao.peso
        else:
            self.cotacao.pesoFaturar = pesoCubado

    def calculaPorPeso(self):
        self.cotacao.fretePeso = self.tabela.frete*self.cotacao.pesoFaturar

    def adicionaDespacho(self):
        self.cotacao.despacho = self.tabela.despacho

    def adicionaOutros(self):
        self.cotacao.outros = self.tabela.outros

    def calculaPedagio(self):
        if self.tabela.tipoPedagio == 2:
            pedagioKg = ceil(self.cotacao.peso/100)
            self.cotacao.pedagio = self.tabela.pedagio*pedagioKg
        elif self.tabela.tipoPedagio == 1:
            self.cotacao.pedagio = self.tabela.pedagio
    
    def somaSubtotais(self):
        self.cotacao.totalFrete = (self.cotacao.fretePeso+self.cotacao.adValor + self.cotacao.gris +
                                   self.cotacao.pedagio+self.cotacao.despacho+self.cotacao.outros)
    
    def adicionaIcmsAoTotal(self):
        self.cotacao.totalFrete = round(self.cotacao.totalFrete/self.cotacao.icms, 2)        
        
    def calculaPorValor(self):
        return 'valor'
            
