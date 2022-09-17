from operacional.models.coleta import Coleta  as mdlColeta
from operacional.models.dtc import Dtc


class Coleta(): 
    def __init__(self):
        pass
   
    def salvaColeta(self,notaFiscal=None,volume=None,peso=None,m3=0,valor=None,especie=None,
                 veiculo=None,tipo=None,horario=None,obs=None,cep=None,rua=None,num=None,
                 comp=None,bairro=None,cidade=None,uf=None,nome=None,contato=None,
                 mercadoria=None):
        self.coleta=mdlColeta()
        self.coleta.notaFiscal=notaFiscal
        self.coleta.volume=volume
        self.coleta.peso=peso
        self.coleta.valor=float(valor)
        self.coleta.cubM3 if m3 else 0
        self.coleta.veiculo=veiculo
        self.coleta.tipo=tipo
        self.coleta.horario=horario
        self.coleta.especie=especie
        self.coleta.observacao=obs
        self.coleta.nome=nome
        self.coleta.contato=contato
        self.coleta.cep=cep
        self.coleta.rua=rua 
        self.coleta.numero=num
        self.coleta.complemento=comp
        self.coleta.bairro=bairro
        self.coleta.cidade=cidade
        self.coleta.uf=uf
        self.coleta.save()
   
    def obtemColeta(self,*args):
        if args :
            self.coleta=mdlColeta.objects.filter(id=args[0]).get()  
            return self.coleta
        else:
            return self.coleta

    def alteraColeta(self,notaFiscal=None,volume=None,peso=None,m3=0,valor=None,especie=None,
                 veiculo=None,tipo=None,horario=None,obs=None,cep=None,rua=None,num=None,
                 comp=None,bairro=None,cidade=None,uf=None,nome=None,contato=None,
                 mercadoria=None):
        
        # self.coleta=mdlColeta.objects.filter(id=self.id).get()
        self.coleta.notaFiscal=notaFiscal
        self.coleta.volume=volume
        self.coleta.peso=peso
        self.coleta.valor=float(valor)
        self.coleta.cubM3 if m3 else 0
        self.coleta.veiculo=veiculo
        self.coleta.tipo=tipo
        self.coleta.horario=horario
        self.coleta.especie=especie
        self.coleta.observacao=obs
        self.coleta.nome=nome
        self.coleta.contato=contato
        self.coleta.cep=cep
        self.coleta.rua=rua 
        self.coleta.numero=num
        self.coleta.complemento=comp
        self.coleta.bairro=bairro
        self.coleta.cidade=cidade
        self.coleta.uf=uf
        self.coleta.mercadoria=mercadoria
        self.coleta.save()
    
    def deletaColeta(idColeta):
        if mdlColeta.objects.filter(id=idColeta).exists():
            coleta=mdlColeta.objects.filter(id=idColeta).get()
            if Dtc.objects.filter(coleta_fk=idColeta).exists():
                dtc=Dtc.objects.filter(coleta_fk=idColeta).get()
                dtc.coleta_fk=None
                dtc.save()
                coleta.delete()
    
    def to_dict(self):
        return self.coleta.to_dict()
