from django.db import models
from operacional.models.dtc import Dtc  as DctoCarga

class Cotacao(models.Model):
    
    dtc_fk=models.ForeignKey(DctoCarga, on_delete=models.CASCADE,blank=False)
    #Dados da Nota Fiscal
    peso=models.IntegerField()
    qtde=models.IntegerField()
    vlrNf=models.DecimalField (max_digits = 9, decimal_places = 2,default=0.00)
    m3=models.DecimalField (max_digits = 7, decimal_places = 2,default=0.00)
    #Valores de Frete
    totalFrete=models.DecimalField(max_digits = 5, decimal_places = 2,default=0.00)
    freteValor=models.DecimalField(max_digits = 5, decimal_places = 2,default=0.00)    
    adValor=models.DecimalField(max_digits = 5, decimal_places = 2,default=0.00)
    gris=models.DecimalField (max_digits =5, decimal_places = 2,default=0.00)
    despacho=models.DecimalField (max_digits = 5, decimal_places = 2,default=0.00)
    outros=models.DecimalField (max_digits = 5, decimal_places = 2,default=0.00)
    pedagio=models.DecimalField (max_digits = 5, decimal_places = 2,default=0.00)
    
    def toDict(self):
        cotacao= {'id':self.id,
                'peso':self.peso,
                'qtde':self.qtde,
                'vlrNf':self.vlrNf,
                'm3':self.m3,
                'freteValor':self.freteValor,
                'totalFrete':self.totalFrete,                
                'adValor':self.adValor,                
                'gris':self.gris,
                'despacho':self.despacho,
                'outros':self.outros,                                
                'pedagio':self.pedagio
                }
        return cotacao