from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete 
from Classes.parceiros import Parceiros
from Classes.utils import dprint 
import json
from comercial.classes.geraFrete import CalculaFrete



@login_required(login_url='/auth/entrar/')
def calculaFrete (request):
    if request.method == 'GET':
        return render(request, 'base.html')
    elif request.method == "POST" :
        data = json.loads(request.body.decode('utf-8'))
        dprint(data)
        tabela=TabelaFrete()
        tabela.readTabela(data['tabela'])
        calcular=CalculaFrete()
        if tabela.tabela.tipoCalculo == 2:
            calcular.calculaFrete(data,tabela.tabela)
        return JsonResponse({'status': 200}) 