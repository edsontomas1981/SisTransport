from parceiros.models.parceiros import Parceiros as MdlParceiros
from Classes.utils import dprint

class Parceiros():
    def __init__(self):
        self.parceiro=MdlParceiros()
        
    def createParceiro(self,dados):
        try:
            if MdlParceiros.objects.filter(cnpj_cpf=dados['cnpj']).exists():
                #caso o cnpj ja exista ele altera o cnpj
                self.parceiro=MdlParceiros.objects.filter(cnpj_cpf=dados['cnpj']).get()
                self.createOrUpdate(dados)
                self.parceiro.save()                
                return 500
            else:
                self.createOrUpdate(dados)
                self.parceiro.save()
                return 200
        except:
            return 400
        
    def createOrUpdate(self,dados):
        self.parceiro.cnpj_cpf=dados['cnpj']
        self.parceiro.raz_soc=dados['razao']
        self.parceiro.nome_fantasia=dados['fantasia']
        self.parceiro.insc_est=dados['inscr']
        self.parceiro.observacao=dados['obs']
        self.parceiro.endereco_fk=dados['endereco_fk']
        

    def readParceiro(self,cnpj):
        if MdlParceiros.objects.filter(cnpj_cpf=cnpj).exists():
            self.parceiro=MdlParceiros.objects.filter(cnpj_cpf=cnpj).get()
            return self.parceiro
        else:
            return False
        
    def readParceiroId(self,idParceiro):
        if MdlParceiros.objects.filter(id=idParceiro).exists():
            self.parceiro=MdlParceiros.objects.filter(id=idParceiro).get()
            return self.parceiro
        else:
            return False    
        
    def updateParceiro(self,idParceiro,dados):
        if MdlParceiros.objects.filter(id=idParceiro).exists():
            try:
                self.parceiro=MdlParceiros.objects.filter(id=idParceiro).get()
                self.createOrUpdate(dados)
                self.parceiro.save()
                return 200
            except:
                return 400 
        else:
            return 404               
            
    def deleteParceiro(self,idParceiro):
        if MdlParceiros.objects.filter(id=idParceiro).exists():
            try:
                self.parceiro=MdlParceiros.objects.filter(id=idParceiro).get()
                self.parceiro.delete()
                return 200
            except:
                return 400 
        else:
            return 404    

    