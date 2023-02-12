from django.test import TestCase, Client
from enderecos.classes.enderecos import Enderecos

class EnderecoTest(TestCase):
    def setUp(self):
        self.endereco = Enderecos()
        self.dados={'cep':'00000000','logradouro':'Rua Teste','numero':'000',
               'bairro':'Bairro Teste','complemento':'Bl Teste',
               'cidade':'Cidade Teste','estado':'TE'}
    
    def test_createEndereco(self):
        self.assertEqual(self.endereco.createEndereco(self.dados),200)
        
    def test_updateEndereco(self):
        self.dados={'cep':'00000000','logradouro':'Rua Teste','numero':'000',
               'bairro':'Bairro Teste','complemento':'Bl Teste',
               'cidade':'Cidade Teste','estado':'TE'}
        self.endereco.createEndereco(self.dados)
        self.dados={'cep':'00000000','logradouro':'Rua Teste','numero':'000',
               'bairro':'Bairro Teste','complemento':'Bl Teste',
               'cidade':'Cidade Teste','estado':'ES'}
        self.assertEqual(self.endereco.updateEndereco(1,self.dados),200)
        self.assertEqual(self.endereco.endereco.uf,'ES')
    
    def test_readEndereco(self):
        self.endereco1=Enderecos()
        self.endereco2=Enderecos()
        self.dados={'cep':'00000001','logradouro':'Rua Teste','numero':'000',
               'bairro':'Bairro Teste','complemento':'Bl Teste',
               'cidade':'Cidade Teste','estado':'T1'}
        self.endereco1.createEndereco(self.dados)
        
        self.dados={'cep':'00000002','logradouro':'Rua Teste','numero':'000',
               'bairro':'Bairro Teste','complemento':'Bl Teste',
               'cidade':'Cidade Teste','estado':'T2'}
        self.endereco2.createEndereco(self.dados)                    
        
        self.endereco1=self.endereco1.readEndereco(1)        
        self.assertEqual(self.endereco1.uf,'T1')
        
        self.endereco2=self.endereco2.readEndereco(2)
        self.assertEqual(self.endereco2.uf,'T2')
             
    def test_deleteEndereco(self):
        self.dados={'cep':'00000000','logradouro':'Rua Teste','numero':'000',
               'bairro':'Bairro Teste','complemento':'Bl Teste',
               'cidade':'Cidade Teste','estado':'TE'}
        self.endereco.createEndereco(self.dados)
        (self.endereco.deleteEndereco(1))
        


    