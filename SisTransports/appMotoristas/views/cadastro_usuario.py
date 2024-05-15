from django.http import JsonResponse
from django.shortcuts import render,redirect
from usuarios.models import Usuarios
from django.contrib import messages
from django.contrib.messages import constants
from Classes.senha import Senha
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
@require_http_methods(["POST"])
def cadastrar_usuario_app_motorista(request):
    username = request.POST.get('nome')
    email = request.POST.get('email')
    senha = request.POST.get('senha')
    conf_senha = request.POST.get('conf_senha')

    user = Usuarios.objects.filter(username=username)
    if user.exists():
        return JsonResponse({'message': 'ok'})
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
