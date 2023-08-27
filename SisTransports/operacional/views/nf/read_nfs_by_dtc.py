from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.dtc import Dtc 
from Classes.utils import dprint,dpprint,checaCamposJson
from operacional.models.dtc import Dtc as MdlDtc
from operacional.classes.nota_fiscal import Nota_fiscal_CRUD
import json


@login_required(login_url='/auth/entrar/')
def read_nfs_by_dtc (request):
    if request.method == 'GET':
        return JsonResponse({'status': "read nfs by dtc"}) #Cadastro efetuado com sucesso
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        notas_fiscais = Nota_fiscal_CRUD()
        nfs=notas_fiscais.carrega_nfs(data['idDtc'])
        if len(nfs):
            return JsonResponse({'status':200,'nfs':nfs}) #Cadastro efetuado com sucesso
        else:
            return JsonResponse({'status':300}) #Cadastro efetuado com sucesso