from operacional.models.dtc import Dtc as ClsDtc
from Classes.utils import verificaCamposObrigatorios,toFloat,checkBox,dprint,dpprint


class Dtc:
    def __init__(self):
        self.dtc=ClsDtc()
    
    def salvaOuAlteraDtc(self,dados):
        self.dtc.remetente_fk=dados['remetente']
        self.dtc.destinatario_fk=dados['destinatario']
        self.dtc.tipoFrete=dados['modalidadeFrete']
        dprint(dados['modalidadeFrete'])
        self.dtc.tomadorFrete=dados['tomador']
        if dados['consignatario'] :
            self.dtc.consignatario_fk=dados['consignatario']
        self.dtc.save()
    
    def createDtc(self,dados):
        self.salvaOuAlteraDtc(dados)
        pass
    
    def readRotas(self):
        rotas=[]
        self.rota=ClsDtc.objects.all().order_by('nome')
        for i in self.rota:
            rotas.append(i.to_dict())    
        return rotas 
      
    def readRota(self,idRota):
        if ClsDtc.objects.filter(id=idRota).exists():
            self.rota=ClsDtc.objects.filter(id=idRota).get()
            return self.rota
        else:
            return False        
   
    def deleteRota(self,idRota):
        pass
    