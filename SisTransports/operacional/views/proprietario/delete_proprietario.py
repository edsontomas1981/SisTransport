from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.utils import checaCampos
from operacional.classes.rotas import Rota

@login_required(login_url='/auth/entrar/')
def delete_proprietario (request):
    if request.method == 'GET':
        return JsonResponse({'status': 200,'dados':'delete prop'})
        # return render(request, 'preDtc.html')
    elif request.method == "POST" :
        return JsonResponse({'status': 200})