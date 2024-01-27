from operacional.classes.proprietario import ProprietarioManager
from operacional.models.veiculos import Veiculo
from operacional.classes.motorista import MotoristaManager
from django.utils import timezone
from django.contrib.auth import get_user_model
from parceiros.models.parceiros import Parceiros
from operacional.models.proprietario import Proprietario

class VeiculoManager:
    def __init__(self):
        self.obj_veiculo = None

    @classmethod
    def get_veiculo_by_id(cls, veiculo_id):
        """
        Obtém um veículo pelo ID.

        Args:
        - veiculo_id (int): ID do veículo a ser obtido.

        Returns:
        - Veiculo: Objeto Veiculo correspondente ao ID, ou None se não encontrado.
        """
        try:
            return Veiculo.objects.get(id=veiculo_id)
        except Veiculo.DoesNotExist:
            return None
        
    @classmethod
    def get_all_veiculos(cls):
        """
        Obtém todos os veículos cadastrados.

        Returns:
        - QuerySet: QuerySet contendo todos os objetos Veiculo.
        """
        return Veiculo.objects.all()

    
    @classmethod
    def get_veiculos_by_proprietario_cnpj(cls, cnpj):
        """
        Obtém todos os veículos associados a um proprietário com base no CNPJ.

        Args:
        - cnpj (str): CNPJ do proprietário.

        Returns:
        - QuerySet: QuerySet contendo todos os objetos Veiculo associados ao proprietário com o CNPJ fornecido.
        """
        try:
            # Encontrar o proprietário com base no CNPJ
            proprietario = Proprietario.objects.get(parceiro_fk__cnpj_cpf=cnpj)
            # Retornar os veículos associados a esse proprietário
            return Veiculo.objects.filter(proprietario_fk=proprietario)
        
        except Proprietario.DoesNotExist:
            # Se o proprietário não for encontrado, retornar um QuerySet vazio
            return Veiculo.objects.none()

    @staticmethod
    def save_or_update(instancia, dados):
        """
        Atualiza os atributos do objeto veículo com base nos dados fornecidos.

        Args:
        - dados (dict): Dados do veículo a serem utilizados na atualização.

        Raises:
        - ValueError: Se dados não contiverem todas as chaves necessárias.
        """
        # Lista de chaves necessárias.
        chaves_necessarias = ['proprietario_fk', 'placa', 'marca', 'modelo', 'ano_fabricacao', 'cor', 'renavam', 'chassi']

        # Verifica se dados contém todas as chaves necessárias.
        if not all(chave in dados for chave in chaves_necessarias):
            raise ValueError("Dados incompletos para salvar/atualizar veículo.")


        # Atribui diretamente os valores aos atributos do objeto Veiculo.
        instancia.proprietario_fk = dados['proprietario_fk']
        instancia.placa = dados['placa']
        instancia.marca = dados['marca']
        instancia.modelo = dados['modelo']
        instancia.ano_fabricacao = dados['ano_fabricacao']
        instancia.cor = dados['cor']
        instancia.renavam = dados['renavam']
        instancia.chassi = dados['chassi']

    @classmethod
    def create_veiculo(cls, dados):
        """
        Cria um novo veículo com base nos dados fornecidos.

        Args:
        - dados (dict): Dados do veículo a serem utilizados na criação.

        Raises:
        - ValueError: Se 'criado_por_id' não estiver presente nos dados fornecidos.
        """
        try:
            # Cria uma nova instância de Veiculo
            obj_veiculo = Veiculo()

            # Chama a função save_or_update para configurar os dados do veículo.
            cls.save_or_update(obj_veiculo, dados)

            # Verifica se 'criado_por_id' está presente nos dados antes de utilizá-lo.
            if 'criado_por_id' not in dados:
                raise ValueError("'criado_por_id' não fornecido para criar veículo.")

            # Define o usuário que criou o veículo.
            obj_veiculo.criado_por = get_user_model().objects.get(id=dados['criado_por_id'])

            # Define a data e hora de criação do veículo.
            obj_veiculo.created_at = timezone.now()

            # Salva o novo veículo no banco de dados.
            obj_veiculo.save()

            return 200
        except Exception as e:
            return e


    @classmethod
    def update_veiculo(cls, id_veiculo, dados):
        """
        Atualiza um veículo existente com base nos dados fornecidos.

        Args:
        - id_veiculo (int): ID do veículo a ser atualizado.
        - dados (dict): Dados do veículo a serem atualizados.

        Returns:
        - int: Código de status HTTP indicando o resultado da operação.
            - 200: Sucesso na atualização.
            - 300: Falha na atualização devido a um erro.

        Raises:
        - ValueError: Se o veículo com o ID fornecido não for encontrado.
        """
        try:
            # Verifica se o veículo com o ID fornecido existe.
            if not Veiculo.objects.filter(id=id_veiculo).exists():
                raise ValueError(f"O veículo com o ID {id_veiculo} não foi encontrado.")

            # Obtém o objeto veículo a ser atualizado.
            obj_veiculo = Veiculo.objects.get(id=id_veiculo)

            # Atualiza os dados do veículo.
            cls.save_or_update(obj_veiculo, dados)

            # Define o usuário que realizou a atualização.
            obj_veiculo.atualizado_por = get_user_model().objects.get(id=dados['atualizado_por_id'])

            # Define a data e hora da última atualização.
            obj_veiculo.updated_at = timezone.now()

            # Salva as alterações no banco de dados.
            obj_veiculo.save()

            return 200  # Sucesso na atualização.
        except Exception as e:
            print(f"Erro ao atualizar veículo: {e}")
            return 300  # Falha na atualização devido a um erro.


    @classmethod
    def delete_veiculo(cls, id_veiculo):
        """
        Apaga um veículo existente com base na ID fornecida.

        Args:
        - id_veiculo (int): ID do veículo a ser apagado.

        Returns:
        - int: Código de status HTTP indicando o resultado da operação.
            - 200: Sucesso na exclusão.
            - 300: Falha na exclusão devido a um erro.

        Raises:
        - ValueError: Se o veículo com a ID fornecida não for encontrado.
        """
        try:
            # Verifica se o veículo com a ID fornecida existe.
            if not Veiculo.objects.filter(id=id_veiculo).exists():
                raise ValueError(f"O veículo com a ID {id_veiculo} não foi encontrado.")

            # Obtém o objeto veículo a ser apagado.
            obj_veiculo = Veiculo.objects.get(id=id_veiculo)

            # Apaga o veículo do banco de dados.
            obj_veiculo.delete()

            return 200  # Sucesso na exclusão.
        except Exception as e:
            print(f"Erro ao apagar veículo: {e}")
            return 300  # Falha na exclusão devido a um erro.


