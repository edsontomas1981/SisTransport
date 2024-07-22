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
        emissor = EmissorManager.get_emissores_por_cnpj('03211528000106')
        dprint(emissor.items)
        

    return JsonResponse({'status': pre_faturas}) 
