from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.dtc import Dtc
from Classes.utils import dprint, dpprint
from comercial.classes.tabelaFrete import TabelaFrete
from comercial.classes.cotacao import Cotacao
from operacional.classes.nota_fiscal import Nota_fiscal_CRUD
from operacional.classes.cte import Cte

@login_required(login_url='/auth/entrar/')
def buscaDtc(request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    
    elif request.method == "POST":
        numPed = request.POST.get('numPed')
        if numPed:
            dtc = Dtc()
            if dtc.readDtc(numPed) == 200:
                return processa_requisicao_dtc(request, dtc)
            else:
                return JsonResponse({'status': 300})
        else:
            return JsonResponse({'status': 300})

def processa_requisicao_dtc(request, dtc):
    tabelas = carrega_tabela(dtc)
    cot = carrega_cotacao(request)
    notas_fiscais = Nota_fiscal_CRUD()
    cte = carrega_cte(request)
    cte_dict = cte.to_dict() if cte else None  # Verifica se cte é None antes de chamar to_dict()
    return JsonResponse({
        'status': 200,
        'dtc': dtc.to_dict() if dtc else None,
        'cotacao': cot['cotacao'],
        'coleta': dtc.dtc.coleta_fk.to_dict() if dtc and dtc.dtc.coleta_fk else None,
        'notasFiscais': notas_fiscais.carrega_nfs(dtc.dtc.id) if dtc else None,
        'cte': cte_dict,
        'tabelas': tabelas
    })


def carrega_cte(request):
    cte = Cte()
    return cte.read(request.POST.get('numPed'))

def carrega_tabela(dtc):
    tabela = TabelaFrete()
    return tabela.get_tabelas_por_parceiro(dtc.dtc.tomador_fk)

def carrega_cotacao(request):
    cotacao = Cotacao()
    return cotacao.selectCotacaoByDtc(request.POST.get('numPed'))