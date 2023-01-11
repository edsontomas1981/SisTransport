from django.db import models
from comercial.models.cotacao import Cotacao
from operacional.models.dtc import Dtc


class NotaFiscal(models.Model):
    dtc_fk = models.ForeignKey(Dtc, on_delete=models.CASCADE, blank=True)
    qtde = models.IntegerField()
    peso = models.DecimalField(max_digits=7, decimal_places=2, default=0.00)
    m3 = models.DecimalField(max_digits=7, decimal_places=2, default=0.00)
    pesoCub = models.DecimalField(max_digits=7, decimal_places=2, default=0.00)
    valor = models.DecimalField(max_digits=7, decimal_places=2, default=0.00)
    chaveDeAcesso = models.CharField(max_length=44)

    def toDict(self):
        nfCotacao = {'id': self.id,
                    'qtde': self.qtde,
                    'peso': self.peso,
                    'm3': self.m3,
                    'pesoCub': self.pesoCub,
                    'valor': self.valor,
                    'chaveDeAcesso': self.chaveDeAcesso
                    }
        return nfCotacao
