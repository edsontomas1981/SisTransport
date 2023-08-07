from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.dtc import Dtc 
from operacional.classes.coleta import Coleta
from Classes.utils import dprint,dpprint,checaCamposJson
from operacional.models.dtc import Dtc as MdlDtc
import json


@login_required(login_url='/auth/entrar/')
def createColeta (request):
    if request.method == 'GET':
        return JsonResponse({'status': "create"}) #Cadastro efetuado com sucesso
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        camposVazios=checaCamposJson(data,peso='Peso',valor="Valor em R$",
                              horario="Horário",cep="Cep",rua="Rua",cidade="Cidade",
                              uf="Uf",numero="Número",nomeContato="Nome do contato",
                              numeroContato="Numero para contato")
        if len(camposVazios)==0:
            coleta=Coleta()
            status=coleta.createColeta(data)
            return JsonResponse({'status':status}) #Cadastro efetuado com sucesso
        else:
            return JsonResponse({'status':300,'camposVazios':camposVazios}) #Cadastro efetuado com sucesso
