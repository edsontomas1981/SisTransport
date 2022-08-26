from django.db import models
from parceiros.models.parceiros import Parceiros
from enderecos.models.endereco import Enderecos

class Coleta (models.Model):
    remetente_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE,related_name='remetColeta')
    destinatario_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE, related_name='destColeta')
    redespacho_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE, related_name='redespColeta')
    consignatario_fk=models.ForeignKey(Parceiros, on_delete=models.CASCADE, related_name='consigColeta')
    endereco_fk=models.ForeignKey(Enderecos, on_delete=models.CASCADE, related_name='endColeta')
    volume=models.IntegerField()
    peso=models.DecimalField (max_digits = 7, decimal_places = 2)
    valor=models.DecimalField(max_digits=9, decimal_places=2)
    cubM3=models.DecimalField (max_digits =7, decimal_places = 2)
    veiculo=models.CharField(max_length=50)
    especie=models.CharField(max_length=50)
    observacao=models.CharField(max_length=150)
    nome=models.CharField(max_length=15)
    contato=models.CharField(max_length=20)
    
    
    
    

    

