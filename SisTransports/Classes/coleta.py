from operacional.models.coleta import Coleta  as mdlColeta

class Coleta():
    def __init__(self,dtc,notaFiscal=None,volume=None,peso=None,m3=None,valor=None,especie=None,
                 veiculo=None,tipo=None,horario=None,obs=None,cep=None,rua=None,num=None,
                 comp=None,bairro=None,cidade=None,uf=None,nome=None,contato=None):
        self.dtc=dtc
        self.notaFiscal=notaFiscal
        self.volume=volume
        self.peso=peso
        self.valor=valor
        self.cubM3=m3
        self.veiculo=veiculo
        self.especie=especie
        self.observacao=obs
        self.nome=nome
        self.contato=contato
        self.cep=cep
        self.rua=rua
        self.numero=num
        self.complemento=comp
        self.bairro=bairro
        self.cidade=cidade
        self.uf=uf
        self.tipo=tipo
        self.horario=horario  
    
    def __str__(self):
        return self.id
    
    def salvaColeta(self):
        coleta=mdlColeta()
        coleta.dtc_fk=self.dtc
        coleta.volume=self.volume
        coleta.peso=self.peso
        coleta.valor=self.valor
        coleta.cubM3=self.cubM3
        coleta.veiculo=self.veiculo
        coleta.especie=self.especie
        coleta.observacao=self.observacao
        coleta.nome=self.nome
        coleta.contato=self.contato
        coleta.cep=self.cep
        coleta.rua=self.rua 
        coleta.numero=self.numero
        coleta.complemento=self.complemento
        coleta.bairro=self.bairro
        coleta.cidade=self.cidade
        coleta.uf=self.uf
        coleta.save()
