from enderecos.models.cidades_atendidas import CidadesAtendidas  # ajuste o caminho conforme sua estrutura
from Classes.utils import dprint
from django.db import transaction

class CidadesAtendidasManager:
    """
    Classe de gerenciamento para operações CRUD da model CidadesAtendidas.
    Todos os métodos são estáticos.
    """

    @staticmethod
    def create(dados):
        """
        Cria uma nova cidade atendida.

        Args:
            dados (dict): Dados da cidade atendida.

        Returns:
            int: 200 (sucesso), 300 (erro).
        """
        try:
            obj = CidadesAtendidas(
                cidade_id=dados.get('cidade'),
                uf=dados.get('uf'),
                filial_responsavel_id=dados.get('filial_responsavel'),
            )
            obj.save()
            return 200
        except Exception as e:
            dprint(f"Erro ao criar cidade atendida: {e}")
            return 300

    @staticmethod
    def update(id_cidade_atendida, dados):
        """
        Atualiza uma cidade atendida existente.

        Args:
            id_cidade_atendida (int): ID do registro.
            dados (dict): Novos dados.

        Returns:
            int: 200 (sucesso), 404 (não encontrado), 300 (erro).
        """
        try:
            with transaction.atomic():
                obj = CidadesAtendidas.objects.select_for_update().get(id=id_cidade_atendida)
                obj.cidade_id = dados.get('cidade')
                obj.uf = dados.get('uf')
                obj.filial_responsavel_id = dados.get('filial_responsavel')
                obj.save()
                return 200
        except CidadesAtendidas.DoesNotExist:
            return 404
        except Exception as e:
            dprint(f"Erro ao atualizar cidade atendida: {e}")
            return 300

    @staticmethod
    def delete(id_cidade_atendida):
        """
        Exclui uma cidade atendida pelo ID.

        Args:
            id_cidade_atendida (int): ID do registro.

        Returns:
            int: 200 (sucesso), 404 (não encontrado), 500 (erro).
        """
        try:
            obj = CidadesAtendidas.objects.get(id=id_cidade_atendida)
            obj.delete()
            return 200
        except CidadesAtendidas.DoesNotExist:
            return 404
        except Exception as e:
            dprint(f"Erro ao deletar cidade atendida: {e}")
            return 500

    @staticmethod
    def read(id_cidade_atendida):
        """
        Retorna os dados de uma cidade atendida pelo ID.

        Args:
            id_cidade_atendida (int): ID do registro.

        Returns:
            dict | None: Dicionário com dados ou None.
        """
        try:
            obj = CidadesAtendidas.objects.get(id=id_cidade_atendida)
            return obj.to_dict()
        except CidadesAtendidas.DoesNotExist:
            return None
        except Exception as e:
            dprint(f"Erro ao ler cidade atendida: {e}")
            return None

    @staticmethod
    def read_all():
        """
        Retorna todas as cidades atendidas.

        Returns:
            list: Lista de dicionários.
        """
        try:
            registros = CidadesAtendidas.objects.all().order_by('id')
            return [c.to_dict() for c in registros]
        except Exception as e:
            dprint(f"Erro ao listar cidades atendidas: {e}")
            return []
