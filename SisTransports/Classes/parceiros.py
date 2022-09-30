from parceiros.models.parceiros import Parceiros as mdlParceiros

class Parceiros():
    def __init__(self):
        pass
    
    def getParceiro(cnpj):
        if mdlParceiros.objects.filter(cnpj_cpf=cnpj).exists():
            parceiro=mdlParceiros.objects.filter(cnpj_cpf=cnpj).get()
            return parceiro
        else:
            return False

    def createParceiro(self,cnpj,razao,fantasia,inscr,obs,endereco_fk):
        self.parceiro=Parceiros()
        self.parceiro.cnpj_cpf=cnpj
        self.parceiro.raz_soc=razao
        self.parceiro.nome_fantasia=fantasia
        self.parceiro.insc_est=inscr
        self.parceiro.observacao=obs
        self.parceiro.endereco_fk=endereco_fk
        self.parceiro.save()
            
        

