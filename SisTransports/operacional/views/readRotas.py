from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from operacional.classes.rotas import Rota

@login_required(login_url='/auth/entrar/')
def readRotas (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')

    elif request.method == "POST" :
        tblRotas=Rota()
        rotas=tblRotas.readRotas()
        return JsonResponse({'status': 200,'rotas':rotas})     
    
    