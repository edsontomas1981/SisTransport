from django.db import models
from operacional.models.dtc import Dtc as DctoCarga
from operacional.models.rota import Rota
from comercial.models.tabelaFrete import TabelaFrete
from Classes.utils import dprint

class Cotacao(models.Model):
    dtc_fk = models.ForeignKey(DctoCarga, on_delete=models.CASCADE, blank=False)
    tabela_fk = models.ForeignKey(TabelaFrete, on_delete=models.CASCADE,
                                  related_name='tabelaCotacao')
    rota_fk = models.ForeignKey(Rota, on_delete=models.CASCADE,
                                blank=False, related_name='rotaCotacao', null=True)
    formaDeCalculo = models.IntegerField(null=True)
    # Dados da Nota Fiscal
    numNf = models.CharField(max_length=15, null=True)
    peso = models.IntegerField()
    pesoFaturado = models.FloatField(default=0.00)
    qtde = models.IntegerField()
    vlrNf = models.FloatField(default=0.00)
    m3 = models.FloatField(default=0.00)
    tipoMercadoria = models.CharField(max_length=15, null=True)
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
    nome = models.CharField(max_length=30, null=True)
    observacao = models.CharField(max_length=70, null=True)
    contato = models.CharField(max_length=50, null=True)
    dataHora = models.DateTimeField(null=True)

    def toDict(self):
        tabela=""
        if self.tabela_fk.toDict():
            tabela=self.tabela_fk.toDict()

        cotacao = {'id': self.id,
                   'numNf': self.numNf,
                   'peso': self.peso,
                   'qtde': self.qtde,
                   'pesoFaturado': self.pesoFaturado,
                   'vlrNf': self.vlrNf,
                   'vlrColeta': self.vlrColeta,
                   'm3': self.m3,
                   'tipoMercadoria': self.tipoMercadoria,
                   'formaDeCalculo': self.formaDeCalculo,
                   'totalFrete': self.totalFrete,
                   'freteValor': self.fretePeso,
                   'adValor': self.adValor,
                   'gris': self.gris,
                   'despacho': self.despacho,
                   'outros': self.outros,
                   'pedagio': self.pedagio,
                   'baseDeCalculo': self.baseDeCalculo,
                   'aliquota': self.aliquota,
                   'icmsRS': self.icmsRS,
                   'icmsIncluso': self.icmsIncluso,
                   'nome': self.nome,
                   'observacao': self.observacao,
                   'contato': self.contato,
                   'dtc': self.dtc_fk.to_dict(),
                   'rota': self.rota_fk.to_dict(),
                   'tabela': tabela
                   }
        return cotacao
