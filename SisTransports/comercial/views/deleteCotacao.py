from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete 
from Classes.parceiros import Parceiros
from Classes.utils import dprint 
from comercial.classes.cotacao import Cotacao
import json

@login_required(login_url='/auth/entrar/')
def deleteCotacao (request):
    if request.method == 'GET':
        return JsonResponse({'status': 200}) 
    elif request.method == "POST" :
        data = json.loads(request.body.decode('utf-8'))
        cotacao = Cotacao()
        cotacao.selectCotacaoByDtc(data['idPreDtc'])
        resposta=cotacao.deleteCotacao(cotacao.cotacao.id)
        return JsonResponse({'status': resposta['status']}) 