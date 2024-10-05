from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from faturamento.classes.FaturasManager import FaturasManager
from parceiros.classes.parceiros import Parceiros
from operacional.classes.emissores import EmissorManager
from operacional.classes.cte import Cte
from Classes.utils import str_to_date, to_float,dprint
import json
from datetime import datetime


@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def gerar_faturas(request):
    """
    Gera faturas com base nos dados enviados na requisição.

    A função processa a requisição para gerar faturas, filtrando as CTe's de acordo com
    as datas, CNPJ do parceiro e tipo de frete. Em seguida, cria faturas baseadas nos 
    dados filtrados e retorna uma lista de faturas geradas.

    Parâmetros:
    ----------
    request : HttpRequest
        O objeto da requisição HTTP.

    Retorna:
    -------
    JsonResponse
        Um objeto JSON contendo o status e a lista de faturas geradas.
    """
    dados_externos = json.loads(request.body.decode('utf-8'))

    dprint(dados_externos)
    data_filtro_inicial = dados_externos.get('dataInicio', None)
    data_filtro_final = dados_externos.get('dataFinal', None)
    cnpj_filtro = dados_externos.get('cnpjParceiroFaturamento', None)
    modalidade_frete = dados_externos.get('tipoFrete', None)

    # Obtém a data atual
    data_atual = datetime.now().date()
    emissor = EmissorManager.get_emissores_por_id(dados_externos.get('fatAutomaticoEmissor'))

    dados = {
        'data_emissao': data_atual,
        'emissor_fk': emissor,
        'vencimento': dados_externos.get('dataVencimento')
    }
    
    obj_ctes = FaturasManager()
    dtcs_com_cte_sem_fatura = obj_ctes.selecionar_dtc_com_cte_sem_fatura()

    ctes_sem_fatura = FaturasManager.obtem_ctes_sem_fatura(dtcs_com_cte_sem_fatura)

    dados_filtrados = filtrar_dados(
        ctes_sem_fatura,
        periodo_inicio=str_to_date(data_filtro_inicial),
        periodo_fim=str_to_date(data_filtro_final),
        filtro_sacado_fk_cnpj=cnpj_filtro,
        filtro_tipo_frete=modalidade_frete
    )

    ctes_agrupados_por_tomador = FaturasManager.agrupa_dtcs_por_tomador(dados_filtrados)

    pre_faturas = FaturasManager.criar_faturas(dados_externos, ctes_agrupados_por_tomador)

    lista_faturas = []
    for i, dados_da_fatura in enumerate(pre_faturas):
        cnpj_parceiro = dados_da_fatura.get('sacado_fk').get('cnpj_cpf')
        parceiro = Parceiros.read_parceiro(cnpj_parceiro)
        ctes = dados_da_fatura.get('cte')

        dados['valor_total'] = dados_da_fatura.get('valor_total')
        
        acrescimo = to_float(dados_da_fatura.get('acrescimo', 0.0))

        desconto = to_float(dados_da_fatura.get('desconto', 0.0)) if dados_da_fatura.get('desconto') not in ['', None] else 0.0

        dados['valor_a_pagar'] = float(dados_da_fatura.get('valor_total'))

        desconto_em_reais = 0
        acrescimo_em_reais = 0
        
        if desconto > 0.00:
            valor = calcula_porcentual(float(dados_da_fatura.get('valor_total')),desconto)
            dados['valor_a_pagar'] = float(dados['valor_a_pagar']) - valor
            desconto_em_reais = float(valor)
            # dprint(f'valor com desconto {dados['valor_a_pagar']},percentual de desconto {desconto} desconto em dh {desconto_em_reais} ')

        if acrescimo > 0.00: 
            valor = calcula_porcentual(float(dados_da_fatura.get('valor_total')),acrescimo)
            dados['valor_a_pagar'] = float(dados['valor_a_pagar']) + float(valor)
            acrescimo_em_reais = valor


        dados['sacado_id'] = parceiro
        dados['acrescimo_em_reais'] = acrescimo_em_reais
        dados['acrescimo'] = acrescimo
        dados['desconto'] = desconto
        dados['desconto_em_reais'] = desconto_em_reais

        
        fatura = FaturasManager()
        fatura.create_fatura(dados)

        dict_fatura = fatura.obj_fatura.to_dict()
        dict_fatura['cnpjTomador'] = cnpj_parceiro
        dict_fatura['qtdeDoctos'] = len(ctes)

        lista_faturas.append(dict_fatura)

        for lista_cte in ctes:
            new_cte = Cte.obtem_cte_id(lista_cte.get('cte'))
            Cte.adiciona_fatura_ao_cte(new_cte.id, fatura.obj_fatura)

    return JsonResponse({'status': 200, 'faturas': lista_faturas})


def calcula_porcentual(valor, porcentagem):
    return valor * (porcentagem / 100)


def filtrar_dados(ctes, periodo_inicio=None, periodo_fim=None, filtro_tipo_frete=None, filtro_sacado_fk_cnpj=None):
    """
    Filtra a lista de CTe's com base nos critérios fornecidos.

    A função itera sobre a lista de CTe's e aplica os filtros de período,
    tipo de frete e CNPJ do sacado. Retorna uma lista com os CTe's que
    atendem aos critérios.

    Parâmetros:
    ----------
    ctes : list
        Lista de CTe's a serem filtrados.
    periodo_inicio : datetime, opcional
        Data inicial para o filtro de cadastro dos CTe's.
    periodo_fim : datetime, opcional
        Data final para o filtro de cadastro dos CTe's.
    filtro_tipo_frete : int, opcional
        Tipo de frete a ser filtrado.
    filtro_sacado_fk_cnpj : str, opcional
        CNPJ do sacado (tomador) a ser filtrado.

    Retorna:
    -------
    list
        Lista de CTe's filtrados.
    """
    resultado = []

    for cte in ctes:
        # Extraindo a data de cadastro do CTe e convertendo para datetime
        data_cadastro = str_to_date(cte.get('data_cadastro'))

        # Extraindo o CNPJ do sacado (tomador)
        cnpj_sacado = cte.get('dtc_fk').get('tomador').get('cnpj_cpf')

        # Extraindo o tipo de frete
        modal_frete = cte.get('dtc_fk').get('tipoFrete')

        if filtro_tipo_frete == 0:
            if int(modal_frete) != int(filtro_tipo_frete):
                continue

        if filtro_sacado_fk_cnpj:
            if cnpj_sacado != filtro_sacado_fk_cnpj:
                continue

        if periodo_inicio:
            if data_cadastro < periodo_inicio:
                continue

        if periodo_fim:
            if data_cadastro > periodo_fim:
                continue
        
        resultado.append(cte)

    return resultado
