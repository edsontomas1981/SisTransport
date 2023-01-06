from django.test import TestCase, Client
from comercial.classes.tabelaFrete import TabelaFrete
from Classes.utils import checkBox, dprint
from parceiros.views import salva_parceiro
from enderecos.views import salva_end
from Classes.dtc import Dtc
from comercial.classes.tabelaFrete import TabelaFrete
from operacional.classes.rotas import Rota
from comercial.classes.cotacao import Cotacao


class CotacaoTest(TestCase):

    def setUp(self):

        self.endereco = salva_end(
            '07243180', 'Rua 1', '172', 'bl H', 'bairro', 'Guarulhos', 'SP')
        self.geraDtc()
        self.geraRota()

        # dados = {'descTabela': ['teste'], 'icms': ['on'], 'tabBloq': ['off'], 'vlrFrete': [1.50], 'tipoFrete': [1],
        #          'advalor': [5], 'gris': [15], 'despacho': [35], 'outros': [25], 'pedagio': [3.5], 'tipoCobranPedagio': [2],
        #          'cobraCubagem': ['on'], 'cubagem': [300], 'freteMinimo': [150], 'tipoTabela': [0], 'rota': [self.rota.rota.id]}

        self.criaTabela(self.geraDadosTabela(1.50, 1, 5, 15, 35, 25, 3.5, 2, 300, 150, 0))

        self.dadosCotacao={'dtc_fk': [self.dtc.dtc], 'peso': [250], 'qtde': [5], 'vlrNf': [1500.00],
                             'm3': [1], 'icms': [7]}

    def tearDown(self):
        self.tabela.tabela=''
        self.cotacao.cotacao=''
        
    def test_cotacao(self):
        self.cotacao=Cotacao()
        # Verifica se cotação foi criada
        self.assertEquals(self.cotacao.createCotacao(self.dadosCotacao), 200)
        # Calcula o frete
        self.cotacao.calcularFrete(self.tabela.tabela)

        # Tabela frete valor | Peso Cubado > peso real
        self.assertEquals(self.cotacao.cotacao.fretePeso, 450)
        self.assertEquals(self.cotacao.cotacao.adValor, 75)
        self.assertEquals(self.cotacao.cotacao.gris, 225)
        self.assertEquals(self.cotacao.cotacao.despacho, 35)
        self.assertEquals(self.cotacao.cotacao.outros, 25)
        self.assertEquals(self.cotacao.cotacao.pedagio, 10.5)
        # Teste o peso a ser faturado
        self.assertEquals(self.cotacao.cotacao.pesoFaturar, 300)
        self.assertAlmostEquals(self.cotacao.cotacao.icms, 0.93)
        self.assertEquals(self.cotacao.cotacao.totalFrete, 882.26)

        self.geraDadosTabela(1.50, 2, 5, 15, 35, 25, 3.5, 2, 300, 150, 0)

        
        def test_cotacaoPorPercentual(self):
            self.geraDadosTabela(1.50, 2, 5, 15, 35, 25, 3.5, 2, 300, 150, 0)
            dprint('teste')

        

    def criaTabela(self, dados):
        self.tabela=TabelaFrete()
        self.tabela.createTabela(dados)

    def geraParceiro(self, nomeParceiro):
        return salva_parceiro('23926683000108', nomeParceiro, 'fantasia', '796471869119', 'obs', self.endereco)

    def geraDtc(self):

        self.remetente=self.geraParceiro('remetente')
        self.destinatario=self.geraParceiro('destinatario')
        self.consig=self.geraParceiro('consig')
        self.redesp=self.geraParceiro('redesp')

        self.dtc=Dtc()
        self.dtc.createDtc(self.remetente, self.destinatario,
                           self.consig, self.redesp)

    def geraRota(self):
        self.rota=Rota()
        self.rota.salvaRota('RotaTeste', 'TE', 'ST', 'TE', 'ST')

    def geraDadosTabela(self, vlrFrete, tipoCalculoFrete: int, 
                        advalor: int, gris: int, despacho: float, 
                        outros: float, pedagio: float, tipoPeda: int, 
                        cubagem: int, freteMinimo: float,tipTab: int, 
                        icms='on',cobraCubagem='on', tabBloq='off'):

        return {'descTabela': ['Tabela Teste'], 'icms': [icms], 
                'tabBloq': [tabBloq], 'vlrFrete': [vlrFrete], 
                'tipoFrete': [tipoCalculoFrete],'advalor': [advalor], 
                'gris': [gris], 'despacho': [despacho], 'outros': [outros], 
                'pedagio': [pedagio],'tipoCobranPedagio': [tipoPeda], 
                'cobraCubagem': [cobraCubagem], 'cubagem': [cubagem],
                'freteMinimo': [freteMinimo],'tipoTabela': [tipTab], 
                'rota': [self.rota.rota.id]}
