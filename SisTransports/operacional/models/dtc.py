from django.db import models
from parceiros.models.parceiros import Parceiros
from operacional.models.rota import Rota
from operacional.models.coleta import Coleta


class Dtc (models.Model):
    coleta_fk=models.ForeignKey(Coleta, on_delete=models.CASCADE, null=True, related_name='coletaDtc')
    remetente_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE,related_name='remetDtc')
    destinatario_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE, related_name='destDtc')
    redespacho_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE,null=True, related_name='redespDtc')
    consignatario_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE,null=True, related_name='consigDtc')
    tipoFrete=models.CharField(max_length=15, null=True)
    rota_fk=models.ForeignKey(Rota, on_delete=models.CASCADE, null=True, related_name='rotaDtc')
    
    def to_dict(self):
        dtc = {'id':self.id}
        if self.remetente_fk :
            dtc.update({'remetente':self.remetente_fk.to_dict()})
        if self.destinatario_fk :
            dtc.update({'destinatario':self.destinatario_fk.to_dict() })
        if self.redespacho_fk :
            dtc.update({'redespacho':self.redespacho_fk.to_dict()})                
        if self.consignatario_fk :
            dtc.update({'consignatario':self.consignatario_fk.to_dict()}) 
        if self.coleta_fk :
            dtc.update({'coleta':self.coleta_fk.to_dict()})          
        return dtc
