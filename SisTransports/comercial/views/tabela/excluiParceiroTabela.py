from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete 
from Classes.parceiros import Parceiros

@login_required(login_url='/auth/entrar/')
def excluiParceiroTabela (request):
    if request.method == 'GET':
        return render(request, 'base.html')
    elif request.method == "POST" :
        if request.POST.get('numTabela') and request.POST.get('idParceiro'):
            tabela=TabelaFrete()
            tabela.readTabela(request.POST.get('numTabela'))
            if tabela.desvincularCnpjTabela(request.POST.get('idParceiro')):
                parceiro=tabela.selecionaTabCnpj()
                return JsonResponse({'status': 200,'tabela':tabela.toDict(),
                                    'parceirosVinculados':parceiro}) 
            else:
                return JsonResponse({'status': 400}) 
        else:
            return JsonResponse({'status': 500})