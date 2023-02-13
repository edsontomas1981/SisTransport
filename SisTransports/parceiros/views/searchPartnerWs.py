from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from Classes.utils import dprint
from Classes.buscaCnpjWs import cnpjWs


@login_required(login_url='/auth/entrar/')
def searchPartnerWs(request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        parceiro=cnpjWs(request.POST.get('cnpjMdl'))
        return JsonResponse({'status': 200,'parceiro':parceiro}) 


