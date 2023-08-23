from django.db import models
from django.conf import settings
from datetime import datetime
from comercial.models.tabelaFrete import TabelaFrete
from operacional.models.dtc import Dtc
 
class Cte (models.Model):
    origem_cte = models.CharField(max_length=5, null=True)
    destino_cte = models.CharField(max_length=5, null=True)
    emissora_cte = models.CharField(max_length=5, null=True)
    tipo_cte = models.CharField(max_length=5, null=True)
    cfop_cte = models.CharField(max_length=5, null=True)
    redesp_cte = models.CharField(max_length=5, null=True)
    tipo_calculo_cte = models.CharField(max_length=5, null=True)
    dtc_fk = models.ForeignKey(Dtc, on_delete=models.CASCADE, related_name='frete_dtc', null=True)

    # Valores de Frete
    tabela_frete = models.ForeignKey(TabelaFrete, on_delete=models.CASCADE, null=True, related_name='coletaDtc')
    observacao = models.CharField(max_length=70, null=True)
    icms_incluso= models.BooleanField()
    frete_calculado = models.FloatField(default=0.00)
    advalor = models.FloatField(default=0.00)
    gris = models.FloatField(default=0.00)
    despacho = models.FloatField(default=0.00)
    outros = models.FloatField(default=0.00)
    pedagio = models.FloatField(default=0.00)
    vlr_coleta = models.FloatField(default=0.00)
    base_de_calculo = models.FloatField(default=0.00)
    aliquota = models.FloatField(default=0.00)
    icms_valor = models.FloatField(default=0.00)
    total_frete = models.FloatField(default=0.00)

    # Informações de usuário e data/hora
    usuario_cadastro = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='cadastrado_dtc')
    usuario_ultima_atualizacao = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='alterou_dtc')
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
