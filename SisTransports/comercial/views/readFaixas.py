from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete 
from comercial.classes.tblFaixa import TabelaFaixa

@login_required(login_url='/auth/entrar/')
def readFaixas (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        faixa=TabelaFaixa()
        faixas= faixa.readFaixas(request.POST.get('numTabela'))
        if faixas:
            faixas=[x.toDict() for x in faixa.readFaixas(request.POST.get('numTabela'))]
            return JsonResponse({'status': 200,'faixa':faixas}) 
        else:
            return JsonResponse({'status': 400}) 