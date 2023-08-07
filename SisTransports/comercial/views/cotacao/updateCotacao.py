from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete 
from Classes.parceiros import Parceiros
from Classes.utils import dprint 

@login_required(login_url='/auth/entrar/')
def updateCotacao (request):
    if request.method == 'GET':
        return render(request, 'home.html')
    elif request.method == "POST" :
        return JsonResponse({'status': 200}) 