from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from enderecos.classes.municipios import Municipios


@login_required(login_url='/auth/entrar/')
def rotas (request):
    if request.method == 'GET':
        return render(request, 'home.html')
    elif request.method == "POST" :
        return render(request, 'home.html')