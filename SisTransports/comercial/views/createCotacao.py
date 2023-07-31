from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete 
from parceiros.classes.parceiros import Parceiros
from Classes.utils import dprint,checaCamposJson
from comercial.classes.tblFaixa import TabelaFaixa
from operacional.classes.dtc import Dtc
from comercial.classes.tabelaFrete import TabelaFrete
from operacional.classes.rotas import Rota
import json
from comercial.classes.cotacao import Cotacao

@login_required(login_url='/auth/entrar/')
def createCotacao (request):
    if request.method == 'GET':
        return JsonResponse({'status': 200})     
    elif request.method == "POST" :
        data = json.loads(request.body.decode('utf-8'))

        cotacao = Cotacao()
        resposta = cotacao.selectCotacaoByDtc(data['idPreDtc'])

        if resposta['status'] == 200:
            altera_cotacao(data,cotacao)
            return JsonResponse({'status': 201})# Altera cotação
        elif resposta['status'] == 404 :
            cria_nova_cotacao(data)
            return JsonResponse({'status': 200}) # Gera nova cotação
        else:
            return JsonResponse({'status': 200})         
        

def cria_nova_cotacao(data):
        dados=prepara_dados(data)
        cotacao = Cotacao()
        return cotacao.createCotacao(dados)

def altera_cotacao(data,cotacao):
        dados=prepara_dados(data)
        return cotacao.updateCotacao(dados,cotacao.cotacao.id)

def prepara_dados(data):
    dtc = Dtc()
    dtc.readDtc(data['idPreDtc'])

    tabela=TabelaFrete()
    tabela.readTabela(data['tabelaCotacao'])

    rota=Rota()
    rota.readRota(data['idRota'])

    data['rota']=rota.rota
    data['dtc']=dtc.dtc
    data['tabela_frete'] = tabela.tabela
    return data
    
