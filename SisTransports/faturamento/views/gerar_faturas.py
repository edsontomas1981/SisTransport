from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from faturamento.classes.FaturasManager import FaturasManager
from parceiros.classes.parceiros import Parceiros
from operacional.classes.emissores import EmissorManager
from operacional.classes.cte import Cte
from Classes.utils import dprint,converte_string_data,str_to_date
import json
from datetime import datetime



@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def gerar_faturas (request):
    dados_externos = json.loads(request.body.decode('utf-8'))
    data_filtro_inicial = dados_externos.get('dataInicio',None)
    data_filtro_final = dados_externos.get('dataFinal',None)
    cnpj_filtro = dados_externos.get('cnpjParceiroFaturamento',None)
    modalidade_frete = dados_externos.get('tipoFrete',None)


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
                                    filtro_sacado_fk_cnpj=cnpj_filtro,filtro_tipo_frete=modalidade_frete)

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
        print('-----------------------------------------------------------------')
        print('Fatura Nº : ' + str(1))
        print('Tomador : ' + str(emissor))
        print('Sacado : ' + str(sacado.get('raz_soc')))
        print('Dt Emissão : ' + str(dados.get('data_emissao')))
        print('Vencimento : ' + str(dados.get('vencimento')))
        print('Valor : ' + str(dados_da_fatura.get('valor_total')))
        print('Descontos : ' + str(dados_da_fatura.get('desconto')))
        print('Impostos : ' + str(dados_da_fatura.get('impostos')))
        print('Valor Total : ' + str(dados_da_fatura.get('valor_total')))
        print('Ctes : ' + str(ctes))

        lista_faturas.append(fatura.obj_fatura.to_dict())

        for cte in ctes:
            new_cte = Cte.obtem_cte_id(cte.get('cte'))
            Cte.adiciona_fatura_ao_cte(new_cte.id,fatura.obj_fatura)
            break

    return JsonResponse({'status': 200,'faturas':lista_faturas}) 

    
def filtrar_dados(ctes, periodo_inicio=None, periodo_fim=None, filtro_tipo_frete=None, filtro_sacado_fk_cnpj=None):
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
            if  cnpj_sacado != filtro_sacado_fk_cnpj:
                continue

        if periodo_inicio :
           if data_cadastro < periodo_inicio:
               continue
        
        if periodo_fim :
           if data_cadastro > periodo_fim:
               continue
        resultado.append(cte)

    return resultado


def prepara_dados_pre_fatura(ctes_agrupados_por_tomador):
    dados_pre_fatura = []
    for ctes_por_tomador in ctes_agrupados_por_tomador:
        for cte in ctes_agrupados_por_tomador.get(ctes_por_tomador):
            print(cte.get('data_cadastro'))

    return dados_pre_fatura



