from django.db import models

class Ocorrencia_manifesto(models.Model):
    # Informações específicas do tipo de carroceria
    ocorrencia = models.CharField(max_length=70)

    @classmethod
    def to_dict_all(cls):
        ocorrencia = cls.objects.values('id', 'ocorrencias') #  Pega todas as ocorrencias e transforma em uma hashtable 
        return list(ocorrencia)

    def to_dict(self):
        return {
            'id': self.id,
            'tipo_ocorrencia': self.ocorrencia,
            }
    
    def __str__(self) -> str:
        return self.ocorrencia