from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json
from operacional.classes.cte import Cte
from Classes.utils import dprint

@login_required(login_url='/auth/entrar/')
def read_cte_by_dtc(request):
    if request.method == 'GET':
        return JsonResponse({'create': 'readDtc'})
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        cria_cte = Cte()
        
        cte = cria_cte.read(data['idDtc'])
        if cte is not None:
            return JsonResponse({'status':200,'cte': cte.to_dict()})
        else:
            return JsonResponse({'status':300,'msg': 'CTE not found or invalid'})

    