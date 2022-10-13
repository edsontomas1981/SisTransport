from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from enderecos.classes.municipios import Municipios

@login_required(login_url='/auth/entrar/')
def readMunicipio (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        municipios=Municipios()
        listaMunicipios=municipios.getMunicipios(request.POST.get("uf"))
        return JsonResponse({'status': 200,'municipios':listaMunicipios}) #Cadastro efetuado com sucesso