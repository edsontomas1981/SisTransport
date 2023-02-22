from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from Classes.utils import dprint,remove_caracteres_cnpj_cpf,remove_caracteres_cep
from Classes.consultaCnpj import validaCnpjCpf

from Classes.buscaCnpjWs import cnpjWs


@login_required(login_url='/auth/entrar/')
def searchPartnerWs(request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        if validaCnpjCpf(request.POST.get('cnpj_cpf')):
            parceiro,status=cnpjWs(request.POST.get('cnpj_cpf'))
            return JsonResponse({'status': status,'parceiro':standartData(parceiro),'tabelas':{}}) 
        else:
            return JsonResponse({'status': 300,'msg':'Cnpj inválido'}) 

def standartData(parceiro):
    return {
            'cnpj_cpf':remove_caracteres_cnpj_cpf(parceiro['cnpj']),
            'raz_soc': parceiro['nome'],
            'nome_fantasia': parceiro['fantasia'],
            'insc_est': '',
            'observacao': '',
            'endereco_fk': {
            'cep':remove_caracteres_cep(parceiro['cep']),
            'logradouro': parceiro['logradouro'],
            'numero': parceiro['numero'],
            'complemento': parceiro['complemento'],
            'bairro': parceiro['bairro'],
            'cidade': parceiro['municipio'],
            'uf': parceiro['uf']}
        }
