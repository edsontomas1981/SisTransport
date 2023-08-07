from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.dtc import Dtc 

@login_required(login_url='/auth/entrar/')
def excluiDtc (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        dtc=Dtc()
        dtc.readDtc(request.POST.get('numPed'))
        if dtc:
            Dtc.deleteDtc(request.POST.get('numPed'))
            return JsonResponse({'status': 200}) #Cadastro efetuado com sucesso
        else:
            return JsonResponse({'status': 400}) #Cadastro efetuado com sucesso