from django.db import models

class Tipo_Carroceria(models.Model):
    # Informações específicas do tipo de carroceria
    tipo_carroceria = models.CharField(max_length=255)

    @classmethod
    def to_dict(cls):
        tipos_carroceria = cls.objects.values('id', 'tipo_carroceria')
        return list(tipos_carroceria)
