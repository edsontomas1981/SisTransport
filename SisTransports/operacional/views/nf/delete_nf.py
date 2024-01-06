from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.dtc import Dtc 
from Classes.utils import dprint,dpprint,checaCamposJson
from operacional.classes.nota_fiscal import Nota_fiscal_CRUD
import json

@login_required(login_url='/auth/entrar/')
def delete_nf (request):
    if request.method == 'GET':
        return JsonResponse({'status': "delete"}) #Cadastro efetuado com sucesso
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        nota_fiscal = Nota_fiscal_CRUD()
        nota_fiscal.read_by_dtc_chave(data['chaveAcesso'],data['idDtc'])
        nota_fiscal.delete()
        return JsonResponse({'status':300}) #Cadastro efetuado com sucesso