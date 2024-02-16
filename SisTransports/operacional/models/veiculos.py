from django.db import models
from .proprietario import Proprietario
from django.conf import settings
from django.utils import timezone
from django.utils import formats
from operacional.models.marca_veiculos import Marca
from operacional.models.tipo_carroceria import Tipo_Carroceria
from operacional.models.tipo_combustivel import Tipo_Combustivel
from operacional.models.tipo_veiculo import Tipo_Veiculo

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
    marca_fk = models.ForeignKey(Marca, on_delete=models.CASCADE, related_name='veiculo', null=True)
    tipo_carroceria_fk = models.ForeignKey(Tipo_Carroceria, on_delete=models.CASCADE, related_name='carroceria', null=True)
    tipo_combustivel_fk = models.ForeignKey(Tipo_Combustivel, on_delete=models.CASCADE, related_name='combustivel', null=True)
    tipo_veiculo_fk = models.ForeignKey(Tipo_Veiculo, on_delete=models.CASCADE, related_name='veiculo', null=True)

    placa = models.CharField(max_length=10, unique=True)
    marca = models.CharField(max_length=50)
    renavam = models.CharField(max_length=20)
    chassi = models.CharField(max_length=20)
    modelo = models.CharField(max_length=50)
    cidade = models.CharField(max_length=50,null=True)
    uf = models.CharField(max_length=4,null=True)
    ano = models.CharField(max_length=5,default='00/00')
    cor = models.CharField(max_length=20)
    numero_rastreador = models.CharField(max_length=20,null=True)
    numero_frota = models.CharField(max_length=20,null=True)
    capacidade_kg = models.FloatField(null=True)
    capacidade_cubica = models.FloatField(default=1)
    tara = models.FloatField(null=True)
    criado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='veiculo_criado_por', null=True)
    atualizado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='veiculo_atualizado_por', null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.marca} {self.modelo} - {self.placa}"

    def to_dict(self):
        """
        Método para converter o objeto Veiculo em um dicionário.

        Retorna:
        Um dicionário contendo os atributos do objeto Veiculo.
        """
        return {
            'proprietario_fk': self.proprietario_fk.to_dict() if self.proprietario_fk else None,
            'marca_fk': self.marca_fk.to_dict() if self.marca_fk else None,
            'tipo_carroceria_fk': self.tipo_carroceria_fk.to_dict() if self.tipo_carroceria_fk else None,
            'tipo_combustivel_fk': self.tipo_combustivel_fk.to_dict() if self.tipo_combustivel_fk else None,
            'tipo_veiculo_fk': self.tipo_veiculo_fk.to_dict() if self.tipo_veiculo_fk else None,
            'placa': self.placa,
            'marca': self.marca,
            'modelo': self.modelo,
            'ano': self.ano,
            'cidade': self.cidade,
            'cor':self.cor,
            'uf':self.uf,
            'renavam': self.renavam,
            'chassi': self.chassi,
            'numero_rastreador': self.numero_rastreador,
            'numero_frota': self.numero_frota,
            'capacidade_kg': self.capacidade_kg,
            'capacidade_cubica': self.capacidade_cubica,
            'tara': self.tara,
            'criado_por': self.criado_por.username if self.criado_por else None,
            'atualizado_por': self.atualizado_por.username if self.atualizado_por else None,
            'created_at': formats.date_format(self.created_at, "DATETIME_FORMAT"),
            'updated_at': formats.date_format(self.updated_at, "DATETIME_FORMAT"),
        }
