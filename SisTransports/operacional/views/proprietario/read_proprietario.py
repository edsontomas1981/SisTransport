from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from operacional.classes.proprietario import ProprietarioManager
import json

@login_required(login_url='/auth/entrar/')
def read_proprietario(request):
    if request.method == 'GET':
        return JsonResponse({'status': 200,'dados':'read_proprietario'})
        # return render(request, 'preDtc.html')
    elif request.method == "POST" :
        proprietario = ProprietarioManager()
        data = json.loads(request.body.decode('utf-8'))
        data['usuario_cadastro'] = request.user 
        status=proprietario.buscar_proprietario_por_cnpj(data['cnpj_cpf'])
        
        if status:
            if proprietario.obj_proprietario.id:
                return JsonResponse({'status': 200,'dados':proprietario.obj_proprietario.to_dict()}) 
            else:
                return JsonResponse({'status': 301,'msg':'parceiro não cadastrado'})
        else:
            return JsonResponse({'status': 404,'msg':'parceiro não cadastrado'}) 
        
