from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete
from Classes.utils import dprint
import json

@login_required(login_url='/auth/entrar/')
def readTabelasGeraisPorRota (request):
    if request.method == 'GET':
        return JsonResponse({'status':300})
    elif request.method == "POST" :
        data = json.loads(request.body.decode('utf-8'))
        tabela=TabelaFrete()
        rotas=tabela.readTabelasGeraisPorRota(tabela.tabela)
        dprint(rotas)
        return JsonResponse({'status':200})