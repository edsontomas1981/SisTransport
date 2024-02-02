from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete
from Classes.utils import dprint 
import json

@login_required(login_url='/auth/entrar/')
def readTabela (request):
    if request.method == 'GET':
        return render(request, 'tabelaFrete.html')
    elif request.method == "POST" :
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        tabela=TabelaFrete()
        if data['id']:
            resultado = tabela.readTabela(data['id'])
            parceiro=tabela.selecionaTabCnpj()
            rotas=tabela.readTabelasGeraisPorRota()
        else:
            resultado = tabela.readTabela(request.POST.get('numTabela'))
            parceiro=tabela.selecionaTabCnpj()
            rotas=tabela.readTabelasGeraisPorRota()
        if resultado:
            return JsonResponse({'status':200,'tabela':tabela.tabela.toDict(),
                                'rotas':rotas,'parceirosVinculados':parceiro})
        else:
            return JsonResponse({'status':300})

