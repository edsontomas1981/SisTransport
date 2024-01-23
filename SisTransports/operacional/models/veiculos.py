from django.db import models
from .proprietario import Proprietario
from django.conf import settings
from django.utils import timezone
from django.utils import formats

class Veiculo(models.Model):
    """
    Modelo para representar informações de Veículos no sistema.

    Campos:
    - proprietario_fk: Chave estrangeira para o proprietário associado ao veículo.
    - placa: Placa do veículo (única).
    - marca: Marca do veículo.
    - modelo: Modelo do veículo.
    - ano_fabricacao: Ano de fabricação do veículo.
    - cor: Cor do veículo.
    - renavam: Número RENAVAM (Registro Nacional de Veículos Automotores) do veículo (único).
    - chassi: Número de chassi do veículo (único).
    - criado_por: Usuário que criou o registro.
    - atualizado_por: Usuário que atualizou o registro pela última vez.
    - created_at: Data e hora de criação do registro.
    - updated_at: Data e hora da última atualização do registro.
    """
    proprietario_fk = models.ForeignKey(Proprietario, on_delete=models.CASCADE, related_name='proprietario_veiculo', null=True)
    placa = models.CharField(max_length=10, unique=True)
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)
    ano_fabricacao = models.PositiveIntegerField()
    cor = models.CharField(max_length=20)
    renavam = models.CharField(max_length=20, unique=True)
    chassi = models.CharField(max_length=20, unique=True)
    criado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='veiculo_criado_por', null=True)
    atualizado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='veiculo_atualizado_por', null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.marca} {self.modelo} - {self.placa}"

    def to_dict(self):
        return {
            'proprietario_fk': self.proprietario_fk.to_dict() if self.proprietario_fk else None,
            'criado_por': self.criado_por.username if self.criado_por else None,
            'atualizado_por': self.atualizado_por.username if self.atualizado_por else None,
            'placa': self.placa,
            'marca': self.marca,
            'modelo': self.modelo,
            'ano_fabricacao': self.ano_fabricacao,
            'cor': self.cor,
            'renavam': self.renavam,
            'chassi': self.chassi,
            'created_at': formats.date_format(self.created_at, "DATETIME_FORMAT"),
            'updated_at': formats.date_format(self.updated_at, "DATETIME_FORMAT"),
        }
