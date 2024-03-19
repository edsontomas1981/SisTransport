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
    def lista_todos_veiculos(cls):
        veiculos = cls.get_all_veiculos()
        lista_veiculos = []
        for veiculo in veiculos:
            lista_veiculos.append(veiculo.to_dict())
        return lista_veiculos


    
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
        

    @classmethod
    def get_veiculo_placa(cls, placa):
        """
        Obtém todos os veículos associados a uma placa.

        Args:
        - placa (str): Placa do veículo.

        Returns:
        - QuerySet: QuerySet contendo o Veiculo associados à placa.
        """
        try:
            return Veiculo.objects.get(placa__iexact=placa)
        except Veiculo.DoesNotExist:
            return None

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
        chaves_necessarias = ['proprietario_fk', 'placa', 
                              'marca_fk', 'modelo', 'ano', 'cor', 
                              'renavam', 'chassi','tipo_carroceria_fk',
                              'tipo_combustivel_fk','tipo_veiculo_fk',
                              'cidade','uf',]

        # Verifica se dados contém todas as chaves necessárias.
        if not all(chave in dados for chave in chaves_necessarias):
            raise ValueError("Dados incompletos para salvar/atualizar veículo.")

        # Atribui diretamente os valores aos atributos do objeto Veiculo.
        instancia.proprietario_fk = dados.get('proprietario_fk')
        instancia.marca_fk = dados.get('marca_fk',None)
        instancia.tipo_carroceria_fk = dados.get('tipo_carroceria_fk',None)
        instancia.tipo_combustivel_fk = dados.get('tipo_combustivel_fk',None)
        instancia.tipo_veiculo_fk = dados.get('tipo_veiculo_fk',None)
        instancia.placa = dados.get('placa', None)
        instancia.modelo = dados.get('modelo', None)
        instancia.ano = dados.get('ano', None)
        instancia.cor = dados.get('cor', None)
        instancia.renavam = dados.get('renavam', None)
        instancia.chassi = dados.get('chassi', None)
        instancia.cidade = dados.get('cidade', None)
        instancia.uf = dados.get('uf', None)
        instancia.numero_frota = dados.get('numero_frota', None)
        instancia.numero_rastreador = dados.get('numero_rastreador', None)
        instancia.capacidade_kg = dados.get('capacidade_kg', 0)
        instancia.capacidade_cubica = dados.get('capacidade_cubica', 0)
        instancia.tara = dados.get('tara', 0)

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
            if 'usuario_cadastro' not in dados:
                raise ValueError("'criado_por_id' não fornecido para criar veículo.")

            # Define o usuário que criou o veículo.
            obj_veiculo.criado_por = get_user_model().objects.get(id=dados['usuario_cadastro'])

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
            obj_veiculo.atualizado_por = get_user_model().objects.get(id=dados['usuario_cadastro'])

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


