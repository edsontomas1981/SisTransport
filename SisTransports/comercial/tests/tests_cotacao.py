from django.test import TestCase, Client
from comercial.classes.tabelaFrete import TabelaFrete
from Classes.utils import checkBox, dprint
from parceiros.views import salva_parceiro
from enderecos.views import salva_end
from usuarios.models import Usuarios
from Classes.dtc import Dtc
from comercial.classes.cotacoes import Cotacao as ClsCotacao
from comercial.classes.tabelaFrete import TabelaFrete
from operacional.classes.rotas import Rota


class CotacaoTest(TestCase):

    def setUp(self):

        self.endereco = salva_end(
            '07243180', 'Rua 1', '172', 'bl H', 'bairro', 'Guarulhos', 'SP')
        self.remetente = salva_parceiro(
            '23926683000108', 'remetente', 'fantasia', '796471869119', 'obs', self.endereco)
        self.destinatario = salva_parceiro(
            '23926683000109', 'destinatario', 'fantasia', '796471869119', 'obs', self.endereco)
        self.consig = salva_parceiro(
            '23926683000108', 'consig', 'fantasia', '796471869119', 'obs', self.endereco)
        self.redesp = salva_parceiro(
            '23926683000108', 'redespacho', 'fantasia', '796471869119', 'obs', self.endereco)
        self.dtc = Dtc()
        self.dtc.createDtc(self.remetente, self.destinatario,
                           self.consig, self.redesp)

        self.rota = Rota()
        self.rota.salvaRota('teste', 'TE', 'TE', 'TE', 'TE')

        self.tabela = TabelaFrete()
        dados = {'descTabela': ['teste'], 'icms': ['on'], 'tabBloq': ['on'], 'vlrFrete': [150], 'tipoFrete': [1],
                 'advalor': [50], 'gris': [50], 'despacho': [35], 'outros': [25], 'pedagio': [35], 'tipoCobranPedagio': [1],
                 'cobraCubagem': ['on'], 'cubagem': [300], 'freteMinimo': [150], 'tipoTabela': [0], 'rota': [self.rota.rota.id]}
        self.tabela.createTabela(dados)
       
        self.dadosCotacao={'dtc_fk':[self.dtc],'peso':[10],'qtde':[5],'vlrNf':[1500.00],
                        'm3':[1]}


    def test_cotacao(self):
        # Cria cotação
        self.cotacao = ClsCotacao()
        dprint(dir(self.cotacao))
        self.assertEqual(self.cotacao.createCotacao(self.dadosCotacao),200)
        
