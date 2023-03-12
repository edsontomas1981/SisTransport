from django.db import models

class Rota (models.Model):
    nome=models.CharField(max_length=20)
    origemCidade=models.CharField(max_length=20)
    origemUf=models.CharField(max_length=2)
    destinoCidade=models.CharField(max_length=20)
    destinoUf=models.CharField(max_length=2)
    
    def to_dict(self):
        return{'id':self.id,
               'nome':self.nome,
               'origemCidade': self.origemCidade,
               'origemUf':self.origemUf,
               'destinoCidade': self.destinoCidade,
               'destinoUf':self.destinoUf
               }
        
    
    