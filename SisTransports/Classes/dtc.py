from operacional.models.dtc import Dtc  as dctoCarga
from parceiros.models.parceiros import Parceiros

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
        
    def to_dict(self):
        return self.dtc.to_dict()
    