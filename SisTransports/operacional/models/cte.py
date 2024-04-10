from django.db import models
from django.conf import settings
from datetime import datetime
from comercial.models.tabelaFrete import TabelaFrete
from operacional.models.dtc import Dtc
from operacional.classes.nota_fiscal import Nota_fiscal_CRUD

class Cte (models.Model):
    origem_cte = models.CharField(max_length=5, null=True)
    destino_cte = models.CharField(max_length=5, null=True)
    emissora_cte = models.CharField(max_length=5, null=True)
    tipo_cte = models.CharField(max_length=5, null=True)
    cfop_cte = models.CharField(max_length=5, null=True)
    redesp_cte = models.CharField(max_length=5, null=True)
    tipo_calculo_cte = models.CharField(max_length=5, null=True)
    dtc_fk = models.ForeignKey(Dtc, on_delete=models.CASCADE, related_name='frete_dtc', null=True)
    chave_cte = models.CharField(max_length=44, null=True)
       
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
    data_cadastro = models.DateTimeField(null=True)
    data_ultima_atualizacao = models.DateTimeField(null=True)


    def to_dict(self):

        return {
            'id':self.id,
            'dtc_fk': self.dtc_fk.to_dict() if self.dtc_fk else None,
            'totalFrete': self.total_frete,
            'freteCalculado': self.frete_calculado,
            'advalor': self.advalor,
            'gris': self.gris,
            'despacho': self.despacho, 
            'outros': self.outros,
            'pedagio': self.pedagio,
            'vlrColeta': self.vlr_coleta,
            'baseDeCalculo': self.base_de_calculo,
            'aliquota': self.aliquota,
            'icmsRS': self.icms_valor,
            'icmsIncluso': self.icms_incluso,
            'observacao': self.observacao,
            'data_cadastro': self.data_cadastro.strftime('%Y-%m-%d %H:%M:%S') if self.data_cadastro else None,
            'data_ultima_atualizacao': self.data_ultima_atualizacao.strftime('%Y-%m-%d %H:%M:%S') if self.data_ultima_atualizacao else None,
            'usuario_cadastro': self.usuario_cadastro_id,
            'usuario_ultima_atualizacao': self.usuario_ultima_atualizacao_id,
            'tabela_frete': self.tabela_frete.toDict() if self.tabela_frete and hasattr(self.tabela_frete, 'toDict') else {'tabela_frete': 'Frete Informado'},
            'origem_cte': self.origem_cte,
            'destino_cte': self.destino_cte,
            'emissora_cte': self.emissora_cte,
            'tipo_cte': self.tipo_cte,
            'cfop_cte': self.cfop_cte,
            'redesp_cte': self.redesp_cte,
            'tipo_calculo_cte': self.tipo_calculo_cte,
        }


