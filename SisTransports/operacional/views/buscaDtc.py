from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.dtc import Dtc 
from Classes.utils import dprint,dpprint
from comercial.classes.tabelaFrete import TabelaFrete
from comercial.classes.cotacao import Cotacao

@login_required(login_url='/auth/entrar/')
def buscaDtc (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        if request.POST.get('numPed')!='':
            dtc=Dtc()
            if dtc.readDtc(request.POST.get('numPed'))==200:
                tabela=TabelaFrete()
                tabelas=tabela.get_tabelas_por_parceiro(dtc.dtc.tomador_fk)
                cotacao = Cotacao()
                cot=cotacao.selectCotacaoByDtc(request.POST.get('numPed'))
                return JsonResponse({
                            'status': 200,
                            'dtc': dtc.to_dict() if dtc is not None else None,
                            'cotacao': cot['cotacao'],
                            'coleta': dtc.dtc.coleta_fk.to_dict() if dtc is not None and dtc.dtc.coleta_fk is not None else None,
                            'tabelas': tabelas                    
                        })
            else:
                return JsonResponse({'status': 300}) 
        else:
            return JsonResponse({'status': 300})
            