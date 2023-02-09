from enderecos.models.endereco import Enderecos as MdlEnderecos

class Enderecos:
    def __init__(self):
        self.endereco=MdlEnderecos()
    
    def createOrUpdate(self,dados):
        self.endereco.cep=dados['cep']
        self.endereco.logradouro=dados['logradouro']
        self.endereco.numero=dados['numero']
        self.endereco.complemento=dados['complemento']
        self.endereco.bairro=dados['bairro']
        self.endereco.cidade=dados['cidade']
        self.endereco.uf=dados['estado']
    
    def createEndereco(self,dados):
        try:
            self.dados=dados
            self.createOrUpdate(self.dados)
            self.endereco.save()
            return 200
        except:
            return 400
            
        
    
    
    
    