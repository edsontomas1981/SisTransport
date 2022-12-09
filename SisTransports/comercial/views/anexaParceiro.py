from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete 
from Classes.parceiros import Parceiros
from Classes.utils import priComDest as imprimiComDestaque

@login_required(login_url='/auth/entrar/')
def anexaParceiro (request):
    if request.method == 'GET':
        imprimiComDestaque("Parceiro Criado")

        return render(request, 'base.html')
    elif request.method == "POST" :
        imprimiComDestaque("Parceiro Criado")
        tabela=TabelaFrete()
        #Carrega a tabela a ser anexada ao parceiro
        tabela.readTabela(request.POST.get('numTabela'))
        parceiro=Parceiros()
        parceiro.createParceiro(request.POST.get('cnpj_cpf'))
        tabela.anexaTabelaAoParceiro(parceiro,tabela.tabela.id)
        return JsonResponse({'status': 200,'tabela':tabela.toDict()}) 