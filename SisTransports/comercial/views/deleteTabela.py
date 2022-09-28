from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.dtc import Dtc 


@login_required(login_url='/auth/entrar/')
def deleteTabela (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        dtc=Dtc()
        return JsonResponse({'status': 200, 'dtc':dtc.dtcToDict(request.POST.get('numPed'))}) 