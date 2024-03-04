from django.contrib.auth.decorators import login_required
import json
from operacional.classes.cte import Cte
from comercial.classes.tabelaFrete import TabelaFrete
from operacional.classes.dtc import Dtc
from django.http import JsonResponse, HttpResponseNotAllowed, HttpResponseServerError
from comercial.classes.cotacao import Cotacao
from Classes.utils import  dprint,toFloat,checkBox
from django.views.decorators.http import require_http_methods



@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def create_cte(request):
    try:
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

            print(status)
            if 'cotacao' in data:
                cotacao=Cotacao()
                cotacao.readCotacao(data['cotacao'])
                cte=Cte()
                cte.obj_cte = cte.read(data['idDtc'])
                cotacao.adiciona_cte_cotacao(cte.obj_cte)
                if status == 200:
                    return JsonResponse({'status': status})  # Created
                else:
                    return JsonResponse({'error': 'Falha ao gerar o cte', 'details': status}, status=400)  # Bad Request
            else:
                return JsonResponse({'status': status})  # Created


    except Exception as e:
        return JsonResponse({'error': 'Internal Server Error', 'details': str(e)}, status=500)  # Internal Server Error


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
    return 200

def read_cte(data):
    cte = Cte()
    return cte.read(data['idDtc'])

