from django.test import TestCase
from Classes.utils import dprint,dpprint
from parceiros.classes.parceiros import Parceiros
from enderecos.classes.enderecos import Enderecos

class CrudParceiroTestCase(TestCase):
    def setUp(self):
        self.parceiro=Parceiros()
        self.objEndereco=Enderecos()
        dadosEndereco={'cep':'00000000','logradouro':'Rua Teste','numero':'000',
               'bairro':'Bairro Teste','complemento':'Bl Teste',
               'cidade':'Cidade Teste','estado':'TE'}
        self.objEndereco.createEndereco(dadosEndereco)
        
    def tearDown(self):
        self.parceiro=Parceiros()
        self.objEndereco=Enderecos()
    
    def test_createParceiro(self):
        dadosParceiro={'cnpj':'00000000000000','razao':'Teste Razao','fantasia':'Teste Fantasia',
                       'inscr':'000000000000','obs':'Teste Observacao','endereco_fk':self.objEndereco.endereco}
        self.assertEqual(self.parceiro.createParceiro(dadosParceiro),200)    
        dadosParceiro={'cnpj':'','razao':'','fantasia':'','inscr':'','obs':'','endereco_fk':''}
        self.assertEqual(self.parceiro.createParceiro(dadosParceiro),400)    
    
    def test_updateParceiro(self):
        dadosParceiro={'cnpj':'00000000000000','razao':'Teste Razao','fantasia':'Teste Fantasia',
                       'inscr':'000000000000','obs':'Teste Observacao','endereco_fk':self.objEndereco.endereco}
        self.parceiro.createParceiro(dadosParceiro)
        dadosParceiro={'cnpj':'00000000000001','razao':'Teste Razao atualizada','fantasia':'Teste Fantasia',
                       'inscr':'000000000000','obs':'Teste Observacao','endereco_fk':self.objEndereco.endereco}
        self.assertEqual(self.parceiro.updateParceiro(1,dadosParceiro),200)
        self.assertEqual(self.parceiro.parceiro.cnpj_cpf,'00000000000001')  
    
    def test_readParceiro(self):
        dadosParceiro={'cnpj':'00000000000000','razao':'Teste Razao','fantasia':'Teste Fantasia',
                       'inscr':'000000000000','obs':'Teste Observacao','endereco_fk':self.objEndereco.endereco}
        self.parceiro.createParceiro(dadosParceiro)        
        
        self.assertEqual(self.parceiro.readParceiro('00000000000000'),200)
        self.assertEqual(self.parceiro.parceiro.id,1)

        
    def test_readParceiroId(self):
        dadosParceiro={'cnpj':'00000000000000','razao':'Teste Razao','fantasia':'Teste Fantasia',
                       'inscr':'000000000000','obs':'Teste Observacao','endereco_fk':self.objEndereco.endereco}
        self.parceiro.createParceiro(dadosParceiro)        
        self.parceiro=self.parceiro.readParceiroId(1)
        self.assertEqual(self.parceiro.cnpj_cpf,'00000000000000')

    def test_deleteParceiro(self):
        dadosParceiro={'cnpj':'00000000000000','razao':'Teste Razao','fantasia':'Teste Fantasia',
                       'inscr':'000000000000','obs':'Teste Observacao','endereco_fk':self.objEndereco.endereco}
        self.parceiro.createParceiro(dadosParceiro)        
        self.assertEqual(self.parceiro.deleteParceiro(1),200)

        
        
        
    
        

    