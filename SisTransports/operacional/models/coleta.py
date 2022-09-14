from django.db import models
from parceiros.models.parceiros import Parceiros
from enderecos.models.endereco import Enderecos
from operacional.models.dtc import Dtc



class Coleta (models.Model):
    dtc_fk=models.ForeignKey(Dtc, on_delete=models.CASCADE, null=True, related_name='coletaDtc')
    volume=models.IntegerField()
    notaFiscal=models.CharField(max_length=15,null=True)
    peso=models.DecimalField (max_digits = 7, decimal_places = 2)
    valor=models.DecimalField(max_digits=9, decimal_places=2)
    cubM3=models.DecimalField (max_digits =7, decimal_places = 2,null=True)
    veiculo=models.CharField(max_length=50)
    especie=models.CharField(max_length=50)
    observacao=models.CharField(max_length=150)
    nome=models.CharField(max_length=15)
    contato=models.CharField(max_length=20)
    cep=models.CharField(max_length=9,null=True)
    rua=models.CharField(max_length=70,null=True)
    numero=models.CharField(max_length=10,null=True)
    complemento=models.CharField(max_length=30,null=True)
    bairro=models.CharField(max_length=30,null=True)
    cidade=models.CharField(max_length=50,null=True)
    uf=models.CharField(max_length=2,null=True)
    impresso=models.BooleanField(default=False)
    
    def to_dict(self):
        return{
            'id': self.id,
            'volume':self.volume,
            'peso':self.peso,
            'valor':self.valor,
            'cubM3':self.cubM3,
            'veiculo':self.veiculo,
            'especie':self.especi,
            'observacao':self.observacao,
            'nome':self.nome,
            'contato':self.contato,
            'cep':self.cep,
            'rua':self.rua,
            'numero':self.numero,
            'complemento':self.complemento,
            'bairro':self.bairro,
            'cidade':self.cidade,
            'uf':self.uf
        }
    
    
    
    
    
    
    
    

    

