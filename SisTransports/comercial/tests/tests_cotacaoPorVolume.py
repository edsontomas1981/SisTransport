from django.test import TestCase, Client
from comercial.classes.tabelaFrete import TabelaFrete
from Classes.utils import dprint
from parceiros.views import salva_parceiro
from enderecos.views import salva_end
from Classes.dtc import Dtc
from comercial.classes.tabelaFrete import TabelaFrete
from operacional.classes.rotas import Rota
from comercial.classes.cotacao import Cotacao


class CotacaoPorVolumeTest(TestCase):

    def setUp(self):
        self.endereco = salva_end(
            '07243180', 'Rua 1', '172', 'bl H', 'bairro', 'Guarulhos', 'SP')
        self.geraDtc()
        self.geraRota()
        self.criaTabela(self.geraDadosTabela(110,3,0,0,0,0,0,1,300,150,1,'on','on','off',7))
        self.dadosCotacao = {'peso': [250], 'qtde': [1], 'vlrNf': [1500.00],'m3': [1], 
                             'dtc_fk': [self.dtc.dtc], 'tabela': [self.tabela.tabela]}
        self.dadosIncorretos = {}

    def test_cotacaoPorVolume(self):
        self.objCotacao = Cotacao()
        self.assertEquals(self.objCotacao.createCotacao(self.dadosIncorretos), 400)
        self.assertEquals(self.objCotacao.createCotacao(self.dadosCotacao), 200)
        self.objCotacao.calculaFrete()
        self.assertEquals(self.objCotacao.cotacao.adValor, 0)                      
        self.assertEquals(self.objCotacao.cotacao.gris, 0) 
        self.assertEquals(self.objCotacao.cotacao.despacho, 0)
        self.assertEquals(self.objCotacao.cotacao.outros, 0)
        self.assertEquals(self.objCotacao.cotacao.pedagio, 0)
        self.assertEquals(self.objCotacao.cotacao.aliquotaIcms, 0.93) 
        self.assertEquals(self.objCotacao.cotacao.fretePeso,110)
        self.assertEquals(self.objCotacao.cotacao.subtotal, 110) 
        self.assertEquals(self.objCotacao.cotacao.totalFrete, 150) 
   

    def tearDown(self):
        pass
    
    def criaTabela(self, dados):
        self.tabela = TabelaFrete()
        self.tabela.createTabela(dados)

    def geraParceiro(self, nomeParceiro):
        return salva_parceiro('23926683000108', nomeParceiro, 'fantasia', '796471869119', 'obs', self.endereco)

    def geraDtc(self):

        self.remetente = self.geraParceiro('remetente')
        self.destinatario = self.geraParceiro('destinatario')
        self.consig = self.geraParceiro('consig')
        self.redesp = self.geraParceiro('redesp')

        self.dtc = Dtc()
        self.dtc.createDtc(self.remetente, self.destinatario,
                           self.consig, self.redesp)

    def geraRota(self):
        self.rota = Rota()
        self.rota.salvaRota('RotaTeste', 'TE', 'ST', 'TE', 'ST')

    def geraDadosTabela(self, vlrFrete, tipoCalculoFrete: int,
                        advalor: int, gris: int, despacho: float,
                        outros: float, pedagio: float, tipoPeda: int,
                        cubagem: int, freteMinimo: float, tipTab: int,
                        icms='on', cobraCubagem='on', tabBloq='off',aliquotaIcms=7):

        return {'descTabela': ['Tabela Teste'], 'icms': [icms],
                'tabBloq': [tabBloq], 'vlrFrete': [vlrFrete],
                'tipoFrete': [tipoCalculoFrete], 'advalor': [advalor],
                'gris': [gris], 'despacho': [despacho], 'outros': [outros],
                'pedagio': [pedagio], 'tipoCobranPedagio': [tipoPeda],
                'cobraCubagem': [cobraCubagem], 'cubagem': [cubagem],
                'freteMinimo': [freteMinimo], 'tipoTabela': [tipTab],
                'aliquotaIcms': [aliquotaIcms],'rota': [self.rota.rota.id]}