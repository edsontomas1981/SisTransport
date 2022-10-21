from comercial.models.tabelaFrete import TabelaFrete as TblFrete
from comercial.models.tabelaFaixa import TabelaFaixa as Faixa
from Classes.utils import toFloat



class TabelaFaixa:
    def __init__(self):
        self.faixa=None

    def createFaixa(self,tblVinculada,inicial,final,vlrFaixa):
        self.faixa=Faixa() 
        self.faixa.tblVinculada=tblVinculada
        if self.verificaFaixa(inicial,tblVinculada.id) or self.verificaFaixa(final,tblVinculada.id):
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
           faixas=Faixa.objects.filter(tblVinculada=tblVinculada).order_by('faixaInicial')
           for i in faixas:
               print(i.toDict())
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
                return 200
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
        if faixas:
            for i in faixas:
                if int(idFaixa) in range (i.faixaInicial,i.faixaFinal+1) :
                    return True
    def toDict(self):
        return self.faixa.toDict()
    