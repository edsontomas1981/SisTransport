from django.shortcuts import render,redirect
from usuarios.models import Usuarios
from django.contrib import messages
from django.contrib.messages import constants
from Classes.senha import Senha

def registrar_usuario(request):
    if request.method == "GET" :
        if not request.user.is_authenticated:
            return render(request,'register.html',)
        else: 
            return redirect('/')
    elif request.method == 'POST':
        username = request.POST.get('nome')
        email = request.POST.get('email')
        senha = request.POST.get('senha')
        conf_senha = request.POST.get('conf_senha')
        status_senha,mensagem_erro=Senha.valida_senha(senha,conf_senha)

        if status_senha:
            user = Usuarios.objects.filter(username=username)
            if user.exists():
                messages.add_message(request,constants.ERROR,'Usuário já cadastrado')
                redirect('/')
            else:
                try:
                    user = Usuarios.objects.create_user(username=username,
                                email=email,
                                password=senha,
                                )
                    user.save()
                    messages.add_message(request,constants.SUCCESS,'Usuário cadastrado com sucesso !')
                    return redirect('/auth/entrar')
                except:
                    messages.add_message(request,constants.ERROR,'Erro interno')
                    return redirect('/auth/registrar/')
        else:
            messages.add_message(request,constants.ERROR,mensagem_erro)
            return redirect('/auth/registrar/')