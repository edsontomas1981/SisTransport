from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from enderecos.classes.municipios import Municipios

@login_required(login_url='/auth/entrar/')
def read_uf (request):
    if request.method == 'GET':
        return JsonResponse({'status': 200})
    elif request.method == "POST" :
        # municipios=Municipios()
        # listaMunicipios=municipios.getAllMunicipios()
        return JsonResponse({'status': 200})
        # municipios=Municipios()
        # listaMunicipios=municipios.getMunicipios(request.POST.get("uf"))
        # return JsonResponse({'status': 200,'municipios':listaMunicipios})