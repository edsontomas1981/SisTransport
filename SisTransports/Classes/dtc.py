from operacional.models.dtc import Dtc  as dctoCarga
from operacional.models.coleta import Coleta


class Dtc():
    def __init__(self):
        pass
    def __str__(self):
        return self.dtc.id
    def createDtc(self,remetente,destinatario,redespacho=False,consignatario=False):
        self.dtc=dctoCarga()
        self.dtc.remetente_fk=remetente
        self.dtc.destinatario_fk=destinatario
        if redespacho : 
            self.dtc.redespacho_fk=redespacho
        if consignatario :
            self.dtc.consignatario_fk=consignatario
        self.dtc.save()
    def incluiOuAlteraColeta(self,coleta):
        self.dtc.coleta_fk=coleta
        self.dtc.save()
    #Retorna dicionario com dados do dtc    
    def dtcToDict(self,idDtc):
        if dctoCarga.objects.filter(id=idDtc).exists():
            self.dtc=dctoCarga.objects.filter(id=idDtc).get()
            return self.dtc.to_dict()
    def deleteDtc(idDtc):
        if dctoCarga.objects.filter(id=idDtc).exists():
            dtc=dctoCarga.objects.filter(id=idDtc).get()
            dtc.delete()

    def updateDtc(self,remetente=None,destinatario=None,redespacho=None,
                  consignatario=None,tipoFrete=None,rota=None,coleta:object=None):
        self.dtc.remetente_fk = remetente 
        self.dtc.destinatario_fk=destinatario
        self.dtc.redespacho_fk =redespacho
        self.dtc.consignatario_fk = consignatario         
        self.dtc.tipoFrete = tipoFrete         
        self.dtc.rota_fk = rota                     
        self.dtc.save()
        
    def dtcTemColeta(self):
        if self.coleta:
            return True
        else:
            return False

    def readDtc(self,idDtc):
        if dctoCarga.objects.filter(id=idDtc).exists():
            dtc=dctoCarga.objects.filter(id=idDtc).get()  
            self.dtc=dtc
            return self
            
    def to_dict(self):
        return self.dtc.to_dict()
    