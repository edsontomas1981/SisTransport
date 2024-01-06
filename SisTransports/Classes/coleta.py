from operacional.models.coleta import Coleta  as MdlColeta
from operacional.models.dtc import Dtc
from Classes.utils import dprint,toFloat

class Coleta(): 
    def __init__(self):
        pass
   
    def salvaColeta(self,notaFiscal=None,volume=None,peso=None,m3=0,valor=None,especie=None,
                 veiculo=None,tipo=None,horario=None,obs=None,cep=None,rua=None,num=None,
                 comp=None,bairro=None,cidade=None,uf=None,nome=None,contato=None,
                 mercadoria=None):
        self.coleta=MdlColeta()
        self.coleta.notaFiscal=notaFiscal
        self.coleta.volume=volume
        self.coleta.peso=peso
        self.coleta.valor=float(valor)
        self.coleta.cubM3 =toFloat(m3)
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
   
    def readColeta(self,idParceiro):
        if Coleta.objects.filter(coleta_fk=idParceiro).exists():
            self.coleta=Dtc.objects.filter(coleta_fk=idParceiro).get()
            

    def obtemColeta(self,idColeta):
        if MdlColeta.objects.filter(id=idColeta).exists():
            self.coleta=MdlColeta.objects.filter(id=idColeta).get()  
            
    def alteraColeta(self,notaFiscal=None,volume=None,peso=None,m3=0,valor=None,especie=None,
                 veiculo=None,tipo=None,horario=None,obs=None,cep=None,rua=None,num=None,
                 comp=None,bairro=None,cidade=None,uf=None,nome=None,contato=None,
                 mercadoria=None):
        
        self.coleta.notaFiscal=notaFiscal
        self.coleta.volume=volume
        self.coleta.peso=peso
        self.coleta.valor=toFloat(valor)
        self.coleta.cubM3 =toFloat(m3)
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
    
    def deletaColeta(self,idColeta):
        if MdlColeta.objects.filter(id=idColeta).exists():
            self.coleta=MdlColeta.objects.filter(id=idColeta).get()
            if Dtc.objects.filter(coleta_fk=idColeta).exists():
                dtc=Dtc.objects.filter(coleta_fk=idColeta).get()
                dtc.coleta_fk=None
                dtc.save()
                self.coleta.delete()
    
    def to_dict(self):
        return self.coleta.to_dict()
