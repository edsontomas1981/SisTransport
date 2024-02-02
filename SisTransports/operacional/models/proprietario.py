from django.db import models
from parceiros.models.parceiros import Parceiros
from django.conf import settings
from django.utils import timezone
from datetime import datetime

class Proprietario(models.Model):
    """
    Modelo para representar informações de Proprietários no sistema.

    Campos:
    - parceiro_fk: Chave estrangeira para o parceiro associado ao proprietário.
    - usuario: Relacionamento um para um com o modelo de usuário do Django.
    - antt: Registro antt (Código Identificador da Operação de Transportes).
    - validade_antt: Validade do Registro na ANTT.
    - tipo_proprietario: Tipo de proprietário (ex: "Outros", "Portal ANTT").
    - criado_por: Usuário que criou o registro.
    - atualizado_por: Usuário que atualizou o registro pela última vez.
    - created_at: Data e hora de criação do registro.
    - updated_at: Data e hora da última atualização do registro.
    """
    parceiro_fk = models.ForeignKey(Parceiros, on_delete=models.CASCADE, related_name='parceiro_proprietario', null=True)
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='proprietario', null=True)
    antt = models.CharField(max_length=20, blank=True, null=True)
    validade_antt = models.DateField(null=True, blank=True)
    tipo_proprietario = models.CharField(max_length=50, blank=True, null=True)
    criado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='proprietario_criado_por', null=True)
    atualizado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='proprietario_atualizado_por', null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.parceiro_fk.raz_soc

    def to_dict(self):
        return {
            'parceiro_fk': self.parceiro_fk.to_dict() if self.parceiro_fk else None,
            'criado_por': self.criado_por.username if self.criado_por else None,
            'atualizado_por': self.atualizado_por.username if self.atualizado_por else None,
            'antt': self.antt,
            'validade_antt': self.formatar_data(self.validade_antt),
            'tipo_proprietario': self.tipo_proprietario,
            'created_at': self.formatar_data(self.created_at),
            'updated_at': self.formatar_data(self.updated_at),
        }

    def formatar_data(self, data):
        if data and isinstance(data, str):
            # Se for uma string, converte para datetime
            data = datetime.strptime(data, "%Y-%m-%d")
        return data.strftime("%Y-%m-%d %H:%M:%S") if data else None
