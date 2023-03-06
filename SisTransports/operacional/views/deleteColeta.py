from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from operacional.classes.dtc import Dtc
from operacional.classes.coleta import Coleta
from Classes.utils import dprint
from operacional.models.dtc import Dtc as MdlDtc
import json

@login_required(login_url='/auth/entrar/')
def deleteColeta (request):
    if request.method == 'GET':
        return JsonResponse({'status': 'delete'}) #Cadastro efetuado com sucesso

    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        dtc=Dtc()
        dtc.readDtc(data['dtc'])
        if dtc.dtc.coleta_fk:
            coleta=Coleta()
            coleta.deleteColeta(dtc.dtc.coleta_fk.id)
            return JsonResponse({'status': 200})
        else:
            return JsonResponse({'status': 300})
