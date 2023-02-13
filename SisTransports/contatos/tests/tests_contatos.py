from django.test import TestCase
from Classes.utils import dprint,dpprint,checkBox
from parceiros.classes.parceiros import Parceiros
from enderecos.classes.enderecos import Enderecos
from contatos.classes.contato import Contato
from contatos.classes.tipoContatos import TipoContato

class CrudContatosTestCase(TestCase):
    def setUp(self):
        self.endereco=Enderecos()
        dadosEndereco={'cep':'00000000','logradouro':'Rua Teste','numero':'000',
               'bairro':'Bairro Teste','complemento':'Bl Teste',
               'cidade':'Cidade Teste','estado':'TE'}
        self.endereco.createEndereco(dadosEndereco)

        self.parceiro=Parceiros()   
        dadosParceiro={'cnpj':'00000000000000','razao':'Teste Razao','fantasia':'Teste Fantasia',
                       'inscr':'000000000000','obs':'Teste Observacao','endereco_fk':self.endereco.endereco}
        self.parceiro.createParceiro(dadosParceiro)  

        self.tipo=TipoContato()
        dadosTipoContato={'tipo':'Telefone'}
        self.tipo.createTipoContato(dadosTipoContato)   


    def test_createContato(self):
        self.contato=Contato()
        dados={'cargo':'Testador',
                'nome':'Testers',
                'descContato':'(00)0000-0000',
                'envio':checkBox('on'),
                'parceiro':self.parceiro,
                'tipo':self.tipo.tipoContato,
                }
        
        self.assertEqual(self.contato.createContato(dados),200)
