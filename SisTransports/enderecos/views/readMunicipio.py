from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from enderecos.classes.municipios import Municipios
import json

@login_required(login_url='/auth/entrar/')
def readMunicipio (request):
    if request.method == 'GET':
        municipios=Municipios()
        listaMunicipios=municipios.getAllMunicipios()
        return JsonResponse({'status': 200,'municipios':listaMunicipios})
    elif request.method == "POST" :
        data = json.loads(request.body)
        uf = data.get("uf")
        municipios = Municipios()
        listaMunicipios = municipios.getMunicipios(uf)
        return JsonResponse({'status': 200, 'municipios': listaMunicipios})