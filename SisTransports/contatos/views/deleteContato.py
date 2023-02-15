from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from Classes.utils import dprint
from contatos.classes.contato import Contato



@login_required(login_url='/auth/entrar/')
def deleteContato(request):
    if request.method == 'GET':
        return JsonResponse({'status': 200}) 
    elif request.method == "POST" :
        contato=Contato()
        contato.excluiContato(request.POST.get('idContato'))
        return JsonResponse({'status': 200}) 