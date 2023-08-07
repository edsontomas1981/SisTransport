from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tblFaixa import TabelaFaixa as Faixa

@login_required(login_url='/auth/entrar/')
def deleteFaixa (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        faixa=Faixa()
        faixa.deleteFaixa(request.POST.get('idFaixa'))
        return JsonResponse({'status': 200}) 