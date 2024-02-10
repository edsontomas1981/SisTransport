from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from operacional.models.veiculos import Veiculo
from parceiros.models.parceiros import Parceiros
from operacional.classes.veiculo import VeiculoManager
from parceiros.models.parceiros import Parceiros
from enderecos.models.endereco import Enderecos
from operacional.classes.proprietario import ProprietarioManager


class VeiculoManagerTestCase(TestCase):

    def setUp(self):
        # Configuração inicial para os testes.
        self.user = get_user_model().objects.create_user(username='testuser', password='testpass')
        self.endereco = self.criar_endereco()
        self.parceiro = self.criar_parceiro(self.endereco)
        self.proprietario = self.criar_proprietario()
        self.veiculo_manager = VeiculoManager()

        self.dados_cadastro = self.dados_cadastrais('ABC123')

        self.dados_alteracao = {
            'proprietario_fk': self.proprietario,
            'placa': 'ABC123',
            'marca': 'Chevrolet',
            'modelo': 'Fiesta',
            'ano_fabricacao': 2022,
            'cor': 'Azul',
            'renavam': '123456789',
            'chassi': 'ABCDEF12345678901',
            'atualizado_por_id': self.user.id
        }       

    def dados_cadastrais(self,placa='ABC123'):
        # Dados de exemplo para o teste
        dados_veiculo = {
            'proprietario_fk': self.proprietario,  # Substitua pelo ID do proprietário desejado
            'cidade': 'Guarulhos',

            'placa': placa,
            'renavam': '123456789',
            'chassi': 'ABCDEFG123456789',
            'marca': 'Ford',
            'modelo': 'Focus',
            'cor': 'Preto',
            'ano_fabricacao': 2022,
            'ano_modelo':2022,
            'numero_rastreados':168555665,
            'numero_frota':4044,

            'capacidade_kg':27000,
            'capacidade_cubica':35,            
            'tara':27000,
            'criado_por_id': 1  # Substitua pelo ID do usuário criador desejado
        }

    def criar_proprietario(self):
        proprietario = ProprietarioManager()
        dados= {
            'antt': '123456',
            'parceiro_id': self.parceiro,
            'validade_antt': '2022-01-01',
            'tipo_proprietario': 'Individual',
            'criado_por_id': self.user.id,
            'atualizado_por_id': self.user.id,
        }
        proprietario.create_proprietario(dados)
        return proprietario.obj_proprietario    

    def criar_endereco(self):
        return Enderecos.objects.create(
            cep='12345678',
            logradouro='Rua Teste',
            numero='123',
            complemento='Complemento Teste',
            bairro='Bairro Teste',
            cidade='Cidade Teste',
            uf='UF'
        )

    def criar_parceiro(self, endereco):
        return Parceiros.objects.create(
            cnpj_cpf='12345678901234',
            raz_soc='Parceiro Teste',
            nome_fantasia='Nome Fantasia Teste',
            insc_est='123456789',
            observacao='Observacao Teste',
            ativo=True,
            endereco_fk=endereco
        )
    
    def test_create_veiculo(self):
        # Dados de exemplo para o teste
        dados_veiculo = {
            'proprietario_fk': self.proprietario,  # Substitua pelo ID do proprietário desejado
            'cidade': 'Guarulhos',

            'placa': 'ABC123',
            'renavam': '123456789',
            'chassi': 'ABCDEFG123456789',
            'marca': 'Ford',
            'modelo': 'Focus',
            'cor': 'Preto',
            'ano_fabricacao': 2022,
            'ano_modelo':2022,
            'numero_rastreados':168555665,
            'numero_frota':4044,

            'capacidade_kg':27000,
            'capacidade_cubica':35,            
            'tara':27000,
            'criado_por_id': 1  # Substitua pelo ID do usuário criador desejado
        }

        # Chama o método create_veiculo
        result = self.veiculo_manager.create_veiculo(dados_veiculo)
        veiculo = Veiculo.objects.get(placa='ABC123')

        # Verifica se os atributos foram criados corretamente
        self.assertEqual(result,200)
        self.assertEqual(veiculo.proprietario_fk, dados_veiculo['proprietario_fk'])
        self.assertEqual(veiculo.marca, dados_veiculo['marca'])
        self.assertEqual(veiculo.modelo, dados_veiculo['modelo'])
        self.assertEqual(veiculo.ano_fabricacao, dados_veiculo['ano_fabricacao'])
        self.assertEqual(veiculo.cor, dados_veiculo['cor'])
        self.assertEqual(veiculo.renavam, dados_veiculo['renavam'])
        self.assertEqual(veiculo.chassi, dados_veiculo['chassi'])

        # Verifica se o usuário criador foi definido corretamente
        self.assertEqual(veiculo.criado_por_id, dados_veiculo['criado_por_id'])

        # Verifica se a data de criação foi definida
        self.assertIsNotNone(veiculo.created_at)    

    def test_save_or_update(self):
        # Dados de exemplo para o teste
        dados_veiculo = {
            'proprietario_fk': self.proprietario,  # Substitua pelo ID do proprietário desejado
            'placa': 'ABC123',
            'marca': 'Ford',
            'modelo': 'Focus',
            'ano_fabricacao': 2022,
            'cor': 'Preto',
            'renavam': '123456789',
            'chassi': 'ABCDEFG123456789',
            'criado_por_id': 1  # Substitua pelo ID do usuário criador desejado
        }

        veiculo = Veiculo()

        # Chama o método save_or_update
        VeiculoManager.save_or_update(veiculo,dados_veiculo)

        # Verifica se os atributos foram atualizados corretamente
        self.assertEqual(veiculo.proprietario_fk, dados_veiculo['proprietario_fk'])
        self.assertEqual(veiculo.marca, dados_veiculo['marca'])
        self.assertEqual(veiculo.modelo, dados_veiculo['modelo'])
        self.assertEqual(veiculo.ano_fabricacao, dados_veiculo['ano_fabricacao'])
        self.assertEqual(veiculo.cor, dados_veiculo['cor'])
        self.assertEqual(veiculo.renavam, dados_veiculo['renavam'])
        self.assertEqual(veiculo.chassi, dados_veiculo['chassi'])

    def test_delete_veiculo(self):
        dados_veiculo = {
            'proprietario_fk': self.proprietario,  # Substitua pelo ID do proprietário desejado
            'cidade': 'Guarulhos',

            'placa': 'ABC123',
            'renavam': '123456789',
            'chassi': 'ABCDEFG123456789',
            'marca': 'Ford',
            'modelo': 'Focus',
            'cor': 'Preto',
            'ano_fabricacao': 2022,
            'ano_modelo':2022,
            'numero_rastreados':168555665,
            'numero_frota':4044,

            'capacidade_kg':27000,
            'capacidade_cubica':35,            
            'tara':27000,
            'criado_por_id': 1  # Substitua pelo ID do usuário criador desejado
        }

        # Chama o método create_veiculo
        result = self.veiculo_manager.create_veiculo(dados_veiculo)
        veiculo = Veiculo.objects.get(placa='ABC123')

        # Testa se é possível excluir um veículo existente.
        # veiculo = Veiculo.objects.create(placa='ABC123')

        result = self.veiculo_manager.delete_veiculo(veiculo.id)

        self.assertEqual(result, 200)
        self.assertFalse(Veiculo.objects.filter(id=veiculo.id).exists())

    def test_update_veiculo(self):
        # Dados de exemplo para o teste
        dados_veiculo = {
            'proprietario_fk': self.proprietario,  # Substitua pelo ID do proprietário desejado
            'cidade': 'Guarulhos',

            'placa': 'ABC123',
            'renavam': '123456789',
            'chassi': 'ABCDEFG123456789',
            'marca': 'Ford',
            'modelo': 'Focus',
            'cor': 'Preto',
            'ano_fabricacao': 2022,
            'ano_modelo':2022,
            'numero_rastreados':168555665,
            'numero_frota':4044,

            'capacidade_kg':27000,
            'capacidade_cubica':35,            
            'tara':27000,
            'criado_por_id': 1  # Substitua pelo ID do usuário criador desejado
        }

        # Chama o método create_veiculo
        result = self.veiculo_manager.create_veiculo(dados_veiculo)
        veiculo = Veiculo.objects.get(placa='ABC123')

                # Dados de exemplo para o teste
        self.dados_alteracao =  {
            'proprietario_fk': self.proprietario,  # Substitua pelo ID do proprietário desejado
            'cidade': 'Guarulhos',

            'placa': 'XYZ987',            
            'renavam': '123456789123',
            'chassi': 'ABCDEFG123456789123',
            'marca': 'Chevrolet',
            'modelo': 'Corsa',
            'cor': 'Preto',
            'ano_fabricacao': 2022,
            'ano_modelo':2023,
            'numero_rastreados':168555665,
            'numero_frota':4044,

            'capacidade_kg':27000,
            'capacidade_cubica':35,            
            'tara':27000,
            'atualizado_por_id': 1, 
        }


        

        result = self.veiculo_manager.update_veiculo(veiculo.id, self.dados_alteracao)
        veiculo_atualizado = Veiculo.objects.get(id=veiculo.id)

        self.assertEqual(result, 200)
        self.assertEqual(veiculo_atualizado.marca, 'Chevrolet')

    def test_get_veiculo_by_id(self):
        # Testa se é possível obter um veículo pelo ID.
        # Dados de exemplo para o teste
        # Dados de exemplo para o teste
        dados_veiculo = {
            'proprietario_fk': self.proprietario,  # Substitua pelo ID do proprietário desejado
            'cidade': 'Guarulhos',

            'placa': 'ABC123',
            'renavam': '123456789',
            'chassi': 'ABCDEFG123456789',
            'marca': 'Ford',
            'modelo': 'Focus',
            'cor': 'Preto',
            'ano_fabricacao': 2022,
            'ano_modelo':2022,
            'numero_rastreados':168555665,
            'numero_frota':4044,

            'capacidade_kg':27000,
            'capacidade_cubica':35,            
            'tara':27000,
            'criado_por_id': 1  # Substitua pelo ID do usuário criador desejado
        }

        # Chama o método create_veiculo
        result = self.veiculo_manager.create_veiculo(dados_veiculo)
        veiculo = Veiculo.objects.get(placa='ABC123')
        result = VeiculoManager.get_veiculo_by_id(veiculo.id)
        self.assertEqual(result, veiculo)

    def test_get_all_veiculos(self):
        # Dados de exemplo para o teste
        dados_veiculo = {
            'proprietario_fk': self.proprietario,  # Substitua pelo ID do proprietário desejado
            'cidade': 'Guarulhos',

            'placa': 'ABC123',
            'renavam': '123456789',
            'chassi': 'ABCDEFG123456789',
            'marca': 'Ford',
            'modelo': 'Focus',
            'cor': 'Preto',
            'ano_fabricacao': 2022,
            'ano_modelo':2022,
            'numero_rastreados':168555665,
            'numero_frota':4044,

            'capacidade_kg':27000,
            'capacidade_cubica':35,            
            'tara':27000,
            'criado_por_id': 1  # Substitua pelo ID do usuário criador desejado
        }
        

        # Chama o método create_veiculo
        result = self.veiculo_manager.create_veiculo(dados_veiculo)
        veiculo = Veiculo.objects.get(placa='ABC123')

        # Dados de exemplo para o teste
        dados_veiculo = {
            'proprietario_fk': self.proprietario,  # Substitua pelo ID do proprietário desejado
            'cidade': 'Guarulhos',

            'placa': 'XYZ987',            
            'renavam': '123456789123',
            'chassi': 'ABCDEFG123456789123',
            'marca': 'Ford',
            'modelo': 'Focus',
            'cor': 'Preto',
            'ano_fabricacao': 2022,
            'ano_modelo':2022,
            'numero_rastreados':168555665,
            'numero_frota':4044,

            'capacidade_kg':27000,
            'capacidade_cubica':35,            
            'tara':27000,
            'criado_por_id': 1  # Substitua pelo ID do usuário criador desejado
        }


        # Chama o método create_veiculo
        result = self.veiculo_manager.create_veiculo(dados_veiculo)
        veiculo1 = Veiculo.objects.get(placa='XYZ987')
        result = self.veiculo_manager.get_all_veiculos()  # Chame usando a instância específica

        # Adicione mensagens de depuração
        self.assertEqual(result.count(), 2, "A contagem de veículos não está correta.")

    def test_get_veiculos_by_proprietario_cnpj(self):
        # Dados de exemplo para o teste
        dados_veiculo = {
            'proprietario_fk': self.proprietario,  # Substitua pelo ID do proprietário desejado
            'cidade': 'Guarulhos',

            'placa': 'ABC123',
            'renavam': '123456789',
            'chassi': 'ABCDEFG123456789',
            'marca': 'Ford',
            'modelo': 'Focus',
            'cor': 'Preto',
            'ano_fabricacao': 2022,
            'ano_modelo':2022,
            'numero_rastreados':168555665,
            'numero_frota':4044,

            'capacidade_kg':27000,
            'capacidade_cubica':35,            
            'tara':27000,
            'criado_por_id': 1  # Substitua pelo ID do usuário criador desejado
        }
        

        # Chama o método create_veiculo
        result = self.veiculo_manager.create_veiculo(dados_veiculo)
        veiculo = Veiculo.objects.get(placa='ABC123')

        # Dados de exemplo para o teste
        dados_veiculo = {
            'proprietario_fk': self.proprietario,  # Substitua pelo ID do proprietário desejado
            'cidade': 'Guarulhos',

            'placa': 'XYZ987',            
            'renavam': '123456789123',
            'chassi': 'ABCDEFG123456789123',
            'marca': 'Ford',
            'modelo': 'Focus',
            'cor': 'Preto',
            'ano_fabricacao': 2022,
            'ano_modelo':2022,
            'numero_rastreados':168555665,
            'numero_frota':4044,

            'capacidade_kg':27000,
            'capacidade_cubica':35,            
            'tara':27000,
            'criado_por_id': 1  # Substitua pelo ID do usuário criador desejado
        }


        # Chama o método create_veiculo
        result = self.veiculo_manager.create_veiculo(dados_veiculo)
        veiculo1 = Veiculo.objects.get(placa='XYZ987')

        result = VeiculoManager.get_veiculos_by_proprietario_cnpj(self.proprietario.parceiro_fk.cnpj_cpf)
        self.assertEqual(result.count(), 2)



