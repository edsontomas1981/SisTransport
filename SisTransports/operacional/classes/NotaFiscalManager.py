from django.db import transaction
from operacional.models.nota_fiscal import Nota_fiscal  # ajuste o caminho conforme necessário
from Classes.utils import dprint


class NotaFiscalManager:
    """
    Classe de gerenciamento estático para CRUD de Nota Fiscal com base na chave de acesso.
    """

    @staticmethod
    def create_nota_fiscal(dados):
        """
        Cria uma nova nota fiscal.

        Args:
            dados (dict): Dados da nota fiscal.

        Returns:
            int: 200 (sucesso), 300 (erro).
        """
        try:
            nf = Nota_fiscal(
                chave_acesso=dados.get('chave_acesso'),
                num_nf=dados.get('num_nf'),
                data_emissao=dados.get('data_emissao'),
                natureza=dados.get('natureza'),
                especie=dados.get('especie'),
                tipo_documento=dados.get('tipo_documento'),
                volume=dados.get('volume'),
                peso=dados.get('peso'),
                m3=dados.get('m3'),
                valor_nf=dados.get('valor_nf'),
                dtc_fk_id=dados.get('dtc_fk'),
                usuario_cadastro_id=dados.get('usuario_cadastro'),
                usuario_ultima_atualizacao_id=dados.get('usuario_ultima_atualizacao'),
            )
            nf.save()
            return 200
        except Exception as e:
            dprint(f"Erro ao criar nota fiscal: {e}")
            return 300

    @staticmethod
    def update_nota_fiscal_por_chave(chave_acesso, dados):
        """
        Atualiza uma nota fiscal com base na chave de acesso.

        Args:
            chave_acesso (str): Chave de acesso da nota fiscal.
            dados (dict): Novos dados.

        Returns:
            int: 200 (sucesso), 404 (não encontrada), 300 (erro).
        """
        try:
            with transaction.atomic():
                nf = Nota_fiscal.objects.select_for_update().get(chave_acesso=chave_acesso)
                nf.num_nf = dados.get('num_nf')
                nf.data_emissao = dados.get('data_emissao')
                nf.natureza = dados.get('natureza')
                nf.especie = dados.get('especie')
                nf.tipo_documento = dados.get('tipo_documento')
                nf.volume = dados.get('volume')
                nf.peso = dados.get('peso')
                nf.m3 = dados.get('m3')
                nf.valor_nf = dados.get('valor_nf')
                nf.dtc_fk_id = dados.get('dtc_fk')
                nf.usuario_ultima_atualizacao_id = dados.get('usuario_ultima_atualizacao')
                nf.save()
                return 200
        except Nota_fiscal.DoesNotExist:
            return 404
        except Exception as e:
            dprint(f"Erro ao atualizar nota fiscal: {e}")
            return 300

    @staticmethod
    def delete_nota_fiscal_por_chave(chave_acesso):
        """
        Exclui uma nota fiscal com base na chave de acesso.

        Args:
            chave_acesso (str): Chave de acesso da nota fiscal.

        Returns:
            int: 200 (sucesso), 404 (não encontrada), 500 (erro).
        """
        try:
            nf = Nota_fiscal.objects.get(chave_acesso=chave_acesso)
            nf.delete()
            return 200
        except Nota_fiscal.DoesNotExist:
            return 404
        except Exception as e:
            dprint(f"Erro ao deletar nota fiscal: {e}")
            return 500

    @staticmethod
    def read_nota_fiscal_por_chave(chave_acesso):
        """
        Lê uma nota fiscal com base na chave de acesso.

        Args:
            chave_acesso (str): Chave de acesso.

        Returns:
            dict | None: Dados da nota fiscal ou None.
        """
        try:
            nf = Nota_fiscal.objects.get(chave_acesso=chave_acesso)
            return nf.to_dict()
        except Nota_fiscal.DoesNotExist:
            return None
        except Exception as e:
            dprint(f"Erro ao ler nota fiscal: {e}")
            return None

    @staticmethod
    def read_obj_nota_fiscal_por_chave(chave_acesso):
        """
        Retorna o objeto da nota fiscal com base na chave de acesso.

        Returns:
            Nota_fiscal | None
        """
        try:
            return Nota_fiscal.objects.get(chave_acesso=chave_acesso)
        except Nota_fiscal.DoesNotExist:
            return None
        except Exception as e:
            dprint(f"Erro ao obter objeto da nota fiscal: {e}")
            return None

    @staticmethod
    def read_notas_fiscais():
        """
        Retorna todas as notas fiscais como lista de dicionários.

        Returns:
            list: Lista de notas fiscais.
        """
        try:
            return [nf.to_dict() for nf in Nota_fiscal.objects.all().order_by('id')]
        except Exception as e:
            dprint(f"Erro ao listar notas fiscais: {e}")
            return []

    @staticmethod
    def buscar_por_numero_e_remetente(num_nf, id_dtc):
        """
        Busca notas fiscais pelo número e remetente (DTC).

        Args:
            num_nf (str): Número da NF.
            id_dtc (int): ID do DTC.

        Returns:
            list: Lista de dicionários de notas fiscais.
        """
        try:
            notas = Nota_fiscal.objects.filter(num_nf=num_nf, dtc_fk_id=id_dtc)
            return [nf.to_dict() for nf in notas]
        except Exception as e:
            dprint(f"Erro ao buscar nota por número e remetente: {e}")
            return []
