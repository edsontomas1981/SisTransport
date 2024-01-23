from django.db import models
from parceiros.models.parceiros import Parceiros
from django.conf import settings
from django.utils import timezone
from django.utils import formats

class Motorista(models.Model):
    """
    Modelo para representar informações de Motoristas no sistema.

    Campos:
    - parceiro_fk: Chave estrangeira para o parceiro associado ao motorista.
    - filiacao_pai: Nome do pai do motorista (pode ser nulo).
    - filiacao_mae: Nome da mãe do motorista (pode ser nulo).
    - cnh_numero: Número da CNH (Carteira Nacional de Habilitação) do motorista (único).
    - cnh_categoria: Categoria da CNH do motorista.
    - cnh_validade: Validade da CNH do motorista (pode ser nula).
    - numero_registro_cnh: Número de registro da CNH do motorista (único).
    - criado_por: Usuário que criou o registro.
    - atualizado_por: Usuário que atualizou o registro pela última vez.
    - created_at: Data e hora de criação do registro.
    - updated_at: Data e hora da última atualização do registro.
    """
    parceiro_fk = models.ForeignKey(Parceiros, on_delete=models.CASCADE, related_name='parceiro_motorista', null=True)
    data_nascimento = models.DateField(null=True, blank=True)
    filiacao_pai = models.CharField(max_length=255, blank=True, null=True)
    filiacao_mae = models.CharField(max_length=255, blank=True, null=True)
    cnh_numero = models.CharField(max_length=20, unique=True, blank=True, null=True)
    cnh_categoria = models.CharField(max_length=5, blank=True, null=True)
    cnh_validade = models.DateField(null=True, blank=True)
    numero_registro_cnh = models.CharField(max_length=20, unique=True, blank=True, null=True)
    criado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='motorista_criado_por', null=True)
    atualizado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='motorista_atualizado_por', null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.nome

    def to_dict(self):
        return {
            'parceiro_fk': self.parceiro_fk.to_dict() if self.parceiro_fk else None,
            'criado_por': self.criado_por.username if self.criado_por else None,
            'atualizado_por': self.atualizado_por.username if self.atualizado_por else None,
            'nome': self.nome,
            'data_nascimento': formats.date_format(self.data_nascimento, "DATE_FORMAT") if self.data_nascimento else None,
            'filiacao_pai': self.filiacao_pai,
            'filiacao_mae': self.filiacao_mae,
            'cnh_numero': self.cnh_numero,
            'cnh_categoria': self.cnh_categoria,
            'cnh_validade': formats.date_format(self.cnh_validade, "DATE_FORMAT") if self.cnh_validade else None,
            'numero_registro_cnh': self.numero_registro_cnh,
            'created_at': formats.date_format(self.created_at, "DATETIME_FORMAT"),
            'updated_at': formats.date_format(self.updated_at, "DATETIME_FORMAT"),
        }
