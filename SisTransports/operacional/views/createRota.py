from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

@login_required(login_url='/auth/entrar/')
def createRota (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        return render(request, 'preDtc.html')
        # return JsonResponse({'status': 200, 'dtc':dtc.dtcToDict(request.POST.get('numPed'))}) #Cadastro efetuado com sucesso