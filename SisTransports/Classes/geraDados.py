from comercial.classes.tabelaFrete import TabelaFrete
from Classes.utils import dprint
from parceiros.views import salva_parceiro
from enderecos.views import salva_end
from Classes.dtc import Dtc
from comercial.classes.tabelaFrete import TabelaFrete
from operacional.classes.rotas import Rota
from comercial.classes.tblFaixa import TabelaFaixa


class GeraDados:

    def __init__(self):
        pass

    def criaTabela(self, dados):
        self.tabela = TabelaFrete()
        self.tabela.createTabela(dados)
        return self.tabela

    def geraParceiro(self, nomeParceiro):
        self.endereco = self.geraEndereco()
        return salva_parceiro('23926683000108', nomeParceiro, 'fantasia', '796471869119', 'obs', self.endereco)

    def geraDtc(self):

        self.remetente = self.geraParceiro('remetente')
        self.destinatario = self.geraParceiro('destinatario')
        self.consig = self.geraParceiro('consig')
        

        dados={'remetente':self.remetente,
                'destinatario':self.destinatario,
                'consignatario':self.consig,
                'modalidadeFrete':1,
                'tomador':self.remetente}

        self.dtc = Dtc()
        self.dtc.createDtc(dados)
        return self.dtc

    def geraRota(self):
        self.rota = Rota()
        self.rota.salvaRota('RotaTeste', 'TE', 'ST', 'TE', 'ST')
        return self.rota

    def geraEndereco(self):
        return salva_end('07243180', 'Rua 1', '172', 'bl H', 'bairro', 'Guarulhos', 'SP')

    def geraDadosTabela(self, vlrFrete, tipoCalculoFrete: int,
                        advalor: int, gris: int, despacho: float,
                        outros: float, pedagio: float, tipoPeda: int,
                        cubagem: int, freteMinimo: float, tipTab: int,
                        icms='on', cobraCubagem='on', tabBloq='off', aliquotaIcms=7):

        return {'descTabela': ['Tabela Teste'], 'icms': [icms],
                'tabBloq': [tabBloq], 'vlrFrete': [vlrFrete],
                'tipoFrete': [tipoCalculoFrete], 'advalor': [advalor],
                'gris': [gris], 'despacho': [despacho], 'outros': [outros],
                'pedagio': [pedagio], 'tipoCobranPedagio': [tipoPeda],
                'cobraCubagem': [cobraCubagem], 'cubagem': [cubagem],
                'freteMinimo': [freteMinimo], 'tipoTabela': [tipTab],
                'aliquotaIcms': [aliquotaIcms], 'rota': [self.rota.rota.id]}

    def geraDadosCotacao(self, peso, qtde, vlrNf, m3):
        return {'peso': [peso], 'qtde': [qtde], 'vlrNf': [vlrNf], 'm3': [m3],
                'dtc_fk': [self.dtc.dtc], 'tabela': [self.tabela.tabela]}

    def criaFaixa(self, faixaInicial, faixaFinal, vlrFaixa, tabela: object):
        self.faixa = TabelaFaixa()
        self.faixa.createFaixa(tabela, faixaInicial, faixaFinal, vlrFaixa)
        return self.faixa

    def pegaFaixas(self, idTabela):
        self.faixas = TabelaFaixa()
        return self.faixas.readFaixas(idTabela)

    def geraFaixa(self):
        faixas = TabelaFaixa()
        return faixas

    def geraRota(self):
        self.rota = Rota()
        self.rota.salvaRota('RotaTeste', 'TE', 'ST', 'TE', 'ST')
        return self.rota
