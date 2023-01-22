from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete 
from Classes.parceiros import Parceiros
from Classes.utils import dprint 

@login_required(login_url='/auth/entrar/')
def faturamento (request):
    if request.method == 'GET':
        return JsonResponse({'status': 200})    
    elif request.method == "POST" :
        return JsonResponse({'status': 200}) 