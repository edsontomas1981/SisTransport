from comercial.classes.calculaFrete import calculaAdvalor, calculaGris, pesoACalcular, calculaCubagem, calculaPedagio
from comercial.classes.calculaFrete import somaSubtotais, geraPercentualAliquota, freteFaixa
from django.test import TestCase, Client
from comercial.classes.geraFrete import CalculaFrete
from Classes.utils import checkBox
from Classes.geraDados import GeraDados


class GeraFreteTest(TestCase):

    def setUp(self):
        self.tabela = self.geraTabela(10,2,0,0,0,0,0,1,300,150, 1,'on','on','off',7)
        self.dados = {'peso': [250], 'qtde': [5], 'vlrNf': [1500.00], 'm3': [1]}
        self.faixas=self.geraFaixas()

    def test_calculaFrete(self):
        self.calculaFrete = CalculaFrete()
        self.calculaFrete.calculaFrete(self.dados, self.tabela)
        
        '''Teste calculo percentual '''
        self.dados={'peso': [250], 'qtde': [5], 'vlrNf': [1500.00],'m3': [1]}
        self.assertEquals(self.calculaFrete.fretePeso,150)
        self.assertEquals(self.calculaFrete.adValor, 0)                      
        self.assertEquals(self.calculaFrete.gris, 0) 
        self.assertEquals(self.calculaFrete.despacho, 0)
        self.assertEquals(self.calculaFrete.outros, 0)
        self.assertEquals(self.calculaFrete.pedagio, 0)
        self.assertEquals(self.calculaFrete.aliquotaIcms, 0.93) 
        self.assertEquals(self.calculaFrete.subtotal, 150.00) 
        self.assertEquals(self.calculaFrete.totalFrete, 161.29)
        
        '''Teste calculo por peso'''
        self.tabela = self.geraTabela(1.50,1,5,15,35,25,3.5,1,300,150,1,'on','on','off',7)
        self.dados = {'peso': [5], 'qtde': [5], 'vlrNf': [15.00],'m3': [0.001]}
        self.calculaFrete.calculaFrete(self.dados, self.tabela)

        self.assertEquals(self.calculaFrete.adValor, 0.75)                      
        self.assertEquals(self.calculaFrete.gris, 2.25)                         
        self.assertEquals(self.calculaFrete.pesoCubado, 0.3)                    
        self.assertEquals(self.calculaFrete.pesoCalcular, 5)
        self.assertEquals(self.calculaFrete.peso, 5)
        self.assertEquals(self.calculaFrete.fretePeso, 7.5)
        self.assertEquals(self.calculaFrete.despacho, 35)
        self.assertEquals(self.calculaFrete.outros, 25)
        self.assertEquals(self.calculaFrete.pedagio, 3.5)
        self.assertEquals(self.calculaFrete.aliquotaIcms, 0.93) 
        self.assertEquals(self.calculaFrete.subtotal, 74) 
        self.assertEquals(self.calculaFrete.totalFrete, 150.00)        
        
        '''Teste calculo por volumes'''
        self.tabela = self.geraTabela(110,3,0,0,0,0,0,1,300,150,1,'on','on','off',7)
        self.dados = {'peso': [250], 'qtde': [1], 'vlrNf': [1500.00],'m3': [1]}
        self.calculaFrete.calculaFrete(self.dados, self.tabela)  
        
        self.assertEquals(self.calculaFrete.adValor, 0)                      
        self.assertEquals(self.calculaFrete.gris, 0) 
        self.assertEquals(self.calculaFrete.despacho, 0)
        self.assertEquals(self.calculaFrete.outros, 0)
        self.assertEquals(self.calculaFrete.pedagio, 0)
        self.assertEquals(self.calculaFrete.aliquotaIcms, 0.93) 
        self.assertEquals(self.calculaFrete.fretePeso,110)
        self.assertEquals(self.calculaFrete.subtotal, 110) 
        self.assertEquals(self.calculaFrete.totalFrete, 150)    
        
        '''Teste calculo por faixas'''  
        self.tabela = self.geraTabela(1.5, 1, 0, 0, 0, 0, 0, 1, 300, 50, 1, 'off', 'on', 'off', 7)
        self.dados = {'peso': [1], 'qtde': [5], 'vlrNf': [1500.30], 'm3': [0.01]}
        self.calculaFrete.calculaFrete(self.dados, self.tabela,faixas=self.faixas) 
        '''Testa limite inicial da faixa'''
        self.assertEquals(self.calculaFrete.totalFrete,60.00)   

        '''Testa limite mmeio da faixa'''
        self.dados = {'peso': [15.5], 'qtde': [5], 'vlrNf': [1500.30], 'm3': [0.01]}
        self.calculaFrete.calculaFrete(self.dados, self.tabela,faixas=self.faixas)   
        self.assertEquals(self.calculaFrete.totalFrete,60.00)    

        
        '''Testa limite final da faixa'''
        self.dados = {'peso': [30], 'qtde': [5], 'vlrNf': [1500.30], 'm3': [0.01]}
        self.calculaFrete.calculaFrete(self.dados, self.tabela,faixas=self.faixas)   
        self.assertEquals(self.calculaFrete.totalFrete,60.00)   
        
         
        
        
        

    def geraTabela(self, vlrFrete, tipoCalculoFrete: int,
                   advalor: int, gris: int, despacho: float,
                   outros: float, pedagio: float, tipoPeda: int,
                   cubagem: int, freteMinimo: float, tipTab: int,
                   icms='on', cobraCubagem='on', tabBloq='off', aliquotaIcms=7):

        return {'descTabela': ['Tabela Teste'], 'icms': [checkBox(icms)],
                'tabBloq': [checkBox(tabBloq)], 'vlrFrete': [vlrFrete],
                'tipoFrete': [tipoCalculoFrete], 'advalor': [advalor],
                'gris': [gris], 'despacho': [despacho], 'outros': [outros],
                'pedagio': [pedagio], 'tipoCobranPedagio': [tipoPeda],
                'cobraCubagem': [checkBox(cobraCubagem)], 'cubagem': [cubagem],
                'freteMinimo': [freteMinimo], 'tipoTabela': [tipTab],
                'aliquotaIcms': [aliquotaIcms]}

    def geraFaixas(self):
       return{Faixa(1, 30, 60),
        Faixa(31, 50,70),
        Faixa(51, 60, 80),
        Faixa(61, 70, 90)}
       
class Faixa:
    def __init__(self,inicio,final,vlr):
        self.faixaInicial=inicio
        self.faixaFinal=final
        self.vlrFaixa=vlr
    