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


@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def gerar_faturas (request):
    data={'dataEmissao':'17/10/07','vencimento':'17/10/07'}
    # data = json.loads(request.body.decode('utf-8'))
    emissor = "data.get('emissor')"
    dados = {'emissor_fk':emissor}

    pre_faturas = FaturasManager.selecionar_dtc_com_cte_sem_fatura(dados)

    lista_faturas = []
    for i,dados_da_fatura in enumerate(pre_faturas):
        parceiro = Parceiros.read_parceiro(dados_da_fatura.get('sacado_fk').get('cnpj_cpf'))
        emissor = EmissorManager.get_emissores_por_cnpj_obj('23926683000109')
        ctes = dados_da_fatura.get('cte')
        sacado = dados_da_fatura.get('sacado_fk')

        # print('-----------------------------------------------------------------')
        # print('Fatura Nº : ' + str(i+1))
        # print('Tomador : ' + str(emissor.get('id')))
        # print('Sacado : ' + str(sacado.get('id')))
        # print('Dt Emissão : ' + str(dados_da_fatura.get('data_emissao')))
        # print('Vencimento : ' + str(dados_da_fatura.get('vencimento')))
        # print('Valor : ' + str(dados_da_fatura.get('valor_total')))
        # print('Descontos : ' + str(dados_da_fatura.get('desconto')))
        # print('Impostos : ' + str(dados_da_fatura.get('impostos')))
        # print('Valor Total : ' + str(dados_da_fatura.get('valor_total')))

        dados={'emissor_id':emissor,
               'sacado_id':parceiro,
               'data_emissao':converte_string_data(data.get('dataEmissao','17/10/07')),
               'vencimento':converte_string_data(data.get('vencimento','17/10/07')),
               'valor_total':dados_da_fatura.get('valor_total'),
               'valor_a_pagar':float(dados_da_fatura.get('valor_total'))-float(dados_da_fatura.get('desconto')),
               'desconto':dados_da_fatura.get('desconto'),
               }
        
        # fatura = FaturasManager()
        # fatura.create_fatura(dados)

        # lista_faturas.append(fatura.obj_fatura.to_dict())


        # for cte in ctes:
        #     print(str(Cte.obtem_cte_id(cte)))
        
        # print('observacoes')
        # print(dados_da_fatura.get('observacoes','Sem Observações'))
        
    return JsonResponse({'status': 200,'faturas':lista_faturas}) 
