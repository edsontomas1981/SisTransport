from operacional.models.coleta import Coleta  as MdlColeta
from operacional.models.dtc import Dtc
from Classes.utils import dprint,toFloat

class Coleta(): 
    def __init__(self):
        self.obj_coleta=MdlColeta()

    def saveOrUpdate(self):
        pass
    
    def readColetaId(self,idColeta):
        if MdlColeta.objects.filter(id=idColeta).exists():
            self.obj_coleta=MdlColeta.objects.filter(id=idColeta).get()

    def readColetaParceiro(self):
        pass

    def createColeta(self):
        pass

    def updateColeta(self):
        pass

    def deleteColeta(self):
        pass