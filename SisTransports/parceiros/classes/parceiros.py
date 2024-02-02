from parceiros.models.parceiros import Parceiros as MdlParceiros
from contatos.classes.contato import Contato
from comercial.classes.tabelaFrete import TabelaFrete
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
                return 201
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


    @classmethod
    def readParceiroClassMethod(cls, cnpj):
        try:
            if MdlParceiros.objects.filter(cnpj_cpf=cnpj).exists():
                cls.parceiro = MdlParceiros.objects.filter(cnpj_cpf=cnpj).get()
                contatos = Contato()
                tabelas = TabelaFrete()
                cls.parceiro.tabelasFrete = tabelas.get_tabelas_por_parceiro(cls.parceiro)
                cls.parceiro.listaContatos = contatos.readContatos(cls.parceiro.id)
                return 200
            else:
                return 404
        except Exception as e:
            print(f"Erro ao ler parceiro: {e}")
            return 500        
        

    def readParceiro(self,cnpj):
        try:
            if MdlParceiros.objects.filter(cnpj_cpf=cnpj).exists():
                self.parceiro=MdlParceiros.objects.filter(cnpj_cpf=cnpj).get()
                contatos=Contato()
                tabelas=TabelaFrete()
                self.parceiro.tabelasFrete=tabelas.get_tabelas_por_parceiro(self.parceiro)
                self.parceiro.listaContatos=contatos.readContatos(self.parceiro.id)
                return 200
            else:
                return 404
        except:
            return 500 #
        
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

    