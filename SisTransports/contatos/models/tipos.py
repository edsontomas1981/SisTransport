from django.db import models

class Tipo_contatos (models.Model):
    descricao_contato=models.CharField(max_length=15)# define qual o tipo de contato pode ser email, telefone, etc
        
    def __str__(self):
        return self.descricao_contato

    def toDict(self):
        return{'id':self.id,
                'descricao_contato':self.descricao_contato
        }