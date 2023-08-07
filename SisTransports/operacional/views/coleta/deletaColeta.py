from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.coleta import Coleta 

@login_required(login_url='/auth/entrar/')
def deletaColeta (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        Coleta.deletaColeta(request.POST.get('idColeta'))
        return JsonResponse({'status': 200}) #Coleta deletada