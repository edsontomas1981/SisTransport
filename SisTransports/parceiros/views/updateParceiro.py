from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from parceiros.models.parceiros import Parceiros as MdlParceiros
from Classes.utils import dprint
from parceiros.classes.parceiros import Parceiros


@login_required(login_url='/auth/entrar/')
def updateParceiro(request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        return JsonResponse({'status': 400}) 