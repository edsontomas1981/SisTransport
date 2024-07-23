from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from faturamento.classes.FaturasManager import FaturasManager
from parceiros.classes.parceiros import Parceiros
from operacional.classes.emissores import EmissorManager
from operacional.classes.cte import Cte
from Classes.utils import dprint
import json


@login_required(login_url='/auth/entrar/')
@require_http_methods(["GET"])
def gerar_faturas (request):
    # data = json.loads(request.body.decode('utf-8'))
    emissor = "data.get('emissor')"
    dados = {'emissor_fk':emissor}

    pre_faturas = FaturasManager.selecionar_dtc_com_cte_sem_fatura(dados)

    for i,fatura in enumerate(pre_faturas):
        parceiro = Parceiros.read_parceiro(fatura.get('sacado_fk').get('cnpj_cpf'))
        emissor = EmissorManager.get_emissores_por_cnpj('23926683000109')
        ctes = fatura.get('cte')
        sacado = fatura.get('sacado_fk').get('raz_soc')

        print('-----------------------------------------------------------------')
        print('Fatura Nº : ' + str(i+1))
        print('Tomador : ' + emissor.get('razao'))
        print('Sacado : ' + sacado)
        print('Dt Emissão : ' + str(fatura.get('data_emissao')))
        print('Vencimento : ' + str(fatura.get('vencimento')))
        print('Valor : ' + str(fatura.get('valor_total')))
        print('Descontos : ' + str(fatura.get('desconto')))
        print('Impostos : ' + str(fatura.get('impostos')))
        print('Valor Total : ' + str(fatura.get('valor_total')))


        for cte in ctes:
            print(str(Cte.obtem_cte_id(cte)))
        
        print('observacoes')
        print(fatura.get('observacoes','Sem Observações'))
        

        
        

    return JsonResponse({'status': pre_faturas}) 
