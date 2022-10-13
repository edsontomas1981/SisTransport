from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

@login_required(login_url='/auth/entrar/')
def updateRota (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        dtc=Dtc()
        return render(request, 'preDtc.html')