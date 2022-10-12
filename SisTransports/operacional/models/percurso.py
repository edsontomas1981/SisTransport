from django.db import models
from operacional.models.rota import Rota

class Percurso(models.Model):
    rota=models.ForeignKey(Rota, on_delete=models.CASCADE, null=True, related_name='coletaDtc')
    cidade=models.CharField(max_length=30)
    uf=models.CharField(max_length=2)
    
    def to_dict(self):
        return {'id': self.id,
                'rota': self.rota.to_dict(),
                'cidade': self.cidade,
                'uf': self.uf
                }
