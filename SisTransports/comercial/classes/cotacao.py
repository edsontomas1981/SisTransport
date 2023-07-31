from comercial.models.cotacao import Cotacao as ClsCotacao
from faturamento.components.calculaFrete import calculaAdvalor, calculaGris, pesoACalcular, calculaCubagem
from faturamento.components.calculaFrete import somaSubtotais, calculaPedagio, calculaFretePeso, freteFaixa
from faturamento.components.calculaFrete import aplicaIcms, geraPercentualAliquota, calculaFreteValor, calculaFreteVolume
from comercial.classes.geraFrete import CalculaFrete
from comercial.classes.tblFaixa import TabelaFaixa
from Classes.utils import  dprint,toFloat,checkBox
from datetime import datetime

class Cotacao:
    def __init__(self):
        self.cotacao = ClsCotacao()
        self.geraFrete = CalculaFrete()

    def createCotacao(self, dados):
        return self.criaOuAtualizaCotacao(dados)

    def readCotacao(self, id):
        if ClsCotacao.objects.filter(id=id).exists():
            self.cotacao = ClsCotacao.objects.filter(id=id).get()
            return {'resposta': 200, 'cotacao': self.cotacao.toDict()}
        else:
            return {'resposta': 400, 'mensagem': 'Cotação nao encontrada'}

    def updateCotacao(self, dados, id):
        
        if ClsCotacao.objects.filter(id=id).exists():
            self.cotacao = ClsCotacao.objects.filter(id=id).get()
            self.criaOuAtualizaCotacao(dados)
            return {'resposta': 200, 'cotacao': self.cotacao.toDict()}
        else:
            return {'resposta': 400, 'mensagem': 'Cotação nao encontrada'}

    def deleteCotacao(self, id):
        if ClsCotacao.objects.filter(id=id).exists():
            self.cotacao.delete()
            return {'resposta': 200}
        else:
            return {'resposta': 400, 'mensagem': 'Cotação nao encontrada'}

    def criaOuAtualizaCotacao(self, dados):
        try:
            self.cotacao.dtc_fk = dados['dtc']
            self.cotacao.tabela_fk = dados['tabela_frete']
            self.cotacao.rota_fk = dados['rota']
            self.cotacao.formaDeCalculo = dados['tipoTabelaCotacao']
            self.cotacao.numNf = dados['nfCotacao']
            self.cotacao.peso = int(dados['pesoCotacao'])
            self.cotacao.pesoCalcular = int(dados['pesoFaturadoCotacao'])
            self.cotacao.qtde  = int(dados['volumeCotacao'])
            self.cotacao.vlrNf = toFloat(dados['valorNfCotacao'])
            self.cotacao.m3 = toFloat(dados['resultM3Cotacao'])
            self.cotacao.contato = dados['contatoCotacao']
            self.cotacao.tipoMercadoria = dados['mercadoriaCotacao']
            self.cotacao.totalFrete = toFloat(dados['freteTotalCotacao'])
            self.cotacao.fretePeso = toFloat(dados['fretePesoCotacao'])
            self.cotacao.adValor = toFloat(dados['advalorCotacao'])
            self.cotacao.gris = toFloat(dados['grisCotacao'])
            self.cotacao.despacho = toFloat(dados['despachoCotacao'])
            self.cotacao.outros = toFloat(dados['outrosCotacao'])
            self.cotacao.pedagio = toFloat(dados['pedagioCotacao'])
            self.cotacao.vlrColeta = toFloat(dados['freteTotalCotacao'])
            self.cotacao.baseDeCalculo = toFloat(dados['baseCalculoCotacao'])
            self.cotacao.aliquota = toFloat(dados['aliquotaCotacao'])
            self.cotacao.icmsRS = toFloat(dados['icmsCotacao'])
            self.cotacao.icmsIncluso = checkBox(dados['icmsInclusoCotacao'])
            self.cotacao.observacao = dados['obsCotacao']
            self.cotacao.nome = dados['nomeCotacao']
            self.cotacao.vlrColeta = toFloat(dados['vlrColetaCotacao'])
            self.cotacao.dataHora=datetime.now()
            self.cotacao.save()
            return 200
        except:
            return 400

    def calculaFrete(self):
        faixa = self.buscafaixas()
        if faixa:
            self.calculaFreteFaixa(faixa)
            if not self.cotacao.totalFrete:
                self.tipoDeCalculo()
        else:
            self.tipoDeCalculo()
            
    def buscafaixas(self):
        tblFaixa = TabelaFaixa()
        faixas=tblFaixa.readFaixas(self.cotacao.tabela_fk.id)
        if faixas:
            listaFaixas = [i for i in faixas]
            return listaFaixas
        
    def calculaFreteValor(self):
        self.adicionaDespacho()
        self.adicionaOutros()
        self.cotacao.adValor=calculaAdvalor(
            self.cotacao.tabela_fk.adValor, self.cotacao.vlrNf)
        self.cotacao.gris=calculaGris(
            self.cotacao.tabela_fk.gris, self.cotacao.vlrNf)
        self.cotacao.fretePeso=calculaFreteValor(
            self.cotacao.vlrNf, self.cotacao.tabela_fk.frete)
        self.cotacao.pedagio=calculaPedagio(
            self.cotacao.tabela_fk.tipoPedagio, self.cotacao.tabela_fk.pedagio, self.cotacao.pesoCalcular)
        self.cotacao.subtotal=somaSubtotais(self.cotacao.adValor, self.cotacao.gris,
                                              self.cotacao.fretePeso, self.cotacao.pedagio,
                                              self.cotacao.despacho, self.cotacao.outros)

        self.calculaIcms()

        self.calculaFreteMinimo()
    
    def calcularFretePeso(self):

        self.cotacao.adValor=calculaAdvalor(
            self.cotacao.tabela_fk.adValor, self.cotacao.vlrNf)
        self.cotacao.gris=calculaGris(
            self.cotacao.tabela_fk.gris, self.cotacao.vlrNf)
        self.cotacao.pesoCubado=calculaCubagem(
            self.cotacao.m3, self.cotacao.tabela_fk.fatorCubagem)
        self.cotacao.pesoCalcular=pesoACalcular(
            toFloat(self.cotacao.peso), toFloat(self.cotacao.pesoCubado))
        self.cotacao.fretePeso=calculaFretePeso(
            self.cotacao.tabela_fk.frete, self.cotacao.pesoCalcular)
        self.cotacao.pedagio=calculaPedagio(
            self.cotacao.tabela_fk.tipoPedagio, self.cotacao.tabela_fk.pedagio, self.cotacao.pesoCalcular)
        self.cotacao.aliquotaIcms=geraPercentualAliquota(
            self.cotacao.tabela_fk.aliquotaIcms)
        self.adicionaDespacho()
        self.adicionaOutros()        
        self.cotacao.subtotal=somaSubtotais(self.cotacao.adValor, self.cotacao.gris,
                                              self.cotacao.fretePeso, self.cotacao.pedagio,
                                              self.cotacao.despacho, self.cotacao.outros)

        self.calculaIcms()

        self.calculaFreteMinimo()

    def calcularFreteVolume(self):
        self.adicionaDespacho()
        self.adicionaOutros()
        self.cotacao.adValor=calculaAdvalor(
            self.cotacao.tabela_fk.adValor, self.cotacao.vlrNf)
        self.cotacao.gris=calculaGris(
            self.cotacao.tabela_fk.gris, self.cotacao.vlrNf)
        self.cotacao.fretePeso=calculaFreteVolume(
            self.cotacao.qtde, self.cotacao.tabela_fk.frete)
        self.cotacao.pedagio=calculaPedagio(
            self.cotacao.tabela_fk.tipoPedagio, self.cotacao.tabela_fk.pedagio, self.cotacao.pesoCalcular)
        self.cotacao.aliquotaIcms=geraPercentualAliquota(
            self.cotacao.tabela_fk.aliquotaIcms)
        self.cotacao.subtotal=somaSubtotais(self.cotacao.adValor, self.cotacao.gris,
                                              self.cotacao.fretePeso, self.cotacao.pedagio,
                                              self.cotacao.despacho, self.cotacao.outros)
        self.calculaIcms()

        self.calculaFreteMinimo()

    def calculaFreteFaixa(self, faixas):
        self.cotacao.pesoCubado=calculaCubagem(
            self.cotacao.m3, self.cotacao.tabela_fk.fatorCubagem)
        self.cotacao.pesoCalcular=pesoACalcular(
            toFloat(self.cotacao.peso), toFloat(self.cotacao.pesoCubado))

        self.cotacao.fretePeso=freteFaixa(
            faixas, int(self.cotacao.pesoCalcular))
        if self.cotacao.fretePeso:
            self.adicionaDespacho()
            self.adicionaOutros()

            self.calculaAdvalor()
            
            self.calculaGris()
            
            self.calculaPedagio()
            
            self.calculaSubTotais()

            self.calculaIcms()

            self.calculaFreteMinimo()

    def adicionaDespacho(self):
        self.cotacao.despacho=self.cotacao.tabela_fk.despacho

    def adicionaOutros(self):
        self.cotacao.outros=self.cotacao.tabela_fk.outros

    def tipoDeCalculo(self):

        if self.cotacao.tabela_fk.tipoCalculo == 1:
            self.calcularFretePeso()
        elif self.cotacao.tabela_fk.tipoCalculo == 2:
            self.calculaFreteValor()
        elif self.cotacao.tabela_fk.tipoCalculo == 3:
            self.calcularFreteVolume()

    def calculaIcms(self):
        self.cotacao.aliquotaIcms=geraPercentualAliquota(
            self.cotacao.tabela_fk.aliquotaIcms)

        if self.cotacao.tabela_fk.icmsIncluso == True:
            self.cotacao.totalFrete=aplicaIcms(
                self.cotacao.subtotal, self.cotacao.aliquotaIcms)
        else:
            self.cotacao.totalFrete=self.cotacao.subtotal

    def calculaFreteMinimo(self):
        if float(self.cotacao.totalFrete) < float(self.cotacao.tabela_fk.freteMinimo):
            self.cotacao.totalFrete=self.cotacao.tabela_fk.freteMinimo

    def calculaSubTotais(self):
        self.cotacao.subtotal=somaSubtotais(self.cotacao.adValor, self.cotacao.gris,
                                                  self.cotacao.fretePeso, self.cotacao.pedagio,
                                                  self.cotacao.despacho, self.cotacao.outros)
        
    def calculaPedagio(self):
        self.cotacao.pedagio=calculaPedagio(
                self.cotacao.tabela_fk.tipoPedagio, 
                self.cotacao.tabela_fk.pedagio, self.cotacao.pesoCalcular)
    
    def calculaAdvalor(self):
            self.cotacao.adValor=calculaAdvalor(
                self.cotacao.tabela_fk.adValor, self.cotacao.vlrNf)
    
    def calculaAliquota(self):
            self.cotacao.aliquotaIcms=geraPercentualAliquota(
                self.cotacao.tabela_fk.aliquotaIcms)                

    def calculaGris(self):
            self.cotacao.gris=calculaGris(
                self.cotacao.tabela_fk.gris, self.cotacao.vlrNf)        
            
    def selectCotacaoByDtc(self, dtc):
        try:
            if ClsCotacao.objects.filter(dtc_fk=dtc).exists():
                self.cotacao = ClsCotacao.objects.get(dtc_fk=dtc)
                return {'status': 200, 'cotacao': self.cotacao.toDict()}
            else:
                return {'status': 404, 'cotacao': {}}
        except :
            return {'status': 400, 'mensagem': 'Erro interno'}

        