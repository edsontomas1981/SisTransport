from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from parceiros.views.salva_parceiro import salva_parceiro as salvar
from enderecos.views.salva_end import salva_end
from django.contrib import messages
from django.contrib.messages import constants

@login_required(login_url='/auth/entrar/')
def salva_parceiro(request):

    if request.method == "GET" :
        return render(request,'./parceiros.html',)
    elif request.method == "POST" :
        endereco=salva_end(request.POST.get('cep'),request.POST.get('rua'),request.POST.get('numero'),
                           request.POST.get('complemento'),request.POST.get('bairro'),
                           request.POST.get('cidade'),request.POST.get('uf'))

        parceiro=salvar(request.POST.get('cnpj_cpf'),request.POST.get('nome_razao'),
                        request.POST.get('nome_fantasia'),request.POST.get('insc_est'),
                        request.POST.get('observacao'),endereco)

        messages.add_message(request,constants.SUCCESS,'Usuário cadastrado com sucesso !')
                                
        return redirect('/cadParceiros/')