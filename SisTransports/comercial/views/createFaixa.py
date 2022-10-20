from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tblFaixa import TabelaFaixa
from comercial.classes.tabelaFrete import TabelaFrete as ClasseFrete

@login_required(login_url='/auth/entrar/')
def createFaixa (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')   
    elif request.method == "POST" :
        tabela=ClasseFrete()
        tabela.readTabela(request.POST.get('numTabela'))
        # tabela=TabelaFrete.objects.filter(id=request.POST.get('numTabela')).get()
        faixa=TabelaFaixa()
        faixa.createFaixa(tabela.tabela,request.POST.get('faixaInicial'),request.POST.get('faixaFinal'),
                          request.POST.get('faixaValor'))
        return JsonResponse({'status': 200,'faixa':faixa.faixa.toDict()})    