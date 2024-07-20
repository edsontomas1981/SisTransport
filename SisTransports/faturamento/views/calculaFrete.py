from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json
from faturamento.components.calculo import Calculo 

@login_required(login_url='/auth/entrar/')
def calculaFrete (request):
    if request.method == 'GET':
        return render(request, 'base.html')
    elif request.method == "POST" :
        data = json.loads(request.body.decode('utf-8'))
        calcular=Calculo(data)
        calcular.calcula()
        return JsonResponse({'status': 200,'frete':{}}) 