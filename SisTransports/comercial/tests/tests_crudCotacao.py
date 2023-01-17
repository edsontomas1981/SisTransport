from django.test import TestCase
from Classes.utils import dprint,dpprint
from comercial.classes.cotacao import Cotacao
from Classes.geraDados import GeraDados


class CrudCotacaoTestCase(TestCase):

    def setUp(self):
        self.geraDados = GeraDados()
        self.objCotacao = Cotacao()
        self.objDtc = self.geraDados.geraDtc()
        self.objRota = self.geraDados.geraRota()
        self.objTabFrete = self.geraDados.criaTabela(self.geraDados.geraDadosTabela(
            10, 2, 0, 0, 0, 0, 0, 1, 300, 150, 1,
            'off', 'on', 'off', 7))
        self.dadosCotacao = {'peso': [250], 'qtde': [1], 'vlrNf': [1500.00], 'm3': [1],
                             'dtc_fk': [self.objDtc.dtc], 'tabela': [self.objTabFrete.tabela],
                             'rota': [self.objRota.rota], 'formaDeCalculo': [1], 'numNf': [1]}
        self.dadosIncorretos = {}

    def test_createCotacao(self):
        self.assertEquals(self.objCotacao.createCotacao(
            self.dadosIncorretos), 400)
        self.assertEquals(self.objCotacao.createCotacao(
            self.dadosCotacao), 200)

    def test_readCotacao(self):
        self.assertEquals(self.objCotacao.createCotacao(
            self.dadosCotacao), 200)
        self.assertDictEqual(self.objCotacao.readCotacao(1),
                             {'resposta': 200, 'cotacao': self.objCotacao.cotacao.toDict()})

    def test_updateCotacao(self):
        self.dadosCotacao = {'peso': [300], 'qtde': [1], 'vlrNf': [1500.00], 'm3': [1],
                             'dtc_fk': [self.objDtc.dtc], 'tabela': [self.objTabFrete.tabela],
                             'rota': [self.objRota.rota], 'formaDeCalculo': [1], 'numNf': [1]}
        self.assertEquals(self.objCotacao.createCotacao(
            self.dadosCotacao), 200)
        self.assertDictEqual(self.objCotacao.updateCotacao(self.dadosCotacao, 1),
                             {'resposta': 200, 'cotacao': self.objCotacao.cotacao.toDict()})
        self.assertEqual(self.objCotacao.cotacao.peso,
                         300, 'Erro ao atualizar cotacao')

    def test_deleteCotacao(self):
        self.dadosCotacao = {'peso': [300], 'qtde': [1], 'vlrNf': [1500.00], 'm3': [1],
                             'dtc_fk': [self.objDtc.dtc], 'tabela': [self.objTabFrete.tabela],
                             'rota': [self.objRota.rota], 'formaDeCalculo': [1], 'numNf': [1]}
        self.assertEquals(self.objCotacao.createCotacao(
            self.dadosCotacao), 200)

        self.assertDictEqual(self.objCotacao.deleteCotacao(1),
                             {'resposta': 200})   
             
        self.assertDictEqual(self.objCotacao.readCotacao(1),
                             {'resposta': 400,'mensagem': 'Cotação nao encontrada'})
    
    def test_calculaFretePorPeso(self):
        
        self.objTabFrete = self.geraDados.criaTabela(self.geraDados.geraDadosTabela(
                                    1.50,1,5,15,35,25,3.5,1,300,150,1,'on','on','off',7))
        
        self.dadosCotacao = {'peso': [5], 'qtde': [5], 'vlrNf': [15.00],'m3': [0.001],
                             'dtc_fk': [self.objDtc.dtc], 'tabela': [self.objTabFrete.tabela],
                             'rota': [self.objRota.rota], 'formaDeCalculo': [1], 'numNf': [1]}
        self.assertEquals(self.objCotacao.createCotacao(
                                        self.dadosCotacao), 200)   
        
        self.objCotacao.calculaFrete()                                      
        
        self.assertEquals(self.objCotacao.cotacao.adValor, 0.75)                      
        self.assertEquals(self.objCotacao.cotacao.gris, 2.25)                         
        self.assertEquals(self.objCotacao.cotacao.pesoCubado, 0.3)                    
        self.assertEquals(self.objCotacao.cotacao.pesoCalcular, 5)
        self.assertEquals(self.objCotacao.cotacao.peso, 5)
        self.assertEquals(self.objCotacao.cotacao.fretePeso, 7.5)
        self.assertEquals(self.objCotacao.cotacao.despacho, 35)
        self.assertEquals(self.objCotacao.cotacao.outros, 25)
        self.assertEquals(self.objCotacao.cotacao.pedagio, 3.5)
        self.assertEquals(self.objCotacao.cotacao.aliquotaIcms, 0.93) 
        self.assertEquals(self.objCotacao.cotacao.subtotal, 74) 
        self.assertEquals(self.objCotacao.cotacao.totalFrete, 150.00)   
        
    def test_calculaFretePorPercentual(self):
        
        self.objTabFrete = self.geraDados.criaTabela(
                self.geraDados.geraDadosTabela(10,2,0,0,0,0,0,1,300,150, 1,'on','on','off',7))
        
        self.dadosCotacao = {'peso': [250], 'qtde': [5], 'vlrNf': [1500.00],'m3': [1],
                             'dtc_fk': [self.objDtc.dtc], 'tabela': [self.objTabFrete.tabela],
                             'rota': [self.objRota.rota], 'formaDeCalculo': [1], 'numNf': [1]}
        self.assertEquals(self.objCotacao.createCotacao(
                                        self.dadosCotacao), 200)   
        
        self.objCotacao.calculaFrete()
        self.assertEquals(self.objCotacao.cotacao.fretePeso,150)
        self.assertEquals(self.objCotacao.cotacao.adValor, 0)                      
        self.assertEquals(self.objCotacao.cotacao.gris, 0) 
        self.assertEquals(self.objCotacao.cotacao.despacho, 0)
        self.assertEquals(self.objCotacao.cotacao.outros, 0)
        self.assertEquals(self.objCotacao.cotacao.pedagio, 0)
        self.assertEquals(self.objCotacao.cotacao.aliquotaIcms, 0.93) 
        self.assertEquals(self.objCotacao.cotacao.subtotal, 150.00) 
        self.assertEquals(self.objCotacao.cotacao.totalFrete, 161.29)             

    def test_calculaFretePorVolumes(self):
        
        self.objTabFrete = self.geraDados.criaTabela(
                self.geraDados.geraDadosTabela(110,3,0,0,0,0,0,1,300,150,1,'on','on','off',7))
        
        self.dadosCotacao = {'peso': [250], 'qtde': [1], 'vlrNf': [1500.00],'m3': [1],
                             'dtc_fk': [self.objDtc.dtc], 'tabela': [self.objTabFrete.tabela],
                             'rota': [self.objRota.rota], 'formaDeCalculo': [1], 'numNf': [1]}
        self.assertEquals(self.objCotacao.createCotacao(
                                        self.dadosCotacao), 200)          
        
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

    def test_calculaFretePorFaixaZerado(self):
        
        self.objTabFrete = self.geraDados.criaTabela(
                self.geraDados.geraDadosTabela(10,1,0,0,0,0,0,1,300,50, 1,'off','on','off',7))

        '''Peso e cubagem zerados usando frete minimo'''
        self.dadosCotacao = {'peso': [0], 'qtde': [5], 'vlrNf': [1500.00],'m3': [0.00],
                             'dtc_fk': [self.objDtc.dtc], 'tabela': [self.objTabFrete.tabela],
                             'rota': [self.objRota.rota], 'formaDeCalculo': [1], 'numNf': [1]}
        self.assertEquals(self.objCotacao.createCotacao(
                                        self.dadosCotacao), 200)                 
        self.geraFaixas()
        self.objCotacao.calculaFrete()
        self.assertEquals(self.objCotacao.cotacao.totalFrete,50.00) 
        
    def test_limiteInicialFaixaPeso(self):
        
        self.objTabFrete = self.geraDados.criaTabela(
                self.geraDados.geraDadosTabela(10,1,0,0,0,0,0,1,300,50, 1,'off','on','off',7))

        '''Peso e cubagem zerados usando frete minimo'''
        self.dadosCotacao = {'peso': [1], 'qtde': [5], 'vlrNf': [1500.00],'m3': [0.00],
                             'dtc_fk': [self.objDtc.dtc], 'tabela': [self.objTabFrete.tabela],
                             'rota': [self.objRota.rota], 'formaDeCalculo': [1], 'numNf': [1]}
        self.assertEquals(self.objCotacao.createCotacao(
                                        self.dadosCotacao), 200)                 
        self.geraFaixas()
        self.objCotacao.calculaFrete()
        self.assertEquals(self.objCotacao.cotacao.totalFrete,60.00) 
        
    def test_limiteInicialFaixaCubagem(self):
        self.objTabFrete = self.geraDados.criaTabela(
                self.geraDados.geraDadosTabela(10,1,0,0,0,0,0,1,300,50, 1,'off','on','off',7))
        self.dadosCotacao = {'peso': [0], 'qtde': [5], 'vlrNf': [1500.00],'m3': [0.01],
                             'dtc_fk': [self.objDtc.dtc], 'tabela': [self.objTabFrete.tabela],
                             'rota': [self.objRota.rota], 'formaDeCalculo': [1], 'numNf': [1]}
        self.assertEquals(self.objCotacao.createCotacao(
                                        self.dadosCotacao), 200)                 
        self.geraFaixas()
        self.objCotacao.calculaFrete()
        self.assertEquals(self.objCotacao.cotacao.totalFrete,60.00)   

    def test_meioFaixaPeso(self):
        self.objTabFrete = self.geraDados.criaTabela(
                self.geraDados.geraDadosTabela(10,1,0,0,0,0,0,1,300,50, 1,'off','on','off',7))
        self.dadosCotacao = {'peso': [15.5], 'qtde': [5], 'vlrNf': [1500.00],'m3': [0.00],
                             'dtc_fk': [self.objDtc.dtc], 'tabela': [self.objTabFrete.tabela],
                             'rota': [self.objRota.rota], 'formaDeCalculo': [1], 'numNf': [1]}
        self.assertEquals(self.objCotacao.createCotacao(
                                        self.dadosCotacao), 200)                 
        self.geraFaixas()
        self.objCotacao.calculaFrete()
        self.assertEquals(self.objCotacao.cotacao.totalFrete,60.00)         

    def test_finalFaixaPeso(self):
        self.objTabFrete = self.geraDados.criaTabela(
                self.geraDados.geraDadosTabela(10,1,0,0,0,0,0,1,300,50, 1,'off','on','off',7))
        self.dadosCotacao = {'peso': [30], 'qtde': [5], 'vlrNf': [1500.00],'m3': [0.00],
                             'dtc_fk': [self.objDtc.dtc], 'tabela': [self.objTabFrete.tabela],
                             'rota': [self.objRota.rota], 'formaDeCalculo': [1], 'numNf': [1]}
        self.assertEquals(self.objCotacao.createCotacao(
                                        self.dadosCotacao), 200)                 
        self.geraFaixas()
        self.objCotacao.calculaFrete()
        self.assertEquals(self.objCotacao.cotacao.totalFrete,60.00)   

    def test_escapeFreteFaixaPesoFreteMinimo(self):
        self.objTabFrete = self.geraDados.criaTabela(
                    self.geraDados.geraDadosTabela(1.5,1,0,0,0,0,0,1,300,150, 1,'off','on','off',7))
        self.dadosCotacao = {'peso': [71], 'qtde': [5], 'vlrNf': [1500.00],'m3': [0.00],
                             'dtc_fk': [self.objDtc.dtc], 'tabela': [self.objTabFrete.tabela],
                             'rota': [self.objRota.rota], 'formaDeCalculo': [1], 'numNf': [1]}
        self.assertEquals(self.objCotacao.createCotacao(
                                        self.dadosCotacao), 200)                 
        self.geraFaixas()
        self.objCotacao.calculaFrete()
        self.assertEquals(self.objCotacao.cotacao.totalFrete,150.00)                        

    def test_escapeFreteFaixaPesoFretePeso(self):
        self.objTabFrete = self.geraDados.criaTabela(
                    self.geraDados.geraDadosTabela(1.5,1,0,0,0,0,0,1,300,150, 1,'off','on','off',7))
        self.dadosCotacao = {'peso': [31], 'qtde': [5], 'vlrNf': [1500.00],'m3': [1],
                             'dtc_fk': [self.objDtc.dtc], 'tabela': [self.objTabFrete.tabela],
                             'rota': [self.objRota.rota], 'formaDeCalculo': [1], 'numNf': [1]}
        self.assertEquals(self.objCotacao.createCotacao(
                                        self.dadosCotacao), 200)                 
        self.geraFaixas()
        self.objCotacao.calculaFrete()
        self.assertEquals(self.objCotacao.cotacao.totalFrete,450.00)

    def test_ultimoLimiteFaixas(self):
        self.objTabFrete = self.geraDados.criaTabela(
                    self.geraDados.geraDadosTabela(1.5,1,0,0,0,0,0,1,300,50, 1,'off','on','off',7))
        self.dadosCotacao = {'peso': [70], 'qtde': [5], 'vlrNf': [1500.00],'m3': [0],
                             'dtc_fk': [self.objDtc.dtc], 'tabela': [self.objTabFrete.tabela],
                             'rota': [self.objRota.rota], 'formaDeCalculo': [1], 'numNf': [1]}
        self.assertEquals(self.objCotacao.createCotacao(
                                        self.dadosCotacao), 200)                 
        self.geraFaixas()
        self.objCotacao.calculaFrete()
        self.assertEquals(self.objCotacao.cotacao.totalFrete,90.00)                                             
    
    def geraFaixas(self):
        self.geraDados.criaFaixa(1, 30, 60, self.objCotacao.cotacao.tabela_fk)
        self.geraDados.criaFaixa(31, 50,70, self.objCotacao.cotacao.tabela_fk)
        self.geraDados.criaFaixa(51, 60, 80, self.objCotacao.cotacao.tabela_fk)
        self.geraDados.criaFaixa(61, 70, 90, self.objCotacao.cotacao.tabela_fk)
        

        