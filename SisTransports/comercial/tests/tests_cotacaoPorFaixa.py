from django.test import TestCase, Client
from comercial.classes.tabelaFrete import TabelaFrete
from Classes.utils import dprint,dpprint
from Classes.geraDados import GeraDados
from parceiros.views import salva_parceiro
from enderecos.views import salva_end
from comercial.classes.cotacao import Cotacao


class CotacaoPorFaixaTest(TestCase):

    def setUp(self):
        self.objGeraDados = GeraDados()
        self.objGeraDados.geraRota()
        self.tabela = self.objGeraDados.criaTabela(self.objGeraDados.geraDadosTabela(
            10, 2, 0, 0, 0, 0, 0, 1, 300, 150, 1, 'off', 'on', 'off', 7))

        self.endereco = self.objGeraDados.geraEndereco()
        self.dtc = self.objGeraDados.geraDtc()
        self.dadosIncorretos = {}
        self.geraFaixas()

        self.faixas = self.objGeraDados.pegaFaixas(1)

    def dtest_cotacaoPorFaixa(self):
        self.objCotacao = Cotacao()
        self.assertEquals(self.objCotacao.createCotacao(self.dadosIncorretos), 400)

        '''Testa limite inicial  '''
        self.tabela = self.objGeraDados.criaTabela(self.objGeraDados.geraDadosTabela(
                                    1.5, 1, 0, 0, 0, 0, 0, 1, 300, 50, 1, 'off', 'on', 'off', 7))        
        self.dadosCorretosCotacao = self.objGeraDados.geraDadosCotacao(1,5,1500.30,0.01)
        self.assertEquals(self.objCotacao.createCotacao(self.dadosCorretosCotacao), 200)
        self.objCotacao.calculaFrete(faixas=self.faixas)
        self.assertEquals(self.objCotacao.cotacao.totalFrete,60.00)
        
        ''' Testa 1º Faixa na cubagem '''
        self.dadosCorretosCotacao = self.objGeraDados.geraDadosCotacao(0,5,1500.30,0.1)
        self.assertEquals(self.objCotacao.createCotacao(self.dadosCorretosCotacao), 200)
        self.objCotacao.calculaFrete(faixas=self.faixas)
        self.assertEquals(self.objCotacao.cotacao.totalFrete,60.00) 

        '''Testa 2º Faixa peso real'''
        self.dadosCorretosCotacao = self.objGeraDados.geraDadosCotacao(31,5,1500.30,0.01)
        self.assertEquals(self.objCotacao.createCotacao(self.dadosCorretosCotacao), 200)
        self.objCotacao.calculaFrete(faixas=self.faixas)
        self.assertEquals(self.objCotacao.cotacao.totalFrete,70.00)                

        ''' Testa 2º Faixa cubagem'''
        self.dadosCorretosCotacao = self.objGeraDados.geraDadosCotacao(1,5,1500.30,0.15)
        self.assertEquals(self.objCotacao.createCotacao(self.dadosCorretosCotacao), 200)
        self.objCotacao.calculaFrete(faixas=self.faixas)
        self.assertEquals(self.objCotacao.cotacao.totalFrete,70.00)   
        
        ''' Testa escape da faixa para calculo conforme tabela'''
        self.tabela = self.objGeraDados.criaTabela(self.objGeraDados.geraDadosTabela(
                                    1.5, 1, 0, 0, 0, 0, 0, 1, 300, 150, 1, 'off', 'on', 'off', 7))
        
        self.dadosCorretosCotacao = self.objGeraDados.geraDadosCotacao(75,5,1500.30,0.15)
        self.assertEquals(self.objCotacao.createCotacao(self.dadosCorretosCotacao), 200)
        self.objCotacao.calculaFrete(faixas=self.faixas)
        self.assertEquals(self.objCotacao.cotacao.totalFrete,150.00)          

    def geraFaixas(self):
        self.objGeraDados.criaFaixa(1, 30, 60, self.tabela.tabela)
        self.objGeraDados.criaFaixa(31, 50,70, self.tabela.tabela)
        self.objGeraDados.criaFaixa(51, 60, 80, self.tabela.tabela)
        self.objGeraDados.criaFaixa(61, 70, 90, self.tabela.tabela)
