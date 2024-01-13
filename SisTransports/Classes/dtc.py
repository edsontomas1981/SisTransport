from operacional.models.dtc import Dtc as DctoCarga
from Classes.utils import dprint

class Dtc():
    def __init__(self):
        pass
    
    def __str__(self):
        return str(self.dtc.to_dict())
    
    def createDtc(self,dados):
        self.dtc=DctoCarga()
        self.dtc.remetente_fk=dados['remetente']
        self.dtc.destinatario_fk=dados['destinatario']
        self.dtc.tipoFrete=dados['modalidadeFrete']
        self.dtc.tomador_fk=dados['tomador']
        if dados['consignatario'] :
            self.dtc.consignatario_fk=dados['consignatario']
        self.dtc.save()
        return 200
        
    def incluiOuAlteraColeta(self,coleta):
        self.dtc.coleta_fk=coleta
        self.dtc.save()
        
    #Retorna dicionario com dados do dtc    
    def dtcToDict(self,idDtc):
        if DctoCarga.objects.filter(id=idDtc).exists():
            self.dtc=DctoCarga.objects.filter(id=idDtc).get()
            return self.dtc.to_dict()
        
    def deleteDtc(idDtc):
        if DctoCarga.objects.filter(id=idDtc).exists():
            dtc=DctoCarga.objects.filter(id=idDtc).get()
            dtc.delete()

    def updateDtc(self,dados,coleta:object=None):
        self.dtc.remetente_fk=dados['remetente']
        self.dtc.destinatario_fk=dados['destinatario']
        self.dtc.tipoFrete=dados['modalidadeFrete']
        self.dtc.tomadorFrete=dados['tomador']
        if dados['consignatario'] :
            self.dtc.consignatario_fk=dados['consignatario']
        self.dtc.save()
        
    def dtcTemColeta(self):
        if self.coleta:
            return True
        else:
            return False

    def readDtc(self,idDtc):
        try:
            if DctoCarga.objects.filter(id=idDtc).exists():
                dtc=DctoCarga.objects.filter(id=idDtc).get()  
                self.dtc=dtc
                return 200
            else:
                return 300
        except:
            return 500
    @staticmethod
    def getDtcId(idDtc):
        try:
            if DctoCarga.objects.filter(id=idDtc).exists():
                return DctoCarga.objects.filter(id=idDtc).get()  
            else:
                return 300
        except:
            return 500
           
    def to_dict(self):
        return self.dtc.to_dict()
    