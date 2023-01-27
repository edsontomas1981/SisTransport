from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from operacional.classes.dtc import Dtc 
from parceiros.models.parceiros import Parceiros

@login_required(login_url='/auth/entrar/')
def readDtc (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        return JsonResponse({'status': 200}) 