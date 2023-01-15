from django.db import models
from operacional.models.dtc import Dtc  as DctoCarga
from operacional.models.rota import Rota
from comercial.models.tabelaFrete import TabelaFrete


class Cotacao(models.Model):
    
    dtc_fk=models.ForeignKey(DctoCarga, on_delete=models.CASCADE,blank=False)
    tabela_fk=models.ForeignKey(TabelaFrete, on_delete=models.CASCADE,blank=False,
                        related_name='tabelaCotacao',null=True)
    rota_fk=models.ForeignKey(TabelaFrete, on_delete=models.CASCADE,
                        blank=False,related_name='rotaCotacao',null=True)
    formaDeCalculo=models.IntegerField(null=True)

    #Dados da Nota Fiscal
    numNf=models.CharField(max_length=15,null=True)
    peso=models.IntegerField()
    pesoFaturado=models.DecimalField (max_digits = 9, decimal_places = 2,default=0.00)
    qtde=models.IntegerField()
    vlrNf=models.DecimalField (max_digits = 9, decimal_places = 2,default=0.00)
    m3=models.DecimalField (max_digits = 7, decimal_places = 2,default=0.00)
    tipoMercadoria=models.CharField(max_length=15,null=True)

    #Valores de Frete
    totalFrete=models.DecimalField(max_digits = 5, decimal_places = 2,default=0.00)
    fretePeso=models.DecimalField(max_digits = 5, decimal_places = 2,default=0.00)    
    adValor=models.DecimalField(max_digits = 5, decimal_places = 2,default=0.00)
    gris=models.DecimalField (max_digits =5, decimal_places = 2,default=0.00)
    despacho=models.DecimalField (max_digits = 5, decimal_places = 2,default=0.00)
    outros=models.DecimalField (max_digits = 5, decimal_places = 2,default=0.00)
    pedagio=models.DecimalField (max_digits = 5, decimal_places = 2,default=0.00)

    baseDeCalculo=models.DecimalField (max_digits = 5, decimal_places = 2,default=0.00)
    aliquota=models.DecimalField (max_digits = 5, decimal_places = 2,default=0.00)
    icmsRS=models.DecimalField (max_digits = 5, decimal_places = 2,default=0.00)
    icmsIncluso=models.BooleanField(default=True)


    nome=models.CharField(max_length=30,null=True)
    contato=models.CharField(max_length=50,null=True)
    nome=models.CharField(max_length=280,null=True)

    
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