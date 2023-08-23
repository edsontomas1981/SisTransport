from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json
from operacional.classes.cte import Cte
from comercial.classes.tabelaFrete import TabelaFrete


@login_required(login_url='/auth/entrar/')
def create_frete_dtc (request):
    if request.method == 'GET':
        return JsonResponse({'create':'create'})
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        cte = Cte()
        tabela = TabelaFrete()
        tabela.readTabela(data['tabela_frete'])
        data['tabela_frete']=tabela.tabela
        cte.create(data)
        return JsonResponse({'create':'create'})