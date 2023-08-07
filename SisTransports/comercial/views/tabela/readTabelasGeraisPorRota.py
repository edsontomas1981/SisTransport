from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete
from operacional.classes.rotas import Rota
from Classes.utils import dprint
from comercial.classes.tblFaixa import TabelaFaixa

import json

@login_required(login_url='/auth/entrar/')
def readTabelasGeraisPorRota (request):
    if request.method == 'GET':
        return JsonResponse({'status':300})
    elif request.method == "POST" :
        data = json.loads(request.body.decode('utf-8'))
        tabela=TabelaFrete()        
        rota=Rota()
        rota.readRota(data['idRota'])
        status,tabelas=tabela.selecionaTabelasPelaRota(rota.rota)
        listaTabelas=[]
        for tabela in tabelas:
            faixas=TabelaFaixa()
            objTabela={}
            objTabela=tabela.toDict()
            objTabela['faixas']=faixas.readFaixasCalculo(tabela.id)
            listaTabelas.append(objTabela)
        return JsonResponse({'status':status,'tabelas': listaTabelas})