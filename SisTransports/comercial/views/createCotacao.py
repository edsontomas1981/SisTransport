from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete 
from parceiros.classes.parceiros import Parceiros
from Classes.utils import dprint 

@login_required(login_url='/auth/entrar/')
def createCotacao (request):
    if request.method == 'GET':
        return JsonResponse({'status': 200})     
    elif request.method == "POST" :
        tabelas=TabelaFrete()
        parceiro=Parceiros()
        parceiro.readParceiro(request.POST.get('id'))
        dprint(tabelas.readTabelas(parceiro.parceiro))
        return JsonResponse({'status': 200,
                             'tabelas':tabelas.readTabelas(parceiro.parceiro)})         
