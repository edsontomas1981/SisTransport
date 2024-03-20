from django.db import models
from django.conf import settings
from datetime import datetime
from django.utils import timezone
from enderecos.models.endereco import Enderecos

class Emissor (models.Model):
    # Informações específicas do emissor do CTe
    nome = models.CharField(max_length=255)
    cnpj = models.CharField(max_length=14)
    endereco_fk=models.ForeignKey(Enderecos, on_delete=models.CASCADE)
    telefone = models.CharField(max_length=20)
    email = models.EmailField()
    inscricao_estadual = models.CharField(max_length=20)
    regime_tributario = models.CharField(max_length=50)   
    aliquota = models.IntegerField(default=7)   
    sigla_filial =  models.CharField(max_length=20,null=True)
    # Informações de usuário e data/hora
    usuario_cadastro = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='criador_emissor')
    usuario_ultima_atualizacao = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='atualizador_emissor')
    data_cadastro = models.DateTimeField(null=True)
    data_ultima_atualizacao = models.DateTimeField(default=timezone.now)  

    def to_dict(self):
        return {
            'id':self.id,
            'razao': self.nome,
            'cnpj': self.cnpj,
            'endereco': self.endereco_fk.to_dict() if self.endereco_fk.to_dict() else None,
            'telefone': self.telefone,
            'email': self.email,
            'inscricao_estadual': self.inscricao_estadual,
            'regime_tributario': self.regime_tributario,
            'usuario_cadastro': self.usuario_cadastro.id if self.usuario_cadastro else None,
            'usuario_ultima_atualizacao': self.usuario_ultima_atualizacao.id if self.usuario_ultima_atualizacao else None,
            'data_cadastro': self.data_cadastro.isoformat() if self.data_cadastro else None,
            'data_ultima_atualizacao': self.data_ultima_atualizacao.isoformat(),
            'siglaFilial':self.sigla_filial,
            'aliquota':self.aliquota,
        }
    
    def __str__(self):
        return self.nome
    
    