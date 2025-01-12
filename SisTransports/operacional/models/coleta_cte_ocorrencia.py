from django.db import models
from django.conf import settings
from operacional.models.ocorrencias_operacoes import TipoOcorrencia
from operacional.models.cte import Cte
from operacional.models.coleta import Coleta
from operacional.models.dtc import Dtc
from operacional.models.manifestos import Manifesto

class Ocorrencia(models.Model):
    """
    Representa uma ocorrência associada a um Cte ou Coleta.
    """
    cte_fk = models.ForeignKey(Cte, on_delete=models.CASCADE, null=True, blank=True, related_name="ocorrencias_cte_fk")
    dtc_fk = models.ForeignKey(Dtc, on_delete=models.CASCADE, null=True, blank=True, related_name="ocorrencias_dtc_fk")
    manifesto_fk = models.ForeignKey(Manifesto, on_delete=models.CASCADE, null=True, blank=True, related_name="ocorrencias_dtc_fk")
    coleta_fk = models.ForeignKey(Coleta, on_delete=models.CASCADE, null=True, blank=True, related_name="ocorrencias_coleta_fk")
    tipo_ocorrencia_fk = models.ForeignKey(TipoOcorrencia, on_delete=models.CASCADE, related_name="ocorrencias_tipo_ocorrencia_fk")
    data_ocorrencia = models.DateTimeField(null=True)
    hora_ocorrencia = models.CharField(null=True,default='00:00',max_length=10)
    data_registro = models.DateTimeField(auto_now_add=True)
    hora_registro = models.CharField(null=True,default='00:00',max_length=10) 
    observacao = models.TextField(null=True, blank=True)
    responsavel = models.CharField(max_length=100, null=True, blank=True)
    usuario_cadastro = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='cadastrado_ocorrencia')


    class Meta:
        verbose_name = "Ocorrência"
        verbose_name_plural = "Ocorrências"
        ordering = ["data_ocorrencia"]

    def __str__(self):
        tipo_ocorrencia = self.tipo_ocorrencia_fk.codigo if self.tipo_ocorrencia_fk else "Sem tipo"
        data_ocorrencia = self.data_ocorrencia.strftime('%Y-%m-%d %H:%M:%S') if self.data_ocorrencia else "Data não informada"
        return f"{tipo_ocorrencia} - {data_ocorrencia}"


    def to_dict(self):
        return {
            "id": self.id,
            "cte": self.cte_fk.id if self.cte_fk else None,
            "coleta": self.coleta_fk.id if self.coleta_fk else None,
            "dtc": self.dtc_fk.id if self.dtc_fk else None,
            "tipo_ocorrencia": self.tipo_ocorrencia_fk.to_dict(),
            "data_ocorrencia": self.data_ocorrencia.strftime('%Y-%m-%d %H:%M:%S') if self.data_ocorrencia else '',
            'responsavel': self.responsavel if self.responsavel else None,
            'observacao': self.observacao if self.observacao else None
        }

