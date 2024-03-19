from parceiros.models.parceiros import Parceiros
from django.conf import settings
from django.utils import timezone
from operacional.models.motoristas import Motorista
from operacional.classes.dtc import Dtc
from django.contrib.auth import get_user_model


class MotoristaManager:
    def __init__(self):
        """
        Inicializa um objeto MotoristaManager.
        """
        self.obj_motorista = Motorista()

    def save_or_update(self, dados):
        """
        Salva ou atualiza um motorista com base nos dados fornecidos.

        Args:
        - dados (dict): Dados do motorista a serem salvos ou atualizados.
        """
        # Salva os dados no objeto Motorista
        self.obj_motorista.parceiro_fk = Parceiros.objects.get(id=dados['parceiro_id'])
        self.obj_motorista.data_nascimento = dados.get('data_nascimento', None)
        self.obj_motorista.validade_toxicologico = dados.get('validade_toxicologico', None)
        self.obj_motorista.filiacao_pai = dados.get('filiacao_pai', '')
        self.obj_motorista.pis = dados.get('pis', '')
        self.obj_motorista.estado_civil = dados.get('estado_civil', '')
        self.obj_motorista.filiacao_mae = dados.get('filiacao_mae', '')
        self.obj_motorista.cnh_numero = dados.get('cnh_numero', '')
        self.obj_motorista.cnh_categoria = dados.get('cnh_categoria', '')
        self.obj_motorista.cnh_validade = dados.get('cnh_validade', None)
        self.obj_motorista.dt_primeira_cnh = dados.get('dt_primeira_cnh', None)
        self.obj_motorista.dt_emissao_cnh = dados.get('dt_emissao_cnh', None)
        self.obj_motorista.numero_registro_cnh = dados.get('numero_registro_cnh', '')


    def read_motorista_by_id(self, id_motorista):
        """
        Lê um motorista com base no ID fornecido.

        Args:
        - id_motorista (int): ID do motorista a ser lido.
        """
        if not Motorista.objects.filter(id=id_motorista).exists():
            raise ValueError(f"O motorista com o ID {id_motorista} não foi encontrado.")
        self.obj_motorista = Motorista.objects.get(id=id_motorista)

    def read_motorista_by_cpf(self, cpf_motorista):
        """
        Lê um motorista com base no ID fornecido.

        Args:
        - id_motorista (int): ID do motorista a ser lido.
        """
        if not Motorista.objects.filter(parceiro_fk__cnpj_cpf=cpf_motorista).exists():
            return None
        
        self.obj_motorista = Motorista.objects.get(parceiro_fk__cnpj_cpf=cpf_motorista)
    
    @classmethod
    def read_motoristas(cls):
        """
        Retorna todos os motoristas cadastrados.

        Retorna:
        - Lista contendo todos os motoristas cadastrados, ou None se não houver motoristas cadastrados.
        """
        return Motorista.objects.all()  # Assumindo que Motorista é o modelo Django para os motoristas

    @classmethod
    def lista_todos_motoristas(cls):
        """
        Retorna uma lista de todos os motoristas cadastrados.

        Retorna:
        - Lista contendo os dados de todos os motoristas cadastrados, representados como dicionários.
        """
        motoristas = cls.read_motoristas()
        
        if motoristas is None:
            return []

        return [motorista.to_dict() for motorista in motoristas if hasattr(motorista, 'to_dict') and callable(getattr(motorista, 'to_dict'))]
        

    def create_motorista(self, dados):
        """
        Cria um novo motorista com base nos dados fornecidos.

        Args:
        - dados (dict): Dados do motorista a serem criados.
        """
        # try:
        self.save_or_update(dados)
        self.obj_motorista.criado_por = get_user_model().objects.get(id=dados['usuario_cadastro'])
        self.obj_motorista.created_at = timezone.now()
        self.obj_motorista.save()
        return 200
        # except Exception as e:
        #     # Trata a exceção de maneira apropriada
        #     print(f"Erro ao criar motorista: {e}")
        #     return 300

    def update_motorista(self, id_motorista, dados):
        """
        Atualiza um motorista existente com base nos dados fornecidos.

        Args:
        - id_motorista (int): ID do motorista a ser atualizado.
        - dados (dict): Dados do motorista a serem atualizados.
        """
        try:
            # Verifica se o motorista com o ID fornecido existe
            if not Motorista.objects.filter(id=id_motorista).exists():
                raise ValueError(f"O motorista com o ID {id_motorista} não foi encontrado.")

            self.obj_motorista = Motorista.objects.get(id=id_motorista)
            self.save_or_update(dados)
            self.obj_motorista.atualizado_por = get_user_model().objects.get(id=dados['usuario_cadastro'])
            self.obj_motorista.updated_at = timezone.now()
            self.obj_motorista.save()
            return 200
        except Exception as e:
            print(f"Erro ao atualizar motorista: {e}")
            return 300

    def delete_motorista(self, id_motorista):
        """
        Exclui um motorista com base no ID fornecido.

        Args:
        - id_motorista (int): ID do motorista a ser excluído.
        """
        if Motorista.objects.filter(id=id_motorista).exists():
            self.obj_motorista = Motorista.objects.get(id=id_motorista)
            self.obj_motorista.delete()
