from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete
from operacional.classes.rotas import Rota
from Classes.utils import dprint
import json

@login_required(login_url='/auth/entrar/')
def desanexaTabelaRota (request):
    if request.method == 'GET':
        return JsonResponse({'status':300})
    elif request.method == "POST" :
        data = json.loads(request.body.decode('utf-8'))
        tabela=TabelaFrete()
        tabela.readTabela(data['tabela'])
        tabela.desanexaTabelaRota(data['id'])
        rotas=tabela.readTabelasGeraisPorRota()
        return JsonResponse({'status':200,'rotas':rotas})