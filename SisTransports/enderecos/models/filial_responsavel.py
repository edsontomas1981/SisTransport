from django.db import models
from parceiros.models.parceiros import Parceiros

class FilialResponsavel(models.Model):
    filial_responsavel = models.CharField(max_length=100, null=False)
    parceiro = models.ForeignKey(Parceiros, on_delete=models.CASCADE, related_name='filiais_responsaveis', null=True)
    telefone = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    responsavel = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.filial_responsavel

    def to_dict(self):
        return {
            'id': self.id,
            'filial_responsavel': self.filial_responsavel,
            'telefone': self.telefone,
            'email': self.email,
            'responsavel': self.responsavel,
            'parceiro': self.parceiro.to_dict() if self.parceiro else None
        }
