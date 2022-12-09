from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete
from Classes.utils import priComDest

@login_required(login_url='/auth/entrar/')
def readTabela (request):
    if request.method == 'GET':
        return render(request, 'tabelaFrete.html')
    elif request.method == "POST" :
        tabela=TabelaFrete()
        priComDest('lendo a tabela')
        tabela.readTabela(request.POST.get('numTabela'))
        priComDest("pegou a tabela")
        parceiros=tabela.cnpjVinculado()
        return JsonResponse({'status':200,'tabela':tabela.tabela.toDict(),
                             'parceirosVinculados':parceiros})
