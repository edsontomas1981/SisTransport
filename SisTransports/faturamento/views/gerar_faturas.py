from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from faturamento.classes.FaturasManager import FaturasManager
import json


@login_required(login_url='/auth/entrar/')
@require_http_methods(["GET"])
def gerar_faturas (request):
    # data = json.loads(request.body.decode('utf-8'))
    pre_faturas = FaturasManager.selecionar_dtc_com_cte_sem_fatura()
    for pre_fatura in pre_faturas:
        print(pre_fatura)
    return JsonResponse({'status': 200,'frete':{}}) 
