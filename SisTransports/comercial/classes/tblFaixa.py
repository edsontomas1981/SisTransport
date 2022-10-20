from comercial.models.tabelaFrete import TabelaFrete as TblFrete
from comercial.models.tabelaFaixa import TabelaFaixa as Faixa
from Classes.utils import toFloat

def verificaFaixa(idFaixa,idTabela):
    pass

class TabelaFaixa:
    def __init__(self):
        self.faixa=None

    def createFaixa(self,tblVinculada,inicial,final,vlrFaixa):
        self.faixa=Faixa()        
        tabela=TblFrete.objects.get(id=tblVinculada)
        
        self.faixa.tblVinculada=tabela
        self.faixa.faixaInicial= inicial
        self.faixa.faixaFinal=final
        self.faixa.vlrFaixa=toFloat(vlrFaixa)
        self.faixa.save()
 
    # seleciona todas as faixas referentes a tabela 
    def readFaixas(self,idTabela):
        pass        
    
    def readFaixa(self,idFaixa):
        pass    

    def updateFaixa(self,idFaixa,tblVinvulada,inicial,final,vlrFaixa):
        if Faixa.objects.filter(id=idFaixa).exists():
            self.faixa=Faixa.objects.filter(id=idFaixa).get()
            self.faixa.tblVinculada=tblVinvulada
            self.faixa.faixaInicial= inicial
            self.faixa.faixaFinal=final
            self.faixa.vlrFaixa=toFloat(vlrFaixa)
            self.faixa.save()
        else:
            return False
        
    def deleteFaixa(self,idFaixa):
        pass        
    
    def deleteFaixa(self,idFaixa):
        pass
    
    def toDict(self):
        return self.faixa.toDict()
    