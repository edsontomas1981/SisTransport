from django.db import models
from enderecos.models.endereco import Enderecos

class Parceiros (models.Model):
    cnpj_cpf=models.CharField(max_length=18)
    raz_soc=models.CharField(max_length=50)
    nome_fantasia=models.CharField(max_length=50)
    insc_est=models.CharField(max_length=30)
    observacao=models.TextField()
    ativo=models.BooleanField(default=True)
    endereco_fk=models.ForeignKey(Enderecos, on_delete=models.CASCADE)
    
    def to_dict(self):
        return {
            'id': self.id,
            'cnpj_cpf': self.cnpj_cpf,
            'raz_soc': self.raz_soc,
            'nome_fantasia': self.nome_fantasia,
            'insc_est': self.insc_est,
            'observacao': self.observacao,
            'ativo': self.ativo,
            'endereco_fk': self.endereco_fk.to_dict()
        }
    
    def __str__(self):
        return self.raz_soc
    