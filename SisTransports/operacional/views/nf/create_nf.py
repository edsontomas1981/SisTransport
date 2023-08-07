from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.utils import dprint,dpprint,checaCamposJson
import json


@login_required(login_url='/auth/entrar/')
def create_nf (request):
    if request.method == 'GET':
        return JsonResponse({'status': "create"}) #Cadastro efetuado com sucesso
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        return JsonResponse({'status':200}) #Cadastro efetuado com sucesso
