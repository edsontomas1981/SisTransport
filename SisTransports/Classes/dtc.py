from operacional.models.dtc import Dtc  as dctoCarga

class Dtc():
    def __init__(self):
        pass
    def __str__(self):
        pass
    def incluiDtc(self,remetente,destinatario,redespacho=False,consignatario=False):
        self.dtc=dctoCarga()
        self.dtc.remetente_fk=remetente
        self.dtc.destinatario_fk=destinatario
        if redespacho :
            self.dtc.redespacho_fk=redespacho
        if consignatario :
            self.dtc.consignatario_fk=consignatario
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
                  ,consignatario=None,tipoFrete=None,rota=None):
        if dctoCarga.objects.filter(id=idDtc).exists():
            self.dtc=dctoCarga.objects.filter(id=idDtc).get()
            if remetente :
                self.dtc.remetente_fk=remetente        
            if destinatario :
                self.dtc.destinatario_fk=destinatario
            
            if redespacho :
                self.dtc.redespacho_fk=redespacho
            else:
                self.dtc.redespacho_fk=None
            if consignatario :
                self.dtc.consignatario_fk=consignatario
            else:
                self.dtc.consignatario_fk=None

            if tipoFrete :
                self.dtc.tipoFrete=tipoFrete
            else:
                self.dtc.tipoFrete=None
            if rota :
                self.dtc.rota_fk=rota                
            self.dtc.save()



    def to_dict(self):
        return self.dtc.to_dict()
    