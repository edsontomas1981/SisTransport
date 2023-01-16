from django.test import TestCase, Client
from comercial.classes.tabelaFrete import TabelaFrete
from Classes.utils import dprint
from parceiros.views import salva_parceiro
from enderecos.views import salva_end
from Classes.dtc import Dtc
from comercial.classes.tabelaFrete import TabelaFrete
from operacional.classes.rotas import Rota
from comercial.classes.cotacao import Cotacao


class CotacaoPorPesoTest(TestCase):

    def setUp(self):
        self.endereco = salva_end(
            '07243180', 'Rua 1', '172', 'bl H', 'bairro', 'Guarulhos', 'SP')
        self.geraDtc()
        self.geraRota()
        self.criaTabela(self.geraDadosTabela(
            1.50,1,5,15,35,25,3.5,1,300,150,1,'on','on','off',7))
        self.dadosCotacao = {'peso': [5], 'qtde': [5], 'vlrNf': [15.00],'m3': [0.001], 
                             'dtc_fk': [self.dtc.dtc], 'tabela': [self.tabela.tabela]}
        self.dadosIncorretos = {}

    def dtest_cotacao(self):

        self.cotacao = Cotacao()
        self.assertEquals(self.cotacao.createCotacao(
            self.dadosIncorretos), 400)
        self.assertEquals(self.cotacao.createCotacao(self.dadosCotacao), 200)    
        self.cotacao.calculaFrete()                                      
        self.assertEquals(self.cotacao.cotacao.adValor, 0.75)                      
        self.assertEquals(self.cotacao.cotacao.gris, 2.25)                         
        self.assertEquals(self.cotacao.cotacao.pesoCubado, 0.3)                    
        self.assertEquals(self.cotacao.cotacao.pesoCalcular, 5)
        self.assertEquals(self.cotacao.cotacao.peso, 5)
        self.assertEquals(self.cotacao.cotacao.fretePeso, 7.5)
        self.assertEquals(self.cotacao.cotacao.despacho, 35)
        self.assertEquals(self.cotacao.cotacao.outros, 25)
        self.assertEquals(self.cotacao.cotacao.pedagio, 3.5)
        self.assertEquals(self.cotacao.cotacao.aliquotaIcms, 0.93) 
        self.assertEquals(self.cotacao.cotacao.subtotal, 74) 
        self.assertEquals(self.cotacao.cotacao.totalFrete, 150.00)
    
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
