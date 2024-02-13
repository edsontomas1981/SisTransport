from django.db import models

class Marca (models.Model):
    # Informações específicas do emissor do CTe
    marca = models.CharField(max_length=255)

    @classmethod
    def to_dict(cls):
        marcas = cls.objects.values('id', 'marca')
        return list(marcas)