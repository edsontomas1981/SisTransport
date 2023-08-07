from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete
from operacional.classes.rotas import Rota
from Classes.utils import dprint
import json

@login_required(login_url='/auth/entrar/')
def anexaTabelaRota (request):
    if request.method == 'GET':
        return JsonResponse({'status':300})
    elif request.method == "POST" :
        data = json.loads(request.body.decode('utf-8'))
        tabela=TabelaFrete()
        rota=Rota()
        rota.readRota(data['idRota'])
        tabela.readTabela(data['idTabela'])
        status=tabela.anexaRotasTabela(rota.rota)
        rotas=tabela.readTabelasGeraisPorRota()
        return JsonResponse({'status':status,'rotas':rotas})