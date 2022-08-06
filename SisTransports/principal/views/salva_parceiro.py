from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from parceiros.views.salva_parceiro import salva_parceiro as salvar
from enderecos.views.salva_end import salva_end
from django.contrib import messages
from django.contrib.messages import constants
from contatos.models.contato import Contatos
from contatos.models.contato import Tipo_contatos
from django.http import JsonResponse


@login_required(login_url='/auth/entrar/')
def salva_parceiro(request):
    if request.method == "GET" :
        return render(request,'./cadastroParceiros.html',)

    elif request.method == "POST" :
        if 'incluiContato' in request.POST:
            print(request.POST)
            contato=Contatos()
            tipo_contato=Tipo_contatos.objects.filter(id=1).get()
            contato.tipo=tipo_contato
            contato.fone_email_etc=request.POST.get('contato')
            contato.nome=request.POST.get('nome')       
            contato.cargo=request.POST.get('cargo')
            contato.envio=False
            contato.save()
            dados=[contato.to_dict()]
            return JsonResponse({'dados': dados})
        else:
            print(request.POST)
            return render(request,'./cadastroParceiros.html',)
