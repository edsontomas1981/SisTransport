from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.utils import checaCampos
from operacional.classes.rotas import Rota

@login_required(login_url='/auth/entrar/')
def createRota (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        dados=checaCampos(request,nomeRota='Nome',ufOrigem='UF Origem',cidadeOrigem='Cidade Origem',
                        ufDestino='Uf Destino',cidadeDestino='Cidade Destino')
        if dados :
            return JsonResponse({'status': 400,'dados':dados}) #Cadastro efetuado com sucesso
        else :
            rota=Rota()
            rota.salvaRota(request.POST.get('nomeRota'),request.POST.get('ufOrigem'),
                           request.POST.get('cidadeOrigem'),request.POST.get('ufDestino'),
                           request.POST.get('cidadeDestino'))
            return JsonResponse({'status': 200,'rota':rota.rota.to_dict()}) #Cadastro efetuado com sucesso
            
    