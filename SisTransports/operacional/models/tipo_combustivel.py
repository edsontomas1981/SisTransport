from django.db import models

class Tipo_Combustivel(models.Model):
    # Informações específicas do tipo de combustível
    tipo_combustivel = models.CharField(max_length=255)

    @classmethod
    def to_dict(cls):
        tipos_combustivel = cls.objects.values('id', 'tipo_combustivel')
        return list(tipos_combustivel)
