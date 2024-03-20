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
        return {
            'id': self.id,
            'dtc_fk_id': self.dtc_fk_id,
            'manifesto_fk_id': self.manifesto_fk_id,
            'ocorrencia_manifesto_fk_id': self.ocorrencia_manifesto_fk_id,
            'usuario_cadastro_id': self.usuario_cadastro_id,
            'usuario_ultima_atualizacao_id': self.usuario_ultima_atualizacao_id,
            'data_cadastro': self.data_cadastro.isoformat() if self.data_cadastro else None,
            'data_ultima_atualizacao': self.data_ultima_atualizacao.isoformat(),
        }
    
    class Meta:
        unique_together = ('dtc_fk', 'manifesto_fk', 'ocorrencia_manifesto_fk')

