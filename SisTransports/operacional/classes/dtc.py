from operacional.models.dtc import Dtc as ClsDtc
from Classes.utils import verificaCamposObrigatorios,toFloat
from Classes.utils import checkBox,dprint,dpprint

class Dtc:
    def __init__(self):
        self.dtc=ClsDtc()
    
    def salvaOuAlteraDtc(self,dados):
        self.dtc.remetente_fk=dados['remetente'] if dados['remetente'] else None
        self.dtc.destinatario_fk=dados['destinatario']
        self.dtc.tipoFrete=dados['modalidadeFrete']
        self.dtc.tomador_fk=dados['tomador']
        if dados['consignatario'] :
            self.dtc.consignatario_fk=dados['consignatario']
        self.dtc.save()
    
    def createDtc(self,dados):
        try:
            self.salvaOuAlteraDtc(dados)
        except:
            return 300
        
    
    def readDtc(self,idDtc):
        if ClsDtc.objects.filter(id=idDtc).exists():
            dtc=ClsDtc.objects.filter(id=idDtc).get()  
            self.dtc=dtc
    
    def updateDtc (self,dados,idDtc):
        if ClsDtc.objects.filter(id=idDtc).exists():
            self.dtc=ClsDtc.objects.filter(id=idDtc).get() 
            self.salvaOuAlteraDtc(dados)
            return 200
        else:
            return 400
        
    def anexaColeta(self,idDtc,coleta):
        try:
            if ClsDtc.objects.filter(id=idDtc).exists():
                self.dtc=ClsDtc.objects.filter(id=idDtc).get() 
                self.dtc.coleta_fk=coleta
                self.dtc.save()
                return 200
        except:
            return 300
            
   
    def deleteRota(self,idRota):
        pass
    
    def to_dict(self):
        return self.dtc.to_dict()