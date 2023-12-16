from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from operacional.classes.rotas import Rota
import json

@login_required(login_url='/auth/entrar/')
def readRota (request):
    if request.method == 'GET':
        return JsonResponse({'status': 'rotas'})     
    elif request.method == "POST" :
        data = json.loads(request.body.decode('utf-8'))
        tblRotas=Rota()
        rota=tblRotas.readRota(data['idRota'])
        return JsonResponse({'status': rota,'rota':tblRotas.rota.to_dict()})     