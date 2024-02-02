from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete 
import json


@login_required(login_url='/auth/entrar/')
def deleteTabela (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        data = json.loads(request.body.decode('utf-8'))
        tabela=TabelaFrete()

        if data['id']:
            resultado = tabela.deleteTabela(data['id'])
        else:
            resultado=tabela.deleteTabela(request.POST.get('idAdd'))
        if resultado:
            return JsonResponse({'status': 200}) 
        else:
            return JsonResponse({'status': 300}) 