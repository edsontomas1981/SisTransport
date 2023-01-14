'''from django.test import TestCase
from comercial.classes.tabelaFrete import TabelaFrete
from Classes.utils import checkBox
from parceiros.views import salva_parceiro
from enderecos.views import salva_end

class TabelaTest(TestCase):

    def setUp(self):
        #Cria Tabela
        self.tabela = TabelaFrete()
        self.endereco = salva_end('07243180','Rua 1','172','bl H','bairro','Guarulhos','SP')
        self.parceiro = salva_parceiro('23926683000108','razao','fantasia','796471869119','obs',self.endereco)

    def test_meuTeste(self):
        #Testa insercao dos dados na tabela
        self.assertEqual(self.tabela.createTabela(None,'tabela teste',1
            ,1,1,1,1,1,1,checkBox('on'),300,checkBox('on'),
            1,1,checkBox('on'),1),200)
        
        # ler a tabela
        tup=self.tabela.readTabela(1)        
        self.assertEqual(tup[1], 200)

        # update na tabela
        tabela,upTab=self.tabela.updateTabela(1,None,None,'Tabela teste update',2,2,2,2,2,2,2,1,
                            checkBox('on'),270,checkBox('on'),checkBox('on'),1,2)
        self.assertEqual(upTab,200)

        # Anexar tabela ao cnpj
        self.assertEqual(self.tabela.anexaTabelaAoParceiro("23926683000108"),200)
        # Não encontrou o parceiro
        self.assertEqual(self.tabela.anexaTabelaAoParceiro("00000000000000"),400) 
        '''
        
        