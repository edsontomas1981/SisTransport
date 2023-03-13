from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from parceiros.models.parceiros import Parceiros as MdlParceiros
from Classes.utils import dprint
from Classes.consultaCnpj import validaCnpjCpf 
from parceiros.classes.parceiros import Parceiros
from comercial.classes.tabelaFrete import TabelaFrete


@login_required(login_url='/auth/entrar/')
def readParceiro(request):
    if request.method == 'GET':
        return JsonResponse({'status': 200}) 
    elif request.method == "POST":
        if request.POST.get('cnpj_cpf')=='' or not validaCnpjCpf(request.POST.get('cnpj_cpf')) :
            return JsonResponse({'status': 500,'msg':'Cnpj Inválido'}) 
        else:
            parceiro=Parceiros()
            status=parceiro.readParceiro(request.POST.get('cnpj_cpf'))
            tabelas=TabelaFrete()
            parceirosVinculados=tabelas.selecionaTabCnpj()

            if status==200:
                return JsonResponse({'status': 200,
                'parceiro':parceiro.parceiro.to_dict(),
                'contatos':parceiro.parceiro.listaContatos,
                'tabelas':tabelas.get_tabelas_por_parceiro(parceiro.parceiro),
                'parceirosViculados':parceirosVinculados}) 
            elif status==404:
                return JsonResponse({'status': 404,'msg':'Parceiro não localizado'})
            else:
                return JsonResponse({'status': 500,'msg':'Erro interno'})


        
    