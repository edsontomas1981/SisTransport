from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete
from Classes.utils import dprint 
import json

@login_required(login_url='/auth/entrar/')
def readTabelaId(request):
    if request.method == 'GET':
        return render(request, 'tabelaFrete.html')
    elif request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        tabela = TabelaFrete()
        tabela.readTabela(data['numTabela'])
        tabela.readFaixas(data['numTabela'])
        return JsonResponse({'status': 200, 'tabela': tabela.tabela.toDict(),
                            'faixas': tabela.tabela.listaFaixas if hasattr(tabela.tabela, 'listaFaixas') else None})

