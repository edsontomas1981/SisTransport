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
    data_emissao = models.DateField()
    vencimento = models.DateField()
    valor_total = models.FloatField()
    valor_a_pagar = models.FloatField()
    desconto_em_porcentagem = models.FloatField(null=True,default=0.0)  # Definido valor padrão para desconto
    desconto_em_reais = models.FloatField(null=True,default=0.0)  # Definido valor padrão para desconto
    acrescimo_em_porcentagem = models.FloatField(null=True,default=0.0)  # Definido valor padrão para desconto
    acrescimo_em_reais = models.FloatField(null=True,default=0.0)  # Definido valor padrão para desconto
    impostos = models.FloatField(default=0.0)  # Adicionado campo para impostos
    data_pagamento = models.DateField(null=True, blank=True)  # Corrigido o nome do campo e permitido valor nulo
    forma_pagamento = models.CharField(max_length=50, null=True, blank=True)  # Adicionado campo para forma de pagamento
    # status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pendente')  # Adicionado campo de status
    observacoes = models.TextField(null=True, blank=True)  # Adicionado campo para observações

    def to_dict(self):
        return {
            'id': self.id,
            'emissor': self.emissor_fk.nome if self.emissor_fk else None,
            'sacado': self.sacado_fk.raz_soc if self.sacado_fk else None,
            'sacado_fk': self.sacado_fk.to_dict() if self.sacado_fk else None,
            'data_emissao': self.data_emissao.strftime('%Y-%m-%d'),
            'vencimento': self.vencimento if self.vencimento else None, 
            'valor_total': self.valor_total,
            'valor_a_pagar': self.valor_a_pagar,
            'percentual_desconto': self.desconto_em_porcentagem,
            'desconto_em_reais': self.desconto_em_reais,
            'percentual_acrescimo': self.acrescimo_em_porcentagem,
            'acrescimo_em_reais':self.acrescimo_em_reais,
            'impostos': self.impostos,
            'data_pagamento': self.data_pagamento.strftime('%Y-%m-%d') if self.data_pagamento else None,
            'forma_pagamento': self.forma_pagamento,
            'observacoes': self.observacoes,
        }

    def __str__(self):
        return f'Fatura {self.numero_fatura} - {self.sacado_fk}'

    class Meta:
        verbose_name = 'Fatura'
        verbose_name_plural = 'Faturas'
        ordering = ['-data_emissao']  # Ordenar por data de emissão decrescente
