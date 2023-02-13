from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from Classes.utils import dprint



@login_required(login_url='/auth/entrar/')
def readContatos(request):
    if request.method == 'GET':
        return JsonResponse({'status': 200}) 
    elif request.method == "POST" :
        return JsonResponse({'status': 200}) 