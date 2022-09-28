from parceiros.models.parceiros import Parceiros as mdlParceiros

class Parceiros():
    def __init__(self):
        pass
    
    def getParceiro(cnpj):
        print('parceiro',cnpj)
        if mdlParceiros.objects.filter(cnpj_cpf=cnpj).exists():
            print('parceiro 1')
            parceiro=mdlParceiros.objects.filter(cnpj_cpf=cnpj).get()
            print('parceiro 2',parceiro)
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
            
        

