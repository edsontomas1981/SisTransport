from django.test import TestCase
from usuarios.models import Usuarios as User
from parceiros.models.parceiros import Parceiros
from enderecos.models.endereco import Enderecos
from operacional.models.proprietario import Proprietario
from operacional.classes.proprietario import ProprietarioManager

class ProprietarioManagerTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='edson', password='analu1710')
        self.endereco = self.criar_endereco()
        self.parceiro = self.criar_parceiro(self.endereco)
        self.manager = ProprietarioManager()
        self.proprietario_data = {
            'antt': '123456',
            'parceiro_id': self.parceiro,
            'validade_antt': '2022-01-01',
            'tipo_proprietario': 'Individual',
            'criado_por_id': self.user.id,
            'atualizado_por_id': self.user.id,
        }

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

    def test_save_or_update(self):
        self.manager.save_or_update(self.proprietario_data)
        self.assertEqual(self.manager.obj_proprietario.parceiro_fk, self.parceiro)
        self.assertEqual(str(self.manager.obj_proprietario.validade_antt), '2022-01-01')

    def test_create_proprietario(self):
        response = self.manager.create_proprietario(self.proprietario_data)
        self.assertEqual(response, 200)

    def test_read_proprietario(self):
        self.manager.create_proprietario(self.proprietario_data)
        proprietario = self.manager.obj_proprietario
        dicionario = self.manager.read_proprietario(proprietario.id)
        self.assertEqual(dicionario, proprietario.to_dict())


    def test_read_proprietarios(self):
        self.manager.create_proprietario(self.proprietario_data)
        proprietarios = self.manager.read_proprietarios()
        self.assertEqual(len(proprietarios), 1)
        self.assertEqual(proprietarios[0], self.manager.obj_proprietario.to_dict())

    def test_update_proprietario(self):
        self.manager.create_proprietario(self.proprietario_data)
        novo_antt = '654321'
        self.proprietario_data['antt'] = novo_antt
        response = self.manager.update_proprietario(self.manager.obj_proprietario.id, self.proprietario_data)
        self.assertEqual(response, 200)
        self.manager.obj_proprietario.refresh_from_db()
        self.assertEqual(self.manager.obj_proprietario.antt, novo_antt)

    def test_delete_proprietario(self):
        self.manager.create_proprietario(self.proprietario_data)
        response = self.manager.delete_proprietario(self.manager.obj_proprietario.id)
        self.assertEqual(response,200)
        self.assertFalse(Proprietario.objects.filter(id=self.manager.obj_proprietario.id).exists())
        
    # def test_read_proprietario_por_veiculo(self):
    #     # Supondo que você tenha um modelo de Veiculo e uma relação entre Proprietario e Veiculo
    #     # Esta parte do teste pode variar dependendo da sua implementação real
    #     # Certifique-se de adaptar conforme necessário para o seu modelo real
    #     veiculo_data = {
    #         'placa': 'ABC123',
    #         'proprietario_id': self.manager.create_proprietario(self.proprietario_data)
    #     }
    #     # Suponha que você tenha uma classe VeiculoManager semelhante à ProprietarioManager
    #     # Certifique-se de adaptar conforme necessário para o seu modelo real
    #     veiculo_manager = VeiculoManager()
    #     veiculo_manager.create_veiculo(veiculo_data)
    #     proprietario_por_veiculo = veiculo_manager.read_proprietario_por_veiculo(veiculo_manager.obj_veiculo.id)
    #     self.assertEqual(proprietario_por_veiculo, self.manager.obj_proprietario.to_dict())

