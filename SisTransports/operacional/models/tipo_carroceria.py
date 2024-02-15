from django.db import models

class Tipo_Carroceria(models.Model):
    # Informações específicas do tipo de carroceria
    tipo_carroceria = models.CharField(max_length=255)

    @classmethod
    def to_dict_all(cls):
        tipos_carroceria = cls.objects.values('id', 'tipo_carroceria')
        return list(tipos_carroceria)

    def to_dict(self):
        return {
            'id': self.id,
            'tipo_veiculo': self.tipo_carroceria,
            }