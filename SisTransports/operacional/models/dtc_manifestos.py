from django.db import models
from django.conf import settings
from django.utils import timezone
from datetime import datetime
from dateutil import parser

from operacional.models.dtc import Dtc
from operacional.models.manifestos import Manifesto
from operacional.models.ocorrencias_manifesto import Ocorrencia_manifesto as OcorrenciaManifesto


class DtcManifesto(models.Model):
    dtc_fk = models.ForeignKey(Dtc, on_delete=models.CASCADE)
    manifesto_fk = models.ForeignKey(Manifesto, on_delete=models.CASCADE)
    ocorrencia_manifesto_fk = models.ForeignKey(OcorrenciaManifesto, on_delete=models.CASCADE)

    usuario_cadastro = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='criador_dtc_manifesto'
    )
    usuario_ultima_atualizacao = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='atualizador_dtc_manifesto'
    )
    data_cadastro = models.DateTimeField(null=True)
    data_ultima_atualizacao = models.DateTimeField(default=timezone.now)  

    def to_dict(self):
        data_cadastro_iso = self.data_cadastro.isoformat() if self.data_cadastro else None
        data_ultima_atualizacao_iso = self.data_ultima_atualizacao.isoformat() if self.data_ultima_atualizacao else None
        
        return {
            'id': self.id,
            'dtc_fk': self.dtc_fk.to_dict() if self.dtc_fk else None,
            'manifesto_fk': self.manifesto_fk.to_dict() if self.manifesto_fk else None,
            'ocorrencia_manifesto_fk': self.ocorrencia_manifesto_fk.to_dict() if self.ocorrencia_manifesto_fk else None,
            'usuario_cadastro': self.usuario_cadastro,
            'usuario_ultima_atualizacao': self.usuario_ultima_atualizacao,
            'data_cadastro': data_cadastro_iso,
            'data_ultima_atualizacao': data_ultima_atualizacao_iso,
        }

    
    class Meta:
        unique_together = ('dtc_fk','manifesto_fk')

