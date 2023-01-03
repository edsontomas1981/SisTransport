from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete 
from comercial.classes.tblFaixa import TabelaFaixa
from Classes.utils import dprint,toFloat


@login_required(login_url='/auth/entrar/')
def updateFaixa (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        faixa=TabelaFaixa()
        if faixa.readFaixa(request.POST.get('idFaixa')):
            faixa.updateFaixa(toFloat(request.POST.get('faixaValor')))
            faixas=[x.toDict() for x in faixa.readFaixas(faixa.faixa.tblVinculada) ]
            return JsonResponse({'status': 200,'faixa':faixas}) 
        else:
            return JsonResponse({'status': 500}) 