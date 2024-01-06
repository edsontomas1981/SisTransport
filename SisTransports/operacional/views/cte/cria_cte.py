from django.contrib.auth.decorators import login_required
import json
from operacional.classes.cte import Cte
from comercial.classes.tabelaFrete import TabelaFrete
from operacional.classes.dtc import Dtc
from django.http import JsonResponse, HttpResponseNotAllowed, HttpResponseServerError
from comercial.classes.cotacao import Cotacao
from Classes.utils import  dprint,toFloat,checkBox


@login_required(login_url='/auth/entrar/')
def create_cte(request):
    if request.method == 'POST':
        # try:
        data = json.loads(request.body.decode('utf-8'))
        cte = Cte()
        cte.obj_cte = cte.read(data['idDtc'])

        data['usuario_cadastro'] = request.user  

        if cte.obj_cte is not None:
            data = prepare_data_update(data, request.user)
            cte.update(data['idDtc'], data)
            if 'cotacao' in data:
                cotacao=Cotacao()
                cotacao.readCotacao(data['cotacao'])
                cotacao.adiciona_cte_cotacao(cte.obj_cte)

            return JsonResponse({'update': cte.obj_cte.to_dict(),'status':201})
        else:
            data = prepare_data_update(data, request.user)
            status = cria_cte(data)
            if 'cotacao' in data:
                cotacao=Cotacao()
                cotacao.readCotacao(data['cotacao'])
                cte=Cte()
                cte.obj_cte = cte.read(data['idDtc'])
                cotacao.adiciona_cte_cotacao(cte.obj_cte)
            # if status == 200:
            return JsonResponse({'status': 200})  # Created
            # else:
            #     return JsonResponse({'error': 'Falha ao gerar o cte', 'details': status}, status=400)  # Bad Request
        # except Exception as e:
        #     return JsonResponse({'error': 'Internal Server Error', 'details': str(e)}, status=500)  # Internal Server Error

    else:
        return HttpResponseNotAllowed(['GET'])



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
    cte.create_or_update(data)
    return cte.create_or_update(data)

def read_cte(data):
    cte = Cte()
    return cte.read(data['idDtc'])

