from django.test import TestCase
from usuarios.models import Usuarios as User
from parceiros.models.parceiros import Parceiros
from operacional.models.motoristas import Motorista
from operacional.classes.motorista import MotoristaManager
from enderecos.models.endereco import Enderecos

class MotoristaManagerTestCase(TestCase):
    def setUp(self):
        """
        Configuração inicial para os testes na classe MotoristaManagerTestCase.

        Este método é executado antes de cada teste para configurar o ambiente de teste.

        Configurações realizadas:
        1. Cria um usuário de teste.
        2. Cria um endereço de teste.
        3. Cria um parceiro associado ao endereço criado.
        4. Inicializa uma instância do MotoristaManager.
        5. Define dados de motorista para serem usados nos testes.

        Este método fornece um ambiente consistente para cada teste da classe MotoristaManagerTestCase.
        """
        # Cria um usuário de teste
        self.user = User.objects.create_user(username='edson', password='analu1710')

        # Cria um endereço de teste
        self.endereco = self.criar_endereco()

        # Cria um parceiro associado ao endereço criado
        self.parceiro = self.criar_parceiro(self.endereco)

        # Inicializa uma instância do MotoristaManager
        self.manager = MotoristaManager()

        # Define dados de motorista para serem usados nos testes
        self.motorista_data = {
            'dtc': 1,
            'parceiro_id': self.parceiro.id,
            'data_nascimento': '1990-01-01',
            'filiacao_pai': 'Pai Teste',
            'filiacao_mae': 'Mãe Teste',
            'cnh_numero': '123456789',
            'cnh_categoria': 'AB',
            'cnh_validade': '2022-01-01',
            'numero_registro_cnh': '987654321',
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
        """
        Testa o método save_or_update da classe MotoristaManager.

        Caso de teste:
        1. Chama o método save_or_update com dados de motorista.
        2. Verifica se o motorista retornado pelo método tem o parceiro correto e a data de nascimento correta.
        3. Adicione verificações adicionais conforme necessário.

        Este teste garante que o método save_or_update pode salvar ou atualizar corretamente os dados de um motorista.
        """
        # Chama o método save_or_update com dados de motorista
        self.manager.save_or_update(self.motorista_data)

        # Verifica se o motorista retornado pelo método tem o parceiro correto e a data de nascimento correta
        self.assertEqual(self.manager.obj_motorista.parceiro_fk, self.parceiro)
        self.assertEqual(str(self.manager.obj_motorista.data_nascimento), '1990-01-01')

        # Adicionar verificações adicionais conforme necessário


    def test_read_motorista_by_id(self):
        """
        Testa o método read_motorista_by_id da classe MotoristaManager.

        Caso de teste:
        1. Cria um motorista usando o método create_motorista.
        2. Obtém o motorista recém-criado.
        3. Chama o método read_motorista_by_id com o ID do motorista.
        4. Verifica se o motorista retornado pelo método é igual ao motorista original.

        Este teste garante que o método read_motorista_by_id pode recuperar corretamente um motorista com base no ID.
        """
        # Cria um motorista
        self.manager.create_motorista(self.motorista_data)

        # Obtém o motorista recém-criado
        motorista = self.manager.obj_motorista

        # Chama o método read_motorista_by_id com o ID do motorista
        self.manager.read_motorista_by_id(motorista.id)

        # Verifica se o motorista retornado pelo método é igual ao motorista original
        self.assertEqual(self.manager.obj_motorista, motorista)



    def test_update_motorista(self):
        """
        Testa o método update_motorista da classe MotoristaManager.

        Verifica se o método update_motorista está funcionando corretamente, incluindo a atualização
        bem-sucedida de um campo específico no registro do motorista.

        Caso de teste:
        1. Cria um motorista usando o método create_motorista.
        2. Obtém o objeto Motorista criado.
        3. Atualiza o número da CNH (Carteira Nacional de Habilitação) para '999999999'.
        4. Chama o método update_motorista com as informações atualizadas.
        5. Verifica se a resposta é 200 (código de resposta de sucesso).
        6. Atualiza o objeto Motorista diretamente do banco de dados.
        7. Verifica se o número da CNH foi atualizado corretamente.

        Este teste garante que o método update_motorista pode alterar com sucesso as informações de um
        motorista existente e que o campo específico foi atualizado conforme esperado.
        """
        # Cria um motorista e obtém o objeto Motorista criado
        self.manager.create_motorista(self.motorista_data)
        motorista = self.manager.obj_motorista

        # Atualiza o número da CNH para '999999999'
        self.motorista_data['cnh_numero'] = '999999999'

        # Chama o método update_motorista
        response = self.manager.update_motorista(motorista.id, self.motorista_data)

        # Verifica se a resposta é 200 (código de resposta de sucesso)
        self.assertEqual(response, 200)

        # Atualiza o objeto Motorista diretamente do banco de dados
        motorista.refresh_from_db()

        # Verifica se o número da CNH foi atualizado corretamente
        self.assertEqual(motorista.cnh_numero, '999999999')


    def test_delete_motorista(self):
        """
        Testa o método delete_motorista da classe MotoristaManager.

        Caso de teste:
        1. Cria um motorista usando o método create_motorista.
        2. Obtém o objeto Motorista criado.
        3. Chama o método delete_motorista com o ID do motorista.
        4. Verifica se a resposta é None (nenhuma exceção foi lançada durante a exclusão).
        5. Verifica se o motorista foi excluído do banco de dados.

        Este teste garante que o método delete_motorista pode excluir um motorista existente e que
        o motorista foi removido com sucesso do banco de dados.
        """
        # Cria um motorista e obtém o objeto Motorista criado
        self.manager.create_motorista(self.motorista_data)
        motorista = self.manager.obj_motorista

        # Chama o método delete_motorista
        response = self.manager.delete_motorista(motorista.id)

        # Verifica se a resposta é None (nenhuma exceção foi lançada durante a exclusão)
        self.assertEqual(response, None)

        # Verifica se o motorista foi excluído do banco de dados
        self.assertFalse(Motorista.objects.filter(id=motorista.id).exists())

