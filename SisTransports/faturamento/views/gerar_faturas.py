from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from faturamento.classes.FaturasManager import FaturasManager
from parceiros.classes.parceiros import Parceiros
from operacional.classes.emissores import EmissorManager
from operacional.classes.cte import Cte
from Classes.utils import dprint,str_to_date,transformar_data
import json
from datetime import datetime



@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def gerar_faturas (request):
    dados_externos = json.loads(request.body.decode('utf-8'))

    data_filtro_inicial = transformar_data(dados_externos.get('dataInicio'))
    data_filtro_final = transformar_data(dados_externos.get('dataFinal'))
    cnpj_filtro = dados_externos.get('cnpjParceiroFaturamento',None)

    modalidade_frete = int(dados_externos.get('tipoFrete')) if int(dados_externos.get('tipoFrete')) != 0 else None

    # Obtém a data atual
    data_atual = datetime.now().date() 
    emissor =EmissorManager.get_emissores_por_id(dados_externos.get('fatAutomaticoEmissor'))

    dados =  {'data_emissao':data_atual,
                'emissor_fk':emissor,
                'vencimento':str_to_date(dados_externos.get('dataVencimento'))
             }
    
    obj_ctes = FaturasManager()
    dtcs_com_cte_sem_fatura = obj_ctes.selecionar_dtc_com_cte_sem_fatura()

    ctes_sem_fatura = FaturasManager.obtem_ctes_sem_fatura(dtcs_com_cte_sem_fatura)

    dados_filtrados = filtrar_dados(ctes_sem_fatura,periodo_inicio=data_filtro_inicial,periodo_fim=data_filtro_final,
                                    sacado_fk_cnpj=cnpj_filtro,tipo_frete=modalidade_frete)
    

    ctes_agrupados_por_tomador =  FaturasManager.agrupa_dtcs_por_tomador(dados_filtrados)


    pre_faturas = FaturasManager.criar_faturas(dados_externos,ctes_agrupados_por_tomador)

    lista_faturas = []
    for i,dados_da_fatura in enumerate(pre_faturas):
        parceiro = Parceiros.read_parceiro(dados_da_fatura.get('sacado_fk').get('cnpj_cpf'))
        ctes = dados_da_fatura.get('cte')
        sacado = dados_da_fatura.get('sacado_fk')

        dados['valor_total']=dados_da_fatura.get('valor_total')
        dados['valor_a_pagar']=float(dados_da_fatura.get('valor_total'))-float(dados_da_fatura.get('desconto',0.00))
        
        fatura = FaturasManager()
        fatura.create_fatura(dados)

        lista_faturas.append(fatura.obj_fatura.to_dict())

        dprint(ctes)

        for cte in ctes:
            new_cte = Cte.obtem_cte_id(cte.get('cte'))
            new_cte.faturas_fk = fatura.obj_fatura
            new_cte.save()

    return JsonResponse({'status': 200}) 

def filtrar_dados(ctes, periodo_inicio=None, periodo_fim=None, tipo_frete=None, sacado_fk_cnpj=None):
    """
    Filtra uma lista de CTes com base nos critérios fornecidos.

    Args:
        ctes (list): Lista de dicionários, cada um representando um CTe.
        periodo_inicio (datetime, opcional): Data de início do período para filtragem.
        periodo_fim (datetime, opcional): Data de fim do período para filtragem.
        tipo_frete (str, opcional): Tipo de frete para filtragem.
        sacado_fk_cnpj (str, opcional): CNPJ do sacado para filtragem.

    Returns:
        list: Lista de CTes filtrados de acordo com os critérios fornecidos.
    """
    resultado = []
    for cte in ctes:
        data_emissao = str_to_date(cte.get('data_cadastro'))
        cnpj_sacado = cte.get('dtc_fk').get('tomador').get('cnpj_cpf')
        modal_frete = cte.get('dtc_fk').get('tipoFrete')

        if periodo_inicio and data_emissao < periodo_inicio:
            continue
        if periodo_fim and data_emissao > periodo_fim:
            continue
        if tipo_frete and modal_frete != tipo_frete:
            continue
        if sacado_fk_cnpj and cnpj_sacado != sacado_fk_cnpj:
            continue

        resultado.append(cte)

    return resultado




