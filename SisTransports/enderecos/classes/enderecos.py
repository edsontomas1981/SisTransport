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
        print(dados)
        try:
            self.dados=dados
            self.createOrUpdate(self.dados)
            self.endereco.save()
            return 200
        except:
            return 400
            
    def readEndereco(self,idEndereco):
        if MdlEnderecos.objects.filter(id=idEndereco).exists():
            self.endereco=MdlEnderecos.objects.filter(id=idEndereco).get()
            return self.endereco
        else:
            return False        
    
    def updateEndereco(self,idEndereco,dados):
        if MdlEnderecos.objects.filter(id=idEndereco).exists():
            try:
                self.endereco=MdlEnderecos.objects.filter(id=idEndereco).get()
                self.createOrUpdate(dados)
                self.endereco.save()
                return 200
            except:
                return 400 
        else:
            return 404  
        
    def deleteEndereco(self,idEndereco):
        if MdlEnderecos.objects.filter(id=idEndereco).exists():
            try:
                self.endereco=MdlEnderecos.objects.filter(id=idEndereco).get()
                self.endereco.delete()
                return 200
            except:
                return 400 
        else:
            return 404      
            
        
    
    
    
    