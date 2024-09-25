from django.utils import timezone
from django.db.models import Q
from operacional.models.dtc import Dtc
from faturamento.models.faturas import Faturas
from operacional.classes.cte import Cte
from Classes.utils import dprint
from django.db import transaction


class FaturasManager:
    """
    Classe para gerenciar operações de faturas.
    """

    def __init__(self):
        """
        Inicializa uma nova instância de FaturasManager.
        """
        self.obj_fatura = Faturas()

    def save_or_update(self, dados):
        """
        Salva ou atualiza os dados de uma fatura.

        Args:
            dados (dict): Dados da fatura a serem salvos ou atualizados.
        """
        self.obj_fatura.emissor_fk = dados.get('emissor_id', None)
        self.obj_fatura.sacado_fk = dados.get('sacado_id', None)
        self.obj_fatura.data_emissao = dados.get('data_emissao', None)
        self.obj_fatura.vencimento = dados.get('vencimento', None)
        self.obj_fatura.valor_total = dados.get('valor_total', 0.0)
        self.obj_fatura.valor_a_pagar = dados.get('valor_a_pagar', 0.0)
        self.obj_fatura.desconto = dados.get('desconto', 0.0)
        self.obj_fatura.data_pagamento = dados.get('data_pagamento')

    def create_fatura(self, dados):
        """
        Cria uma nova fatura.

        Args:
            dados (dict): Dados da fatura a ser criada.

        Returns:
            int: Código de status (200 para sucesso, 300 para erro).
        """
        try:
            self.save_or_update(dados)
            self.obj_fatura.save()
            return 200
        except Exception as e:
            print(f"Erro ao criar fatura: {e}")
            return 300

    def update_fatura(self, id_fatura, dados):
        """
        Atualiza uma fatura existente.

        Args:
            id_fatura (int): ID da fatura a ser atualizada.
            dados (dict): Dados atualizados da fatura.

        Returns:
            int: Código de status (200 para sucesso, 404 para fatura não encontrada, 300 para erro).
        """
        try:
            with transaction.atomic():
                fatura = Faturas.objects.select_for_update().get(id=id_fatura)
                self.save_or_update(dados)
                fatura.save()
                return 200
        except Faturas.DoesNotExist:
            print(f"A fatura com o ID {id_fatura} não foi encontrada.")
            return 404
        except Exception as e:
            print(f"Erro ao atualizar fatura: {e}")
            return 300

    def delete_fatura(self, id_fatura):
        """
        Exclui uma fatura.

        Args:
            id_fatura (int): ID da fatura a ser excluída.

        Returns:
            int: Código de status (200 para sucesso, 404 para fatura não encontrada, 500 para erro).
        """
        try:
            fatura = Faturas.objects.get(id=id_fatura)
            fatura.delete()
            return 200
        except Faturas.DoesNotExist:
            print(f"A fatura com o ID {id_fatura} não foi encontrada.")
            return 404
        except Exception as e:
            print(f"Erro ao excluir fatura: {e}")
            return 500

    def read_fatura(self, id_fatura):
        """
        Lê uma fatura.

        Args:
            id_fatura (int): ID da fatura a ser lida.

        Returns:
            dict: Dados da fatura ou None se a fatura não for encontrada.
        """
        try:
            fatura = Faturas.objects.get(id=id_fatura)
            return fatura.to_dict()
        except Faturas.DoesNotExist:
            print(f"A fatura com o ID {id_fatura} não foi encontrada.")
            return None
        except Exception as e:
            print(f"Erro ao ler fatura: {e}")
            return None

    def read_faturas(self):
        """
        Lê todas as faturas.

        Returns:
            list: Lista de dicionários contendo os dados das faturas ou lista vazia em caso de erro.
        """
        try:
            faturas = Faturas.objects.all()
            return [fatura.to_dict() for fatura in faturas]
        except Exception as e:
            print(f"Erro ao ler faturas: {e}")
            return []

    @staticmethod
    def selecionar_dtc_com_cte_sem_fatura():
        """
        Seleciona DTCs que têm CTEs sem fatura.

        Returns:
            dict: DTCs , ou None em caso de erro.
        """
        try:
            dtcs = Dtc.objects.filter(
                Q(frete_dtc__isnull=False) & Q(frete_dtc__faturas_fk__isnull=True)
            ).distinct()

            dtcs_to_dict = []
            for dtc in dtcs :
                dtcs_to_dict.append(dtc)

            return dtcs_to_dict
        
        except Exception as e:
            print(f"Erro ao selecionar DTCs com CTEs sem fatura: {e}")
            return None

    @staticmethod
    def obtem_ctes_sem_fatura(dtcs):
        try:
            ctes_sem_fatura = []
            for dtc in dtcs:
                id_dtc = dtc.id
                cte = Cte.obtem_cte_by_dtc(id_dtc)  
                ctes_sem_fatura.append(cte.to_dict())

            return ctes_sem_fatura

        except Exception as e:
            print(f"Erro ao selecionar DTCs com CTEs sem fatura: {e}")
            return None
        


    @staticmethod
    def agrupa_dtcs_por_tomador(ctes):
        try:
            ctes_por_tomador = {}
            for cte in ctes:
                tomador =cte.get('dtc_fk').get('tomador').get('cnpj_cpf')
                if tomador not in ctes_por_tomador:
                    ctes_por_tomador[tomador] = []
                ctes_por_tomador[tomador].append(dict(cte))

            return ctes_por_tomador

        except Exception as e:
            print(f"Erro ao selecionar DTCs com CTEs sem fatura: {e}")
            return None

    @staticmethod
    @transaction.atomic
    def criar_faturas(dados_externos, dtcs_por_tomador):
        """
        Cria faturas com base nos DTCs selecionados.

        Args:
            dados (dict): Dados adicionais necessários para a criação das faturas.
            dtcs_por_tomador (dict): DTCs agrupados por tomador.

        Returns:
            list: Lista de dicionários contendo os dados das faturas criadas, ou None em caso de erro.
        """
        try:

            dprint(dados_externos)
            faturas_criadas = []

            for tomador, ctes in dtcs_por_tomador.items():
                valor_total = sum(float(cte['totalFrete']) for cte in ctes)
                qtde_cte = len(ctes)
                lista_ctes = [{'cte':cte['id'],'data_cadastro':cte['data_cadastro']} for cte in ctes]

                fatura = {
                    'emissor_fk': dados_externos.get('emissor_fk'),
                    'sacado_fk': ctes[0].get('dtc_fk').get('tomador'),
                    'dt_emissao_cte': ctes[0].get('data_cadastro'),
                    'sacado_fk_cnpj': ctes[0].get('dtc_fk').get('tomador').get('cnpj_cpf'),
                    'tipo_frete': ctes[0].get('dtc_fk').get('tipoFrete'),
                    'data_emissao': dados_externos.get('dt_emissao', '17/10/07'),
                    'vencimento': dados_externos.get('dataVencimento', '17/10/07'),
                    'valor_total': valor_total,
                    'qtde_cte': qtde_cte,
                    'desconto': dados_externos.get('desconto', 0.00),
                    'impostos': dados_externos.get('impostos', 0.00),
                    'forma_pagamento': dados_externos.get('forma_pagamento', 'Faturado'),
                    'observacoes': dados_externos.get('obs'),
                    'cte': lista_ctes,
                }

                faturas_criadas.append(fatura)

            return faturas_criadas

        except Exception as e:
            print(f"Erro ao criar faturas: {e}")
            return None
