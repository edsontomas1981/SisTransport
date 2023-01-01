from parceiros.models.parceiros import Parceiros as MdlParceiros
from Classes.utils import dprint

class Parceiros():
    def __init__(self):
        self.parceiro=MdlParceiros()
    
    def getParceiro(self,cnpj):
        if MdlParceiros.objects.filter(cnpj_cpf=cnpj).exists():
            self.parceiro=MdlParceiros.objects.filter(cnpj_cpf=cnpj).get()
            return self.parceiro
        else:
            return False

    def createParceiro(self,cnpj,razao,fantasia,inscr,obs,endereco_fk):
        self.parceiro.cnpj_cpf=cnpj
        self.parceiro.raz_soc=razao
        self.parceiro.nome_fantasia=fantasia
        self.parceiro.insc_est=inscr
        self.parceiro.observacao=obs
        self.parceiro.endereco_fk=endereco_fk
        self.parceiro.save()



            
        

