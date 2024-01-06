from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.cotacao import Cotacao
from django.core.serializers import serialize
import json

@login_required(login_url='/auth/entrar/')
def read_cotacao_cnpj(request):
    try:
        if request.method == 'POST':
            data = json.loads(request.body.decode('utf-8'))

            # Chame o método estático da classe Cotacao
            lista_cotacoes = Cotacao.selectCotacaoPorCnpj(data['cnpjTomador'])

            # Retorne a resposta em JSON
            return JsonResponse({'status': 200, 'data': lista_cotacoes})

        else:
            # Implemente a lógica para o método POST, se necessário
            return JsonResponse({'status': 200, 'message': ' method not implemented'})
        
    except Exception as e:
        # Lide com exceções gerais e retorne uma resposta de erro
        return JsonResponse({'status': 500, 'error': str(e)})
