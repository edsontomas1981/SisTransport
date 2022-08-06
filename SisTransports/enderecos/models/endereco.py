from django.db import models

class Enderecos (models.Model):
    cep=models.CharField(max_length=8,null=False)
    logradouro=models.CharField(max_length=50,null=False)
    numero=models.CharField(max_length=8)
    complemento=models.CharField(max_length=50,null=True)
    bairro=models.CharField(max_length=30)
    cidade=models.CharField(max_length=50)
    uf=models.CharField(max_length=2)
    
    def to_dict(self):
        return {
            'id': self.id,
            'cep': self.cep,
            'logradouro': self.logradouro,
            'numero': self.numero,
            'complemento': self.complemento,
            'bairro': self.bairro,
            'cidade': self.cidade,
            'uf': self.uf
        }