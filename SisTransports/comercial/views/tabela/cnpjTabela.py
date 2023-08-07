from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete 
from Classes.parceiros import Parceiros
from Classes.utils import dprint 

@login_required(login_url='/auth/entrar/')
def cnpjTabela (request):
    if request.method == 'GET':
        return render(request, 'base.html')
    elif request.method == "POST" :
        tabela=TabelaFrete()
        tabela.readTabela(request.POST.get('numTabela'))
        tabela.anexaTabelaAoParceiro(request.POST.get('cnpj_cpf'))
        parceiro=tabela.selecionaTabCnpj()
        return JsonResponse({'status': 200,'tabela':tabela.toDict(),
                             'parceirosVinculados':parceiro}) 
        