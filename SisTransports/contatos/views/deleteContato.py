from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from Classes.utils import dprint
from contatos.classes.contato import Contato
from parceiros.classes.parceiros import Parceiros


@login_required(login_url='/auth/entrar/')
def deleteContato(request):
    if request.method == 'GET':
        return JsonResponse({'status': 200}) 
    elif request.method == "POST" :
        contato=Contato()
        contato.excluiContato(request.POST.get('idContato'))

        parceiro=Parceiros()
        parceiro.readParceiro(request.POST.get('cnpjMdl'))
        listaContatos=contato.readContatos(parceiro.parceiro.id)
        return JsonResponse({'status': 200,'listaContatos':listaContatos}) 