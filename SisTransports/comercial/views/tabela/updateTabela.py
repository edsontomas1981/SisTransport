from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete
from operacional.classes.rotas import Rota
from Classes.utils import checaCampos,toFloat,checkBox,dprint,dpprint
from Classes.parceiros import Parceiros

@login_required(login_url='/auth/entrar/')
def updateTabela (request):
    if request.method == 'GET':
        return render(request, 'home.html')
    elif request.method == "POST" :
        tabela=TabelaFrete()
        dados=dict(request.POST)
        tabela.readTabela(int(dados['numTabela'][0]))
        tabela.updateTabela(dados)
        return JsonResponse({'status': 200}) 