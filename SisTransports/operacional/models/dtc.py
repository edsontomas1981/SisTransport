from django.db import models
from parceiros.models.parceiros import Parceiros
from operacional.models.rota import Rota
from operacional.models.coleta import Coleta
from django.conf import settings
from datetime import datetime
from django.utils import timezone

class Dtc (models.Model):
    coleta_fk=models.ForeignKey(Coleta, on_delete=models.CASCADE,related_name='coletaDtc', null=True)
    remetente_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE,related_name='remetDtc', null=True)
    destinatario_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE, related_name='destDtc', null=True)
    consignatario_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE,related_name='consigDtc',null=True)
    tomador_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE,related_name='tomadoDtc', null=True)
    tipoFrete=models.IntegerField(default=2)
    rota_fk=models.ForeignKey(Rota, on_delete=models.CASCADE,related_name='rotaDtc',null=True)
    
    # Informações de usuário e data/hora
    usuario_cadastro = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='criador_dtc')
    usuario_ultima_atualizacao = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='atualizador_frete_dtc')
    data_cadastro = models.DateTimeField(null=True)
    data_ultima_atualizacao = models.DateTimeField(default=timezone.now)  
 
    def to_dict(self):

        dtc = {
            'id': self.id,
            'tipoFrete': self.tipoFrete,
            'usuario_cadastro': self.usuario_cadastro_id,
            'usuario_ultima_atualizacao': self.usuario_ultima_atualizacao_id,
            'data_cadastro': self.data_cadastro.strftime('%Y-%m-%d %H:%M:%S') if self.data_cadastro else None,
            'data_ultima_atualizacao': self.data_ultima_atualizacao.strftime('%Y-%m-%d %H:%M:%S') if self.data_ultima_atualizacao else None,
        }

        # Incluir notas fiscais associadas ao Dtc
        notas_fiscais = [nf.to_dict() for nf in self.notas_fiscais.all()]
        dtc['notas_fiscais'] = notas_fiscais

        related_objects = {
            'tomador_fk': 'tomador',
            'remetente_fk': 'remetente',
            'destinatario_fk': 'destinatario',
            'consignatario_fk': 'consignatario',
            'coleta_fk': 'coleta',
            'rota_fk': 'rota'
        }

        for attribute, key in related_objects.items():
            related_obj = getattr(self, attribute)
            if related_obj:
                dtc[key] = related_obj.to_dict()

        return dtc
