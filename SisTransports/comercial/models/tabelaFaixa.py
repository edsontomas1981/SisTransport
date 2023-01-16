from django.db import models
from comercial.models.tabelaFrete import TabelaFrete

class TabelaFaixa(models.Model):
    
    tblVinculada=models.ForeignKey(TabelaFrete, on_delete=models.CASCADE,blank=True)
    faixaInicial=models.IntegerField()
    faixaFinal=models.IntegerField()
    vlrFaixa=models.DecimalField (max_digits = 7, decimal_places = 2,default=0.00)
    
    def toDict(self):
        faixa= {'id':self.id,
                'faixaInicial':self.faixaInicial,
                'faixaFinal':self.faixaFinal,
                'vlrFaixa':self.vlrFaixa
                }
        return faixa
    