from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.dtc import Dtc 
from Classes.coleta import Coleta
from Classes.utils import dprint
from operacional.models.dtc import Dtc as MdlDtc

@login_required(login_url='/auth/entrar/')
def updateColeta (request):
    if request.method == 'GET':
        return JsonResponse({'status': 'Update'}) #Cadastro efetuado com sucesso

    elif request.method == 'POST':
        return JsonResponse({'status': 200}) #Cadastro efetuado com sucesso
