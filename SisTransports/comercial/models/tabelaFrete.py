from django.db import models
from parceiros.models.parceiros import Parceiros
from operacional.models.rota import Rota

class TabelaFrete(models.Model):
    
    parceiro=models.ManyToManyField(Parceiros,blank=True)
    rota=models.ManyToManyField(Rota,blank=True)
    descricao=models.CharField(max_length=15)
    icmsIncluso=models.BooleanField(default=True)
    bloqueada=models.BooleanField(default=False)
    frete=models.DecimalField(max_digits = 9, decimal_places = 2)
    #definir os tipos de calculos atraves de digitos Ex:1-calculo por kg | 2-percentual etc ...
    tipoCalculo=models.IntegerField()
    #campo adValor normalmente e definido pelo produto de n/1000
    adValor=models.DecimalField(max_digits = 5, decimal_places = 2)
    #Gris é um porcentagem do valor da nf.
    gris=models.DecimalField (max_digits =5, decimal_places = 2)
    # Valor fixo acrescentado a uma cte ou cotação
    despacho=models.DecimalField (max_digits = 5, decimal_places = 2)
    # Valor fixo acrescentado a uma cte ou cotação
    outros=models.DecimalField (max_digits = 5, decimal_places = 2)
    # valor fixo que sera considerado a partir do cpo tipoPedagio Ex: 1- a cada 100 kg,2-por dctos etc...
    pedagio=models.DecimalField (max_digits = 5, decimal_places = 2)
    # Define o tipo de cobranco pedagio
    tipoPedagio=models.IntegerField()
    cubagem=models.BooleanField(default=True)
    fatorCubagem=models.IntegerField()
    
    # Criar a Tabela por faixas ainda a serem definidas
    
    
    
    

    
    
    
    
