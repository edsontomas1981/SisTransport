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

    def updateCotacao(self, dados):
        if ClsCotacao.objects.filter(dtc_fk=dados['idPreDtc']).exists():
            self.cotacao = ClsCotacao.objects.get(dtc_fk=dados['idPreDtc'])
            self.criaOuAtualizaCotacao(dados)
            return {'resposta': 200, 'cotacao': self.cotacao.toDict()}
        else:
            return {'resposta': 400, 'mensagem': 'Cotação nao encontrada'}

    def deleteCotacao(self, id):
        try:
            if ClsCotacao.objects.filter(id=id).exists():
                self.cotacao.delete()
                return {'status': 200}
            else:
                return {'status': 404, 'mensagem': 'Cotação nao encontrada'}
        except:
            return {'status': 400, 'mensagem': 'Erro interno'}
        
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
            self.cotacao.pesoFaturado = dados['pesoFaturadoCotacao']
            self.cotacao.vlrColeta = toFloat(dados['vlrColetaCotacao'])
            self.cotacao.dataHora=datetime.now()
            self.cotacao.save()
            return 200
        except:
            return 400

    def buscafaixas(self):
        tblFaixa = TabelaFaixa()
        faixas=tblFaixa.readFaixas(self.cotacao.tabela_fk.id)
        if faixas:
            listaFaixas = [i for i in faixas]
            return listaFaixas
       
    def selectCotacaoByDtc(self, dtc):
        try:
            if ClsCotacao.objects.filter(dtc_fk=dtc).exists():
                self.cotacao = ClsCotacao.objects.get(dtc_fk=dtc)
                return {'status': 200, 'cotacao': self.cotacao.toDict()}
            else:
                return {'status': 404, 'cotacao': {}}
        except :
            return {'status': 400, 'mensagem': 'Erro interno'}

        