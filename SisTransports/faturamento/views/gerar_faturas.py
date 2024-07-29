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
@require_http_methods(["POST"])
def gerar_faturas (request):
    # data={'dataEmissao':'17/10/07','vencimento':'17/10/07'}
    data = json.loads(request.body.decode('utf-8'))
    # Obtém a data atual
    data_atual = datetime.now().date() 
    emissor =EmissorManager.get_emissores_por_id(data.get('fatAutomaticoEmissor'))

    dados =  {'data_emissao':data_atual,
                'emissor_fk':emissor,
                'vencimento':data.get('dataVencimento')
                    }
    pre_faturas = FaturasManager.selecionar_dtc_com_cte_sem_fatura(dados)

    dprint(filtrar_dados(pre_faturas,periodo_inicio=str_to_date('15/02/2024'),periodo_fim=str_to_date('25/02/2024')))

    lista_faturas = []
    for i,dados_da_fatura in enumerate(pre_faturas):
        parceiro = Parceiros.read_parceiro(dados_da_fatura.get('sacado_fk').get('cnpj_cpf'))
        ctes = dados_da_fatura.get('cte')
        sacado = dados_da_fatura.get('sacado_fk')

        dados['valor_total']=dados_da_fatura.get('valor_total')
        dados['valor_a_pagar']=float(dados_da_fatura.get('valor_total'))-float(dados_da_fatura.get('desconto'))
        
        print('-----------------------------------------------------------------')
        print('Fatura Nº : ' + str(i+1))
        print('Tomador : ' + str(emissor))
        print('Sacado : ' + str(sacado.get('id')))
        print('Dt Emissão : ' + str(dados.get('data_emissao')))
        print('Vencimento : ' + str(dados.get('vencimento')))
        print('Valor : ' + str(dados_da_fatura.get('valor_total')))
        print('Descontos : ' + str(dados_da_fatura.get('desconto')))
        print('Impostos : ' + str(dados_da_fatura.get('impostos')))
        print('Valor Total : ' + str(dados_da_fatura.get('valor_total')))
        
        # fatura = FaturasManager()
        # fatura.create_fatura(dados)

        # lista_faturas.append(fatura.obj_fatura.to_dict())


        # for cte in ctes:
        #     print(str(Cte.obtem_cte_id(cte)))
        
        # print('observacoes')
        # print(dados_da_fatura.get('observacoes','Sem Observações'))
        
    return JsonResponse({'status': 200,'faturas':lista_faturas}) 

# def prepareData (data):
#     return {'emissor_id':EmissorManager.get_emissores_por_id(data.get('fatAutomaticoEmissor')),
#                'sacado_id':Parceiros.read_parceiro(data.get('cnpjParceiroFaturamento')),
#                'data_emissao':converte_string_data(data.get('dataEmissao','17/10/07')),
#                'vencimento':converte_string_data(data.get('dataVencimento','17/10/07')),
#                'valor_total':dados_da_fatura.get('valor_total',0.00),
#                'valor_a_pagar':float(dados_da_fatura.get('valor_total'))-float(dados_da_fatura.get('desconto')),
#                'desconto':dados_da_fatura.get('desconto'),
#                }


# Função para converter string de data para objeto datetime
def str_to_date(date_str):
    try:
        dprint(date_str)
        return datetime.strptime(date_str, '%d/%m/%y')
    except ValueError:
        return None
    
# Função para filtrar os dados
def filtrar_dados(dados, periodo_inicio=None, periodo_fim=None, sacado=None, tipo_frete=None, sacado_fk_cnpj=None):
    resultado = []
    
    for item in dados:
        print(item.get('dt_emissao_cte'))
        data_emissao = str_to_date(item.get('dt_emissao_cte'))
        
        if periodo_inicio and data_emissao and data_emissao < periodo_inicio:
            continue
        if periodo_fim and data_emissao and data_emissao > periodo_fim:
            continue
        if sacado and sacado.lower() not in item.get('sacado_fk', {}).get('raz_soc', '').lower():
            continue
        if tipo_frete and item.get('tipo_frete') != tipo_frete:
            continue
        if sacado_fk_cnpj and item.get('sacado_fk_cnpj') != sacado_fk_cnpj:
            continue
        
        resultado.append(item)
    
    return resultado
