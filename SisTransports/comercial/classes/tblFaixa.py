from comercial.models.tabelaFrete import TabelaFrete as TblFrete
from comercial.models.tabelaFaixa import TabelaFaixa as Faixa
from Classes.utils import toFloat



class TabelaFaixa:
    def __init__(self):
        self.faixa=None

    def createFaixa(self,tblVinculada,inicial,final,vlrFaixa):
        self.faixa=Faixa() 
        self.faixa.tblVinculada=tblVinculada
        if self.verificaFaixa(inicial,tblVinculada.id) or self.verificaFaixa(inicial,tblVinculada.id):
            return 400 #Faixa ja coberta 
        else:
            
            self.faixa.faixaInicial= inicial
            self.faixa.faixaFinal=final
            self.faixa.vlrFaixa=toFloat(vlrFaixa)
            self.faixa.save()
            return 200    
            

        
    # seleciona todas as faixas referentes a tabela 
    def readFaixas(self,tblVinculada):
        if Faixa.objects.filter(tblVinculada=tblVinculada).exists():
           faixas=Faixa.objects.filter(tblVinculada=tblVinculada)
           return faixas 
    
    def readFaixa(self,idFaixa):
        pass    

    def updateFaixa(self,idFaixa,tblVinvulada,inicial,final,vlrFaixa):
        if Faixa.objects.filter(id=idFaixa).exists():
            self.faixa=Faixa.objects.filter(id=idFaixa).get()
            self.faixa.tblVinculada=tblVinvulada
            if not self.verificaFaixa(inicial) or not self.verificaFaixa(inicial):
                self.faixa.faixaInicial= inicial
                self.faixa.faixaFinal=final
                self.faixa.vlrFaixa=toFloat(vlrFaixa)
                self.faixa.save()
            else:
                return 400 #Faixa ja coberta
        else:
            return 410 #Tabela nao
        
    def deleteFaixa(self,idFaixa):
        pass        
    
    def deleteFaixa(self,idFaixa):
        pass
    
    def verificaFaixa(self,idFaixa,idTabela):
        faixas=self.readFaixas(idTabela)
        for i in faixas:
            print(i.toDict()) 
        for i in faixas:
            print('*********************************')
            print (idFaixa,'esta entre',i.faixaInicial,i.faixaFinal )
            if idFaixa in range (i.faixaInicial,i.faixaFinal):
                return True
            else:
                return False
            
    
    def toDict(self):
        return self.faixa.toDict()
    