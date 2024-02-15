from django.db import models

class Tipo_Veiculo(models.Model):
    # Informações específicas do tipo de veículo
    tipo_veiculo = models.CharField(max_length=255)

    @classmethod
    def to_dict_all(cls):
        tipos_veiculo = cls.objects.values('id', 'tipo_veiculo')
        return list(tipos_veiculo)
    
    def to_dict(self):
        return {
            'id': self.id,
            'tipo_veiculo': self.tipo_veiculo,
            }
    
