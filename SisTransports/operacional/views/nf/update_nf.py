from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.dtc import Dtc 
from Classes.utils import dprint,dpprint,checaCamposJson
from operacional.models.dtc import Dtc as MdlDtc
import json


@login_required(login_url='/auth/entrar/')
def update_nf (request):
    if request.method == 'GET':
        return JsonResponse({'status': "update"}) #Cadastro efetuado com sucesso
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        return JsonResponse({'status':300}) #Cadastro efetuado com sucesso