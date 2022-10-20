from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tblFaixa import TabelaFaixa
from Classes.tabelaFrete import TabelaFrete

@login_required(login_url='/auth/entrar/')
def createFaixa (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        tabela=TabelaFrete()
        tabela.readTabela(request.POST.get('numTabela'))
        faixa=TabelaFaixa()
        faixa.createFaixa(request.POST.get('numTabela'),1,100,1500.00)
        return JsonResponse({'status': 200}) 