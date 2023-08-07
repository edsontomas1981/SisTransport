from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete


@login_required(login_url='/auth/entrar/')
def filtraTabelas (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        tabelas=TabelaFrete()
        tabelas.filtraTabelas(request.POST.get('filtro'))
        tabela=[x.toDict() for x in tabelas.tabela]
        return JsonResponse({'status': 200,'tabela':tabela}) 