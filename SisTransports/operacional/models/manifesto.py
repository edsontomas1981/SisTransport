from django.db import models
from django.conf import settings
from datetime import datetime
from django.utils import timezone

from operacional.models.emissor import Emissor
from operacional.models.rota import Rota
from operacional.models.motoristas import Motorista
from operacional.models.veiculos import Veiculo
from operacional.models.ocorrencias_manifesto import Ocorrencia_manifesto
from operacional.models.tipo_documento import Tipo_Documento
from operacional.models.dtc import Dtc

class Manifesto (models.Model):
    emissor_fk = models.ForeignKey(Emissor, on_delete=models.CASCADE)
    data_previsão_inicio = models.DateTimeField(null=True)
    data_previsão_chegada = models.DateTimeField(null=True)
    rota_fk =  models.ForeignKey(Rota, on_delete=models.CASCADE)
    frete_carreteiro = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    frete_adiantamento = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    lacres = models.CharField(max_length=100, null=True)
    averbacao = models.CharField(max_length=20, null=True)
    liberacao = models.CharField(max_length=20, null=True)
    motoristas = models.ManyToManyField(Motorista)
    veiculos = models.ManyToManyField(Veiculo)
    observacao = models.TextField(null=True)
    dtc = models.ManyToManyField(Dtc,through='DtcManifesto')
    
    usuario_cadastro = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='criador_manifesto'
    )
    usuario_ultima_atualizacao = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='atualizador_manifesto'
    )
    data_cadastro = models.DateTimeField(null=True)
    data_ultima_atualizacao = models.DateTimeField(default=timezone.now)  

    def to_dict(self):
        return {
            'usuario_cadastro': self.usuario_cadastro.id if self.usuario_cadastro else None,
            'usuario_ultima_atualizacao': self.usuario_ultima_atualizacao.id if self.usuario_ultima_atualizacao else None,
            'data_cadastro': self.data_cadastro.isoformat() if self.data_cadastro else None,
            'data_ultima_atualizacao': self.data_ultima_atualizacao.isoformat(),
        }

class DtcManifesto(models.Model):
    manifesto = models.ForeignKey(Manifesto, on_delete=models.CASCADE)
    dtc_fk = models.ForeignKey(Dtc, on_delete=models.CASCADE)
    # Adicione os campos extras que você deseja
    tipo_manifesto = models.ForeignKey(Ocorrencia_manifesto, on_delete=models.CASCADE)
