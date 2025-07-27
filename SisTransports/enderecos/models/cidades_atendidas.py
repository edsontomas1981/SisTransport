from django.db import models
from enderecos.models.municipios import Municipios
from enderecos.models.filial_responsavel import FilialResponsavel

class CidadesAtendidas (models.Model):
    cidade=models.ForeignKey(Municipios, on_delete=models.CASCADE, related_name='cidades_atendidas', null=True)
    uf=models.CharField(max_length=3,null=False)
    filial_responsavel = models.ForeignKey(FilialResponsavel, on_delete=models.CASCADE, 
                                           related_name='cidades_atendidas', null=True)

    def to_dict(self):
        return {
            'id': self.id,
            'cidade': self.cidade.to_dict() if self.cidade else None,
            'uf': self.uf,
            'filial_responsavel': self.filial_responsavel,
        }