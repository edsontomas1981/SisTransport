from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete
from parceiros.classes.parceiros import Parceiros
from Classes.utils import dprint
import json 

@login_required(login_url='/auth/entrar/')
def readTabelasPorParceiro (request):
    if request.method == 'GET':
        return JsonResponse({'status': 200}) 
    elif request.method == "POST" :
        data = json.loads(request.body.decode('utf-8'))
        parceiro=Parceiros()
        parceiro.readParceiro(data['tomador'])
        tabelas=TabelaFrete()
        tabelas.get_tabelas_por_parceiro()
        return JsonResponse({'status': 200}) 