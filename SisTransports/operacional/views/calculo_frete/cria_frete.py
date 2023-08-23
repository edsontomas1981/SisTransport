from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json
from operacional.classes.cte import Cte
from comercial.classes.tabelaFrete import TabelaFrete
from operacional.classes.dtc import Dtc

@login_required(login_url='/auth/entrar/')
def create_frete_dtc(request):
    if request.method == 'GET':
        return JsonResponse({'create': 'create'})
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        data = prepare_data(data, request.user)
        status = create_cte(data)
        
        return JsonResponse({'create': status})

def prepare_data(data, user):
    tabela = TabelaFrete()
    tabela.readTabela(data['tabela_frete'])
    data['tabela_frete'] = tabela.tabela

    dtc = Dtc()
    dtc.readDtc(data['idDtc'])
    data['dtc_fk'] = dtc.dtc

    data['usuario_cadastro'] = user
    
    return data

def create_cte(data):
    cte = Cte()
    return cte.create(data)
