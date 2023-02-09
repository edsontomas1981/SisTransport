from parceiros.models.parceiros import Parceiros as MdlParceiros
from Classes.utils import dprint

class Parceiros():
    def __init__(self):
        self.parceiro=MdlParceiros()
        
    def createParceiro(self,dados):
        try:
            self.createOrUpdate(dados)
            self.parceiro.save()
            return 200
        except:
            return 400
        
    
    def createOrUpdate(self,dados):
        self.parceiro.cnpj_cpf=dados['cnpj'][0]
        self.parceiro.raz_soc=dados['razao'][0]
        self.parceiro.nome_fantasia=dados['fantasia'][0]
        self.parceiro.insc_est=dados['inscr'][0]
        self.parceiro.observacao=dados['obs'][0]
        self.parceiro.endereco_fk=dados['endereco_fk'][0]
        

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
            
    def deleteParceiro(self):
        pass


    