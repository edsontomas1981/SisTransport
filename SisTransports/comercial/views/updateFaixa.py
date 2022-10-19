from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.tabelaFrete import TabelaFrete 


@login_required(login_url='/auth/entrar/')
def updateFaixa (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        tabela=TabelaFrete()
        print(tabela.deleteTabela(request.POST.get('idAdd')))
        return JsonResponse({'status': 200}) 