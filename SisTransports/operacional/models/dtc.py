from django.db import models
from parceiros.models.parceiros import Parceiros
from operacional.models.rota import Rota
from operacional.models.coleta import Coleta


class Dtc (models.Model):
    coleta_fk=models.ForeignKey(Coleta, on_delete=models.CASCADE,related_name='coletaDtc', null=True)
    remetente_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE,related_name='remetDtc', null=True)
    destinatario_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE, related_name='destDtc', null=True)
    redespacho_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE, related_name='redespDtc', null=True)
    consignatario_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE,related_name='consigDtc',null=True)
    tomador_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE,related_name='tomadoDtc', null=True)
    tipoFrete=models.IntegerField(default=2)
    rota_fk=models.ForeignKey(Rota, on_delete=models.CASCADE,related_name='rotaDtc',null=True)
    
    def to_dict(self):
        dtc = {'id':self.id,
               'tipoFrete':self.tipoFrete}
        if self.tomador_fk :
            dtc.update({'tomador':self.tomador_fk.to_dict()})
        if self.remetente_fk :
            dtc.update({'remetente':self.remetente_fk.to_dict()})
        if self.destinatario_fk :
            dtc.update({'destinatario':self.destinatario_fk.to_dict() })
        if self.consignatario_fk :
            dtc.update({'consignatario':self.consignatario_fk.to_dict()}) 
        if self.coleta_fk :
            dtc.update({'coleta':self.coleta_fk.to_dict()})          
        if self.rota_fk :
            dtc.update({'rota':self.rota_fk.to_dict()})          
        return dtc
