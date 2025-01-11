from django.db import models
from django.conf import settings
from parceiros.models.parceiros import Parceiros
from enderecos.models.endereco import Enderecos

class Coleta (models.Model):
    volume=models.IntegerField()
    notaFiscal=models.CharField(max_length=15,null=True)
    peso=models.DecimalField (max_digits = 7, decimal_places = 2)
    valor=models.DecimalField(max_digits=9, decimal_places=2)
    cubM3=models.DecimalField (max_digits =7, decimal_places = 2,null=True)
    veiculo=models.CharField(max_length=50)
    especie=models.CharField(max_length=50)
    observacao=models.CharField(max_length=150)
    horario=models.CharField(max_length=20, null=True)
    mercadoria=models.CharField(max_length=20,default="Diversos")
    nome=models.CharField(max_length=15)
    contato=models.CharField(max_length=20,null=True)
    cep=models.CharField(max_length=9,null=True)
    rua=models.CharField(max_length=70,null=True)
    numero=models.CharField(max_length=10,null=True)
    complemento=models.CharField(max_length=30,null=True)
    bairro=models.CharField(max_length=30,null=True)
    cidade=models.CharField(max_length=50,null=True)
    uf=models.CharField(max_length=2,null=True)
    impresso=models.BooleanField(default=False)

    lat = models.FloatField(null=True)
    lng = models.FloatField(null=True)

    status=models.IntegerField(default=1)
    data_da_coleta = models.DateTimeField(null=True)

    usuario_cadastro = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='cadastrado_coleta')

    def to_dict(self):
        return{
            'id': self.id,
            'notaFiscal':self.notaFiscal,
            'horario':self.horario,
            'volume':self.volume,
            'peso':self.peso,
            'valor':self.valor,
            'cubM3':self.cubM3,
            'veiculo':self.veiculo,
            'mercadoria':self.mercadoria,
            'especie':self.especie,
            'observacao':self.observacao,
            'nome':self.nome,
            'contato':self.contato,
            'cep':self.cep,
            'rua':self.rua,
            'numero':self.numero,
            'complemento':self.complemento,
            'bairro':self.bairro,
            'cidade':self.cidade,
            'uf':self.uf,
            'lat':self.lat,
            'lng':self.lng,
            'data':self.data_da_coleta,
            'status':self.status,
            'usuario':self.usuario_cadastro_id
        }