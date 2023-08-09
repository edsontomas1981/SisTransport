from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.dtc import Dtc 
from Classes.utils import dprint,dpprint,checaCamposJson
from operacional.models.dtc import Dtc as MdlDtc
from operacional.classes.nota_fiscal import Nota_fiscal_CRUD
import json


@login_required(login_url='/auth/entrar/')
def read_nf (request):
    if request.method == 'GET':
        return JsonResponse({'status': "read"}) #Cadastro efetuado com sucesso
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        nota_fiscal = Nota_fiscal_CRUD()
        nota_fiscal.read_by_dtc_chave(data['chave'],data['idDtc'])
        return JsonResponse({'status':200,'nota_fiscal':nota_fiscal.obj_nota_fiscal.to_dict()}) #Cadastro efetuado com sucesso