from django.db import models
from django.db import models
from django.conf import settings
from datetime import datetime
from django.utils import timezone
from Classes.utils import dprint

class Contrato(models.Model):
    frete_contratado = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    data_emissao_contrato = models.DateField(blank=True, null=True)
    numero_ciot = models.CharField(max_length=255, blank=True)
    valor_pedagio = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    valor_coleta = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    outros_creditos = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    ir_retido = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    inss = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    iss = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    sest_senat = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    adiantamento = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    outros_descontos = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    frete_bruto = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    total_descontos = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    frete_a_pagar = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    contrato_obs = models.TextField(blank=True)

    # Informações de usuário e data/hora
    usuario_cadastro = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='cadastrado_contrato')
    usuario_ultima_atualizacao = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='alterou_contrato')
    data_cadastro = models.DateTimeField(null=True)
    data_ultima_atualizacao = models.DateTimeField(null=True)

    def to_dict(self):
        return {
            'id': self.id,
            'frete_contratado': self.frete_contratado,
            'data_emissao_contrato': self.data_emissao_contrato,
            'numero_ciot': self.numero_ciot,
            'valor_pedagio': self.valor_pedagio,
            'valor_coleta': self.valor_coleta,
            'outros_creditos': self.outros_creditos,
            'ir_retido': self.ir_retido,
            'inss': self.inss,
            'iss': self.iss,
            'sest_senat': self.sest_senat,
            'adiantamento': self.adiantamento,
            'outros_descontos': self.outros_descontos,
            'frete_bruto': self.frete_bruto,
            'total_descontos': self.total_descontos,
            'frete_a_pagar': self.frete_a_pagar,
            'contrato_obs': self.contrato_obs,
            'usuario_cadastro': self.usuario_cadastro.to_dict(),
            'data_cadastro': self.data_cadastro if self.data_cadastro else None,
        }

