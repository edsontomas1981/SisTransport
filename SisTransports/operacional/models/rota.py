from django.db import models
from enderecos.models.endereco import Enderecos

class Rota (models.Model):
    nome=models.CharField(max_length=20,unique=True)
    origemCidade=models.CharField(max_length=20)
    origemUf=models.CharField(max_length=2)
    endereco_origem_fk=models.ForeignKey(Enderecos, on_delete=models.CASCADE,null=True,related_name="endereco_origem_fk")
    destinoCidade=models.CharField(max_length=20)
    destinoUf=models.CharField(max_length=2)
    endereco_destino_fk=models.ForeignKey(Enderecos, on_delete=models.CASCADE,null=True,related_name="endereco_destino_fk")
    
    def to_dict(self):
        return{'id':self.id,
               'nome':self.nome,
               'origemCidade': self.origemCidade,
               'origemUf':self.origemUf,
               'destinoCidade': self.destinoCidade,
               'destinoUf':self.destinoUf
               }
        
    
    