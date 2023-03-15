from comercial.classes.tabelaFrete import TabelaFrete
from Classes.utils import dprint

class Calculo():
    def __init__(self,dados):
        self.dados=dados
    
    def carregaTabela(self):
        tabela=TabelaFrete()
        tabela.readTabela(self.dados['tabela'])
        self.tabela=tabela.tabela
    def calcula(self):
        self.carregaTabela()
        dprint(vars(self.tabela))
        
    

    def calculaFrete(self):
        pass
       
       
    
   
    