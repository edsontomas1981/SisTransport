from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from parceiros.models.parceiros import Parceiros as MdlParceiros
from Classes.utils import dprint
from parceiros.classes.parceiros import Parceiros


@login_required(login_url='/auth/entrar/')
def readParceiro(request):
    if request.method == 'GET':
        return JsonResponse({'status': 200}) 
    elif request.method == "POST" :
        parceiro=Parceiros()
        parceiro.readParceiro(request.POST.get('cnpjMdl'))
        dprint(parceiro.parceiro.listaContatos)
        return JsonResponse({'status': 200,'parceiro':parceiro.parceiro.to_dict(),'contatos':parceiro.parceiro.listaContatos}) 
    