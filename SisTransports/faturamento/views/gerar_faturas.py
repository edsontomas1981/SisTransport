from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from faturamento.classes.FaturasManager import FaturasManager
from Classes.utils import dprint
import json


@login_required(login_url='/auth/entrar/')
@require_http_methods(["GET"])
def gerar_faturas (request):
    # data = json.loads(request.body.decode('utf-8'))
    pre_faturas = FaturasManager.selecionar_dtc_com_cte_sem_fatura()

    # dprint(pre_faturas)

    # for pre_fatura in pre_faturas:
    #     dprint(pre_faturas.get(pre_fatura))
        # for dtc in pre_faturas.get(pre_fatura):
        #     dprint(dtc.get('id'))

    return JsonResponse({'status': 200,'frete':{}}) 
