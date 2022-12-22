from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete 
from Classes.parceiros import Parceiros
from Classes.utils import dprint 

@login_required(login_url='/auth/entrar/')
def anexaParceiro (request):
    if request.method == 'GET':
        dprint("Parceiro Criado")
        return render(request, 'base.html')
    elif request.method == "POST" :
        tabela=TabelaFrete()
        #Carrega a tabela a ser anexada ao parceiro
        tabela.readTabela(request.POST.get('numTabela'))
        parceiro=Parceiros()
        parceiro.getParceiro(request.POST.get('cnpj_cpf'))
        tabela.anexaTabelaAoParceiro(parceiro)
        return JsonResponse({'status': 200,'tabela':tabela.toDict()}) 