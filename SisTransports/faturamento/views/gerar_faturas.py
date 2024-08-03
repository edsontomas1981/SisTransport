from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from faturamento.classes.FaturasManager import FaturasManager
from parceiros.classes.parceiros import Parceiros
from operacional.classes.emissores import EmissorManager
from operacional.classes.cte import Cte
from Classes.utils import dprint,converte_string_data
import json
from datetime import datetime



@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def gerar_faturas (request):
    # data={'dataEmissao':'17/10/07','vencimento':'17/10/07'}
    dados_externos = json.loads(request.body.decode('utf-8'))
    

    print(dados_externos)

    data_filtro_inicial = dados_externos.get('dataInicio',None)
    data_filtro_final = dados_externos.get('dataFinal',None)
    cnpj_filtro = dados_externos.get('cnpjParceiroFaturamento',None)
    modalidade_frete = dados_externos.get('tipoFrete',None)

    dprint(data_filtro_inicial,data_filtro_final,cnpj_filtro,modalidade_frete)


    # Obtém a data atual
    data_atual = datetime.now().date() 
    emissor =EmissorManager.get_emissores_por_id(dados_externos.get('fatAutomaticoEmissor'))

    dados =  {'data_emissao':data_atual,
                'emissor_fk':emissor,
                'vencimento':dados_externos.get('dataVencimento')
             }
    
    obj_ctes = FaturasManager()
    dtcs_com_cte_sem_fatura = obj_ctes.selecionar_dtc_com_cte_sem_fatura()

    ctes_sem_fatura = FaturasManager.obtem_ctes_sem_fatura(dtcs_com_cte_sem_fatura)

    dados_filtrados = filtrar_dados(ctes_sem_fatura,periodo_inicio=str_to_date(data_filtro_inicial),periodo_fim=str_to_date(data_filtro_final),
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
        
        print('-----------------------------------------------------------------')
        print('Fatura Nº : ' + str(i+1))
        print('Tomador : ' + str(emissor))
        print('Sacado : ' + str(sacado.get('raz_soc')))
        print('Dt Emissão : ' + str(dados.get('data_emissao')))
        print('Vencimento : ' + str(dados.get('vencimento')))
        print('Valor : ' + str(dados_da_fatura.get('valor_total')))
        print('Descontos : ' + str(dados_da_fatura.get('desconto')))
        print('Impostos : ' + str(dados_da_fatura.get('impostos')))
        print('Valor Total : ' + str(dados_da_fatura.get('valor_total')))
        print('Ctes : ' + str(ctes))

        
    #     # fatura = FaturasManager()
    #     # fatura.create_fatura(dados)

    #     # lista_faturas.append(fatura.obj_fatura.to_dict())


    #     for cte in ctes:
    #         new_cte = Cte.obtem_cte_id(cte)
    #         print(new_cte.to_dict())
    #         break

    return JsonResponse({'status': 200}) 

def str_to_date(data_str):
    formatos = [
        "%Y-%m-%d %H:%M:%S",  # Formato que você está recebendo
        "%Y-%m-%d",
        "%d/%m/%Y",
        "%m/%d/%Y",
        "%d-%m-%Y",
        "%Y/%m/%d",
        "%Y.%m.%d",
        "%d.%m.%Y",
        "%d %b %Y",
        "%d %B %Y",
        "%Y-%m-%d %H:%M",
        "%d/%m/%Y %H:%M:%S",
        "%d/%m/%Y %H:%M",
        "%d-%m-%Y %H:%M:%S",
        "%d-%m-%Y %H:%M",
        "%Y/%m/%d %H:%M:%S",
        "%Y/%m/%d %H:%M",
        "%d.%m.%Y %H:%M:%S",
        "%d.%m.%Y %H:%M",
        "%d %b %Y %H:%M:%S",
        "%d %b %Y %H:%M",
        "%d %B %Y %H:%M:%S",
        "%d %B %Y %H:%M"
    ]
    
    for formato in formatos:
        try:
            return datetime.strptime(data_str, formato)
        except ValueError:
            continue
    return None
    
# Função para filtrar os dados
def filtrar_dados(ctes, periodo_inicio=None, periodo_fim=None, tipo_frete=None, sacado_fk_cnpj=None):
    
    resultado = []
    for cte in ctes:

        # Extraindo a data de emissão e convertendo
        data_emissao = str_to_date(cte.get('data_cadastro'))
        cnpj_sacado = cte.get('dtc_fk').get('tomador').get('cnpj_cpf')
        modal_frete = cte.get('dtc_fk').get('tipoFrete')

        # Filtro por CNPJ do sacado
        if sacado_fk_cnpj and cnpj_sacado != sacado_fk_cnpj:
            continue

        # Filtros por período
        if  periodo_inicio and data_emissao < periodo_inicio:
            continue
                
        if periodo_fim and data_emissao > periodo_fim:
            continue
        
        # Filtro por tipo de frete
        if tipo_frete != 0 and modal_frete != tipo_frete:
            continue

        resultado.append(cte)

    return resultado


def prepara_dados_pre_fatura(ctes_agrupados_por_tomador):
    dados_pre_fatura = []
    for ctes_por_tomador in ctes_agrupados_por_tomador:
        for cte in ctes_agrupados_por_tomador.get(ctes_por_tomador):
            print(cte.get('data_cadastro'))

    return dados_pre_fatura



