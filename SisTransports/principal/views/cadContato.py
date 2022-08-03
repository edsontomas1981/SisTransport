from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from parceiros.views.salva_parceiro import salva_parceiro as salvar
from enderecos.views.salva_end import salva_end
from django.contrib import messages
from django.contrib.messages import constants
from django.http import JsonResponse
from contatos.models import Contatos,Tipo_contatos

def cad_contato(request):
    if request.method == 'GET':
        return render(request, 'cadContato.html')
    elif request.method == 'POST':
        contato=Contatos()
        #tipo=Tipo_contatos.objects.get(descricao_contato=request.POST['tipo'])
        contato.nome=request.POST['nome']
        contato.fone_email_etc=request.POST['fone_email_etc']
        #contato.envio=request.POST['envio']
        dados=contato.to_dict()        
        print('==================================================================')
        print(dados)
        return JsonResponse(dados)


    