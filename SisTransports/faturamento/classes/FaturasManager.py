from django.utils import timezone
from django.db.models import Q
from operacional.models.dtc import Dtc
from faturamento.models.faturas import Faturas
from operacional.classes.cte import Cte
from django.db import transaction
from Classes.utils import dprint,string_para_data,str_to_date

from datetime import datetime


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
        self.obj_fatura.emissor_fk = dados.get('emissor_fk', None)
        self.obj_fatura.sacado_fk = dados.get('sacado_id', None)
        self.obj_fatura.data_emissao = dados.get('data_emissao', None)
        self.obj_fatura.vencimento = dados.get('vencimento', None)
        self.obj_fatura.valor_total = dados.get('valor_total', 0.0)
        self.obj_fatura.valor_a_pagar = dados.get('valor_a_pagar', 0.0)
        self.obj_fatura.desconto_em_porcentagem= dados.get('desconto', 0.0)
        self.obj_fatura.desconto_em_reais= dados.get('desconto_em_reais', 0.0)
        self.obj_fatura.acrescimo_em_porcentagem= dados.get('acrescimo', 0.0)
        self.obj_fatura.acrescimo_em_reais= dados.get('acrescimo_em_reais', 0.0)
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

    @staticmethod
    def delete_fatura(id_fatura):
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

    @staticmethod
    def read_fatura(id_fatura):
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

    def read_obj_fatura(self,id_fatura):
        """
        Lê uma fatura.

        Args:
            id_fatura (int): ID da fatura a ser lida.

        Returns:
            dict: Dados da fatura ou None se a fatura não for encontrada.
        """
        try:
            self.obj_fatura = Faturas.objects.get(id=id_fatura)
            return self.obj_fatura
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
            faturas = Faturas.objects.all().order_by('id')

            lista_fatura = [
                {**fatura.to_dict(), 'qtdeDoctos': len(Cte.get_ctes_por_fatura(fatura.id))}
                for fatura in faturas
            ]

            return lista_fatura
            # return [fatura.to_dict() for fatura in faturas]
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
                    'desconto_em_reais': dados_externos.get('desconto_em_reais', 0.00),
                    'acrescimo': dados_externos.get('acrescimo', 0.00),
                    'acrescimo_em_reais': dados_externos.get('acrescimo_em_reais', 0.00),
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

    @staticmethod
    def criar_fatura(dados):
        pass

    @staticmethod
    def atualizar_ctes(dados):
        """
        Atualiza os CTe's associados a uma fatura específica.

        Esta função recebe um dicionário com dados da fatura e uma lista de CTe's.
        Ela atualiza a relação de CTe's para a fatura, removendo os que não estão mais
        associados e adicionando os novos.

        Args:
            dados (dict): Dicionário contendo os dados da fatura, incluindo 'id' da fatura
                        e a lista de CTe's a serem associados.

        Raises:
            ValueError: Se o campo 'id' da fatura ou a lista de 'ctes' estiverem ausentes.
            Faturas.DoesNotExist: Se a fatura com o ID fornecido não for encontrada no banco de dados.
            Exception: Para qualquer outro erro inesperado durante o processo.
        """
        try:
            # Valida se o campo 'id' da fatura existe e se a lista de CTe's não está vazia
            fatura_id = dados.get('id')
            ctes = dados.get('ctes', [])

            if not fatura_id:
                raise ValueError("O campo 'id' da fatura é obrigatório.")
            if not ctes:
                raise ValueError("A lista de 'ctes' não pode estar vazia.")

            # Tenta recuperar a fatura pelo ID
            fatura = Faturas.objects.get(id=fatura_id)

            # Instancia o gerenciador de faturas e realiza operações na fatura
            obj_fatura = FaturasManager()
            obj_fatura.read_obj_fatura(fatura_id)
            obj_fatura.save_or_update(dados)
            obj_fatura.obj_fatura.save()

            # Obtém os CTe's atualmente associados à fatura
            ctes_associados = Cte.get_ctes_por_fatura(fatura_id)

            # Extrai IDs dos CTe's recebidos
            ids_novos_ctes = [cte.get('idCte') for cte in ctes]

            # Extrai IDs dos CTe's atualmente associados à fatura
            ids_ctes_associados = [cte.to_dict().get('id') for cte in ctes_associados]

            # Identifica os CTe's que precisam ser removidos da fatura
            ctes_para_remover = set(ids_ctes_associados) - set(ids_novos_ctes)

            # Identifica os novos CTe's que precisam ser adicionados à fatura
            ctes_para_adicionar = set(ids_novos_ctes) - set(ids_ctes_associados)

            # Remove os CTe's que não devem mais estar associados à fatura
            for cte_id in ctes_para_remover:
                Cte.remove_fatura_cte(cte_id)

            # Adiciona os novos CTe's à fatura
            for cte_id in ctes_para_adicionar:
                Cte.adiciona_fatura_ao_cte(cte_id, fatura)

        except Faturas.DoesNotExist:
            raise Faturas.DoesNotExist(f"Fatura com ID {fatura_id} não encontrada.")
        except ValueError as ve:
            raise ValueError(f"Erro de validação: {str(ve)}")
        except Exception as e:
            raise Exception(f"Erro inesperado ao atualizar os CTe's: {str(e)}")

    @staticmethod
    def get_faturas_filtro(dados,criterio):

        for fatura in dados:
            print(FaturasManager.atende_criterios(criterio,dados))

            # print(f"""
            #     Critérios de Busca:
            #     CNPJ Sacado: {criterio_cnpj_sacado} 
            #     Número da Fatura: {criterio_id_fatura}

            #     Informações da Fatura:
            #     ID da Fatura: {fatura.get('id')}
            #     Data de Emissão: {fatura.get('data_emissao')} (Período: {criterio_inicio_emissao} até {criterio_final_emissao})
            #     Data de Vencimento: {fatura.get('vencimento')} (Período: {criterio_inicio_vencimento} até {criterio_final_vencimento})
            #     """)


    @staticmethod
    def atende_criterios(criterios, dados):
        """
        Verifica se os dados de uma fatura atendem aos critérios especificados.

        A função compara os valores de emissão, vencimento, ID da fatura e CNPJ do sacado
        com os critérios fornecidos e retorna True se os dados atenderem a todos os critérios,
        ou False caso contrário.

        Parâmetros:
        ----------
        criterios : dict
            Dicionário contendo os critérios de filtragem, com as seguintes chaves:
                - filtroDataInicioEmissaoFatura: Data de início do período de emissão.
                - filtroDataFinalEmissaoFatura: Data final do período de emissão.
                - filtroDataInicioVencimentoFatura: Data de início do período de vencimento.
                - filtroDataFinalVencimentoFatura: Data final do período de vencimento.
                - idFaturaBusca: ID da fatura a ser buscada.
                - cnpjRelatFaturaBuscaFatura: CNPJ do sacado a ser filtrado.

        dados : dict
            Dicionário contendo os dados da fatura, com as seguintes chaves:
                - data_emissao: Data de emissão da fatura.
                - vencimento: Data de vencimento da fatura.
                - id: ID da fatura.
                - sacado_fk_id: CNPJ do sacado (tomador) da fatura.

        Retorna:
        -------
        bool
            True se os dados atenderem aos critérios, False caso contrário.
        """

        # Convertendo os critérios de string para datetime, se aplicável
        criterio_inicio_emissao = criterio_inicio_emissao if isinstance(criterios.get('filtroDataInicioEmissaoFatura', None), datetime.date) else string_para_data(criterios.get('filtroDataInicioEmissaoFatura', None))
        criterio_final_emissao = criterio_final_emissao if isinstance(criterios.get('filtroDataFinalEmissaoFatura', None), datetime.date) else string_para_data(criterios.get('filtroDataFinalEmissaoFatura', None))
        criterio_inicio_vencimento = criterio_inicio_vencimento if isinstance(criterios.get('filtroDataInicioVencimentoFatura', None), datetime.date) else string_para_data(criterios.get('filtroDataInicioVencimentoFatura', None))
        criterio_final_vencimento = criterio_final_vencimento if isinstance(criterios.get('filtroDataFinalVencimentoFatura', None), datetime.date) else string_para_data(criterios.get('filtroDataFinalVencimentoFatura', None))
        criterio_id_fatura = criterios.get('idFaturaBusca', None)
        criterio_cnpj_sacado = criterios.get('cnpjRelatFaturaBuscaFatura', None)

        # Convertendo os dados da fatura de string para datetime
        dados_emissao = dados_emissao if isinstance(dados[0].get('data_emissao', None), datetime.date) else string_para_data(dados[0].get('data_emissao', None))
        dados_vencimento = dados_vencimento if isinstance(dados[0].get('vencimento', None), datetime.date) else string_para_data(dados[0].get('vencimento', None))
        dados_id_fatura = dados[0].get('id', None)
        dados_cnpj_sacado = dados[0].get('sacado_fk_id', None)


        # Verificando o período de emissão
        dprint(f'Criterio data emissão data inicial {criterio_inicio_emissao} data final {criterio_final_emissao} dado concreto {dados_emissao} ')

        if criterio_inicio_emissao and string_para_data(dados_emissao) < criterio_inicio_emissao:
            return False

        if criterio_final_emissao and dados_emissao > criterio_final_emissao:
            return False

        # # Verificando o período de vencimento
        if criterio_inicio_vencimento and dados_vencimento < criterio_inicio_vencimento:
            return False

        if criterio_final_vencimento and dados_vencimento > criterio_final_vencimento:  # Correção aqui
            return False

        # Verificando o ID da fatura
        if criterio_id_fatura and dados_id_fatura != criterio_id_fatura:  # Correção aqui
            return False

        # Verificando o CNPJ do sacado
        if criterio_cnpj_sacado and dados_cnpj_sacado != criterio_cnpj_sacado:  # Correção aqui
            return False

        return True
