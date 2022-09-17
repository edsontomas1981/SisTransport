from operacional.models.dtc import Dtc  as dctoCarga
from operacional.models.coleta import Coleta


class Dtc():
    def __init__(self):
        pass
    def __str__(self):
        return self.dtc.id
    def incluiDtc(self,remetente,destinatario,redespacho=False,consignatario=False):
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
        
    def buscaDtc(self,idDtc):
        if dctoCarga.objects.filter(id=idDtc).exists():
            self.dtc=dctoCarga.objects.filter(id=idDtc).get()
            return self.dtc.to_dict()
    def excluiDtc(self,idDtc):
        if dctoCarga.objects.filter(id=idDtc).exists():
            self.dtc=dctoCarga.objects.filter(id=idDtc).get()
            return self.dtc.delete()
    def alteraDtc(self,idDtc,remetente=None,destinatario=None,redespacho=None
                  ,consignatario=None,tipoFrete=None,rota=None,coleta:object=None):
        if dctoCarga.objects.filter(id=idDtc).exists():
            self.dtc=dctoCarga.objects.filter(id=idDtc).get()
            self.dtc.remetente_fk if remetente else None
            self.dtc.destinatario_fk if destinatario else None          
            self.dtc.redespacho_fk if redespacho else None          
            self.dtc.consignatario_fk if consignatario else None          
            self.dtc.tipoFrete if tipoFrete else None          
            self.dtc.rota_fk if rota else None                      
            self.dtc.save()
    def dtcTemColeta(self):
        if self.coleta:
            return True
        else:
            return False
    def obtemDtc(self,idDtc):
        if dctoCarga.objects.filter(id=idDtc).exists():
            self.dtc=dctoCarga.objects.filter(id=idDtc).get()
            return self.dtc
        else:
            return False
    def to_dict(self):
        return self.dtc.to_dict()
    