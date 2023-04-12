from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete 
from parceiros.classes.parceiros import Parceiros
from Classes.utils import dprint 
import json

@login_required(login_url='/auth/entrar/')
def createCotacao (request):
    if request.method == 'GET':
        return JsonResponse({'status': 200})     
    elif request.method == "POST" :
        data = json.loads(request.body.decode('utf-8'))
        return JsonResponse({'status': 200})         
