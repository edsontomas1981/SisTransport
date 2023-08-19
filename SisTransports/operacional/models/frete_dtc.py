from django.db import models
from operacional.models.dtc import Dtc
from django.conf import settings
from datetime import datetime
import faturamento.components.calculaFrete

class Frete_Dtc (models.Model):
    # Relação ForeignKey com o modelo Dtc
    dtc_fk = models.ForeignKey(Dtc, on_delete=models.CASCADE, related_name='frete_dtc', null=True)
    # Valores de Frete
    totalFrete = models.FloatField(default=0.00)
    fretePeso = models.FloatField(default=0.00)
    adValor = models.FloatField(default=0.00)
    gris = models.FloatField(default=0.00)
    despacho = models.FloatField(default=0.00)
    outros = models.FloatField(default=0.00)
    pedagio = models.FloatField(default=0.00)
    vlrColeta = models.FloatField(default=0.00)
    baseDeCalculo = models.FloatField(default=0.00)
    aliquota = models.FloatField(default=0.00)
    icmsRS = models.FloatField(default=0.00)
    icmsIncluso = models.BooleanField(default=True)
    observacao = models.CharField(max_length=70, null=True)

    # Informações de usuário e data/hora
    usuario_cadastro = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='notas_fiscais_cadastradas_frete_dtc')
    usuario_ultima_atualizacao = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='notas_fiscais_atualizadas_frete_dtc')
    data_cadastro = models.DateTimeField(auto_now_add=True)
    data_ultima_atualizacao = models.DateTimeField(auto_now=True)


    def to_dict(self):
        return {
            'dtc_fk': self.dtc_fk_id,
            'totalFrete': self.totalFrete,
            'fretePeso': self.fretePeso,
            'adValor': self.adValor,
            'gris': self.gris,
            'despacho': self.despacho,
            'outros': self.outros,
            'pedagio': self.pedagio,
            'vlrColeta': self.vlrColeta,
            'baseDeCalculo': self.baseDeCalculo,
            'aliquota': self.aliquota,
            'icmsRS': self.icmsRS,
            'icmsIncluso': self.icmsIncluso,
            'nome': self.nome,
            'observacao': self.observacao,
            'dataHora': self.dataHora.strftime('%Y-%m-%d %H:%M:%S') if self.dataHora else None,
            'usuario_cadastro': self.usuario_cadastro_id,
            'usuario_ultima_atualizacao': self.usuario_ultima_atualizacao_id,
            'data_cadastro': self.data_cadastro.strftime('%Y-%m-%d %H:%M:%S'),
            'data_ultima_atualizacao': self.data_ultima_atualizacao.strftime('%Y-%m-%d %H:%M:%S'),
        }
