from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from parceiros.models.parceiros import Parceiros as MdlParceiros
from Classes.utils import dprint
from Classes.consultaCnpj import validaCnpjCpf 
from parceiros.classes.parceiros import Parceiros
import json

@login_required(login_url='/auth/entrar/')
def read_parceiro_json(request):
    if request.method == 'GET':
        return JsonResponse({'status': 200}) 
    elif request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))
        if data['cnpj_cpf']=='' or not validaCnpjCpf(data['cnpj_cpf']) :
            return JsonResponse({'status': 500,'msg':'Cnpj Inválido'}) 
        else:
            parceiro=Parceiros()
            status=parceiro.readParceiro(data['cnpj_cpf'])

            if status==200:
                return JsonResponse({'status': 200,
                'parceiro':parceiro.parceiro.to_dict(),
            }) 
            elif status==404:
                return JsonResponse({'status': 404,'msg':'Parceiro não localizado'})
            else:
                return JsonResponse({'status': 500,'msg':'Erro interno'})