from django.db import models
from .tipos import Tipo_contatos
from parceiros.models import Parceiros

class Contatos (models.Model):
    tipo=models.ForeignKey(Tipo_contatos,on_delete=models.CASCADE,null=True,default=1)# define qual o tipo de contato pode ser email, telefone, etc
    fone_email_etc=models.CharField(max_length=50)# define a descrição do contato seja email, telefone, etc
    nome=models.CharField(max_length=50)# define o nome do contato 
    cargo=models.CharField(max_length=50)# define o cargo do contato 
    envio=models.BooleanField(default=False)# define se o contato receberá será envios de email ou não
    parceiro_fk=models.ForeignKey(Parceiros,on_delete=models.CASCADE,null=True,default=1 )# define qual o parceiro que o contato pertence
    
    def to_dict(self):
        return{
            'id':self.id,
            'tipo':self.tipo.descricao_contato,
            'fone_email_etc':self.fone_email_etc,
            'nome':self.nome,
            'cargo':self.cargo,
            'envio':self.envio
        }
