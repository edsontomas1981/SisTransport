from django.db import models

class Tipo_Documento(models.Model):
    # Informações específicas do tipo de carroceria
    tipo_documento = models.CharField(max_length=255)

    @classmethod
    def to_dict_all(cls):
        tipos_documento = cls.objects.values('id', 'tipo_documento')
        return list(tipos_documento)

    def to_dict(self):
        return {
            'id': self.id,
            'tipo_documento': self.tipo_documento,
            }
    
    def __str__(self) -> str:
        return self.tipo_documento