from parceiros.models.parceiros import Parceiros as MdlParceiros
from contatos.classes.contato import Contato
from comercial.classes.tabelaFrete import TabelaFrete
from Classes.utils import dprint
from django.db.models import Q

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
    def read_parceiro(cls, cnpj):
        try:
            if MdlParceiros.objects.filter(cnpj_cpf=cnpj).exists():
                cls.parceiro = MdlParceiros.objects.filter(cnpj_cpf=cnpj).get()
                contatos = Contato()
                tabelas = TabelaFrete()
                cls.parceiro.tabelasFrete = tabelas.get_tabelas_por_parceiro(cls.parceiro)
                cls.parceiro.listaContatos = contatos.readContatos(cls.parceiro.id)
                return cls.parceiro
            else:
                return 404
        except Exception as e:
            return 500     

    @classmethod
    def read_parceiro_trecho(cls, cnpj):
        try:
            if MdlParceiros.objects.filter(cnpj_cpf=cnpj).exists():
                cls.parceiro = MdlParceiros.objects.filter(cnpj_cpf=cnpj).get()
                contatos = Contato()
                tabelas = TabelaFrete()
                cls.parceiro.tabelasFrete = tabelas.get_tabelas_por_parceiro(cls.parceiro)
                cls.parceiro.listaContatos = contatos.readContatos(cls.parceiro.id)
                return cls.parceiro
            else:
                return 404
        except Exception as e:
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

    @staticmethod
    def search_by_cnpj_or_razao_social(search_term):
        """
        Busca por parceiros que contenham o trecho do CNPJ/CPF ou da Razão Social.

        :param search_term: Parte do CNPJ/CPF ou Razão Social para a busca.
        :return: Lista de dicionários com os parceiros que correspondem à busca ou uma mensagem de erro.
        """
        try:
            if not search_term:
                raise ValueError("O termo de busca não pode estar vazio.")
            
            # Busca parceiros que correspondam ao termo
            parceiros = MdlParceiros.objects.filter(
                Q(cnpj_cpf__icontains=search_term) | Q(raz_soc__icontains=search_term)
            )
            
            # Verifica se houve resultados
            if not parceiros.exists():
                return []

            # Converte os resultados para uma lista de dicionários
            lista_parceiros = [parceiro.to_dict() for parceiro in parceiros]
            
            return lista_parceiros

        except ValueError as ve:
            return {"error": str(ve)}  # Retorna uma mensagem de erro amigável

        except Exception as e:
            return {"error": "Ocorreu um erro ao buscar parceiros."}  # Retorna uma mensagem de erro geral