from django.db import models
from parceiros.models.parceiros import Parceiros
from operacional.models.rota import Rota
from Classes.parceiros import Parceiros as ClsParceiros
from comercial.models.tabelaFrete import TabelaFrete

class TabelaFaixa(models.Model):
    
    tblVinculada=models.ForeignKey(TabelaFrete, on_delete=models.CASCADE,blank=False)
    faixaInicial=models.IntegerField()
    faixaFinal=models.IntegerField()
    vlrFaixa=models.DecimalField (max_digits = 7, decimal_places = 2,default=0.00)
    
    def toDict(self):
        tblFrete= {'id':self.id,
                'tblVinculada':self.tblVinculada,
                'faixaInicial':self.faixaInicial,
                'faixaFinal':self.faixaFinal,
                'vlrFaixa':self.vlrFaixa
                }
        return tblFrete
    