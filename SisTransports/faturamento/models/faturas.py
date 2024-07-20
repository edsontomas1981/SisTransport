from django.db import models
from operacional.models.emissor import Emissor
from parceiros.models.parceiros import Parceiros


class Faturas(models.Model):
    # STATUS_CHOICES = [
    #     ('pendente', 'Pendente'),
    #     ('pago', 'Pago'),
    #     ('cancelado', 'Cancelado'),
    # ]
    
    emissor_fk = models.ForeignKey(Emissor, on_delete=models.CASCADE, null=True, related_name='faturaEmissor')
    sacado_fk = models.ForeignKey(Parceiros, on_delete=models.CASCADE, null=True, related_name='faturaParceiro')
    numero_fatura = models.CharField(max_length=20, unique=True)  # Adicionado número da fatura
    data_emissao = models.DateField()
    vencimento = models.DateField()
    valor_total = models.FloatField()
    valor_a_pagar = models.FloatField()
    desconto = models.FloatField(default=0.0)  # Definido valor padrão para desconto
    impostos = models.FloatField(default=0.0)  # Adicionado campo para impostos
    data_pagamento = models.DateField(null=True, blank=True)  # Corrigido o nome do campo e permitido valor nulo
    forma_pagamento = models.CharField(max_length=50, null=True, blank=True)  # Adicionado campo para forma de pagamento
    # status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pendente')  # Adicionado campo de status
    observacoes = models.TextField(null=True, blank=True)  # Adicionado campo para observações

    def __str__(self):
        return f'Fatura {self.numero_fatura} - {self.sacado_fk}'

    class Meta:
        verbose_name = 'Fatura'
        verbose_name_plural = 'Faturas'
        ordering = ['-data_emissao']  # Ordenar por data de emissão decrescente
