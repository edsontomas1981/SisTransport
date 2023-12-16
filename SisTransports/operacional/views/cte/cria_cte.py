from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json
from operacional.classes.cte import Cte
from comercial.classes.tabelaFrete import TabelaFrete
from operacional.classes.dtc import Dtc

@login_required(login_url='/auth/entrar/')
def create_cte(request):
    if request.method == 'GET':
        return JsonResponse({'create': 'create'})
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        cte = Cte()
        cte.read(data['idDtc'])

        if cte.obj_cte.id:
            data=prepare_data_update(data,request.user)
            cte.update(data['idDtc'],data)
            return JsonResponse({'create': cte.obj_cte.to_dict()})
        else:
            data = prepare_data(data, request.user)
            status = cria_cte(data)
            return JsonResponse({'create': status})

def prepare_data(data, user):
    tabela = TabelaFrete()

    if 'tabela_frete' in data:
        if data['tabela_frete'] == '0':
            data['tabela_frete'] = None
        else:
            tabela.readTabela(data['tabela_frete'])
            data['tabela_frete'] = tabela.tabela
    else:
        data['tabela_frete'] = None

    dtc = Dtc()
    dtc.readDtc(data['idDtc'])
    data['dtc_fk'] = dtc.dtc

    data['usuario_cadastro'] = user
    
    return data

def prepare_data_update(data, user):
    tabela = TabelaFrete()

    if 'tabela_frete' in data:
        if data['tabela_frete'] == '0':
            data['tabela_frete'] = None
        else:
            tabela.readTabela(data['tabela_frete'])
            data['tabela_frete'] = tabela.tabela
    else:
        data['tabela_frete'] = None

    dtc = Dtc()
    dtc.readDtc(data['idDtc'])
    data['dtc_fk'] = dtc.dtc

    data['usuario_cadastro'] = user
    
    return data

def cria_cte(data):
    cte = Cte()
    return cte.create_or_update(data)

def read_cte(data):
    cte = Cte()
    return cte.read(data['idDtc'])

