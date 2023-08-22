from operacional.models.dtc import Dtc as ClsDtc
from Classes.utils import verificaCamposObrigatorios,toFloat
from Classes.utils import checkBox,dprint,dpprint
from operacional.classes.rotas import Rota

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
        else:
            self.dtc.consignatario_fk=None
        if dados['rota'] : 
            self.dtc.rota_fk=dados['rota']            
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
    
    def updateDtc(self, dados, idDtc):
        if ClsDtc.objects.filter(id=idDtc).exists():
            self.dtc = ClsDtc.objects.get(id=idDtc)

            fields_to_update = ['consignatario', 'remetente', 'destinatario', 'modalidadeFrete', 'tomador', 'rota']
            for field in fields_to_update:
                if field in dados:
                    if field == 'tipoFrete':
                        setattr(self.dtc, field, dados[field])
                    else:
                        setattr(self.dtc, f'{field}_fk', dados[field] if dados[field] else None)
                        
            self.dtc.tipoFrete=dados['modalidadeFrete']
            self.dtc.save()
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