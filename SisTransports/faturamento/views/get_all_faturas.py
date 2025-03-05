from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from faturamento.classes.FaturasManager import FaturasManager
import json

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def get_all_faturas(request):
    """
    Recupera todas as faturas e retorna como uma resposta JSON.

    Este endpoint requer que o usuário esteja autenticado. Ele faz uma requisição
    ao FaturasManager para recuperar todas as faturas disponíveis e retorna os dados
    em formato JSON.

    Returns:
        JsonResponse: Um objeto JSON contendo as faturas ou uma mensagem de erro.
    """
    try:
        faturas = FaturasManager()
        faturas_data = faturas.read_faturas()
        
        if faturas_data is None:
            return HttpResponseBadRequest("Nenhuma fatura encontrada.")

        return JsonResponse({'faturas': faturas_data})

    except json.JSONDecodeError:
        return HttpResponseBadRequest("Erro ao decodificar os dados da requisição.")

    except Exception as e:
        # Logando o erro (pode ser ajustado para usar um sistema de log apropriado)
        return HttpResponseServerError("Ocorreu um erro ao processar sua solicitação.")



