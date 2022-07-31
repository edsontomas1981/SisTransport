from django.db import models
from SisTransports.enderecos.models import endereco
from enderecos.models.endereco import Enderecos

class Parceiros (models.Model):
    cnpj_cpf=models.CharField(max_length=18)
    raz_soc=models.CharField(max_length=50)
    nome_fantasia=models.CharField(max_length=50)
    insc_est=models.CharField(max_length=30)
    observacao=models.TextField()
    ativo=models.BooleanField(default=True)
    endereco_fk=models.ForeignKey(Enderecos, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nome
    