from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete
from Classes.utils import checaCampos,dprint

@login_required(login_url='/auth/entrar/')
def createTabela (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        campos=checaCampos(request,descTabela='Descrição da tabela',
                        vlrFrete='Valor frete',freteMinimo='Frete Mínimo')
        if campos :
            return JsonResponse({'status': 400,'camposObrigatorios':campos})         
        else:
            tabela=TabelaFrete()
            dados=dict(request.POST)
            tabela.createTabela(dados)
            return JsonResponse({'status': 200,'tabela':tabela.toDict()})
