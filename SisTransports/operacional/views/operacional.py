from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from operacional.models.dtc import Dtc as MdlDtc

@login_required(login_url='/auth/entrar/')
def operacional (request):
    if request.method == 'GET':
        return JsonResponse({'status': 'operacional'}) #Cadastro efetuado com sucesso

    elif request.method == 'POST':
        return JsonResponse({'status': 200}) #Cadastro efetuado com sucesso