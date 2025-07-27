from enderecos.models.filial_responsavel import FilialResponsavel
from django.db import transaction

class FilialResponsavelManager:
    """
    Classe estática para gerenciar operações CRUD para o modelo FilialResponsavel.
    """

    @staticmethod
    def create(dados):
        """
        Cria uma nova filial responsável.

        Args:
            dados (dict): Dados da nova filial.

        Returns:
            dict: Dicionário com status e ID da nova filial ou erro.
        """
        # try:
        filial = FilialResponsavel.objects.create(
            filial_responsavel=dados.get('filial_responsavel'),
            parceiro=dados.get('parceiro'),
            telefone=dados.get('telefone'),
            email=dados.get('email'),
            responsavel=dados.get('responsavel'),
        )
        return {'status': 200, 'id': filial.id}
        # except Exception as e:
        #     return {'status': 500, 'erro': str(e)}

    @staticmethod
    def update(cnpj, dados):
        """
        Atualiza os dados de uma filial com base no CNPJ.

        Args:
            cnpj (str): CNPJ da filial a ser atualizada.
            dados (dict): Dados atualizados.

        Returns:
            dict: Resultado da operação.
        """
        try:
            with transaction.atomic():
                filial = FilialResponsavel.objects.select_for_update().get(cnpj=cnpj)
                filial.filial_responsavel = dados.get('filial_responsavel', filial.filial_responsavel)
                filial.parceiro = dados.get('parceiro', filial.parceiro)
                filial.telefone = dados.get('telefone', filial.telefone)
                filial.email = dados.get('email', filial.email)
                filial.endereco = dados.get('endereco', filial.endereco)
                filial.cidade = dados.get('cidade', filial.cidade)
                filial.uf = dados.get('uf', filial.uf)
                filial.cep = dados.get('cep', filial.cep)
                filial.responsavel = dados.get('responsavel', filial.responsavel)
                filial.save()
                return {'status': 200}
        except FilialResponsavel.DoesNotExist:
            return {'status': 404, 'erro': 'Filial não encontrada'}
        except Exception as e:
            return {'status': 500, 'erro': str(e)}

    @staticmethod
    def delete(cnpj):
        """
        Remove uma filial com base no CNPJ.

        Args:
            cnpj (str): CNPJ da filial a ser removida.

        Returns:
            dict: Resultado da operação.
        """
        try:
            filial = FilialResponsavel.objects.get(cnpj=cnpj)
            filial.delete()
            return {'status': 200}
        except FilialResponsavel.DoesNotExist:
            return {'status': 404, 'erro': 'Filial não encontrada'}
        except Exception as e:
            return {'status': 500, 'erro': str(e)}

    @staticmethod
    def read_all():
        """
        Retorna todas as filiais.

        Returns:
            list: Lista de dicionários com os dados das filiais.
        """
        try:
            filiais = FilialResponsavel.objects.all()
            return [f.to_dict() for f in filiais]
        except Exception as e:
            return []

    @staticmethod
    def read_by_cnpj(cnpj):
        """
        Busca uma filial pelo CNPJ.

        Args:
            cnpj (str): CNPJ da filial.

        Returns:
            dict: Dados da filial ou None.
        """
        try:
            filial = FilialResponsavel.objects.get(cnpj=cnpj)
            return filial.to_dict()
        except FilialResponsavel.DoesNotExist:
            return None
        except Exception:
            return None

    @staticmethod
    def read_by_id(id_filial):
        """
        Busca uma filial pelo ID.

        Args:
            id_filial (int): ID da filial.

        Returns:
            dict: Dados da filial ou None.
        """
        try:
            filial = FilialResponsavel.objects.get(id=id_filial)
            return filial.to_dict()
        except FilialResponsavel.DoesNotExist:
            return None
        except Exception:
            return None

    @staticmethod
    def read_by_parceiro(parceiro_id):
        """
        Lista filiais vinculadas a um parceiro.

        Args:
            parceiro_id (int): ID do parceiro.

        Returns:
            list: Lista de filiais vinculadas ao parceiro.
        """
        try:
            filiais = FilialResponsavel.objects.filter(parceiro_id=parceiro_id)
            return [f.to_dict() for f in filiais]
        except Exception:
            return []
