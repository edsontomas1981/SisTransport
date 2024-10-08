from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from operacional.classes.cte import Cte
from faturamento.classes.FaturasManager import FaturasManager
import json

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def get_fatura(request):
    """
    Retorna os detalhes de uma fatura específica, incluindo os CTe's associados.

    Parâmetros:
    request (HttpRequest): Requisição HTTP POST que deve conter o corpo em JSON com o 'idFatura'.

    Retorna:
    JsonResponse: Um JSON com status 200 e os detalhes da fatura, incluindo os CTe's associados, 
                  ou uma mensagem de erro se o ID da fatura for inválido ou se ocorrer um erro no processamento.
    """
    try:
        # Verifica se o corpo da requisição é válido
        if not request.body:
            return HttpResponseBadRequest("Corpo da requisição vazio.")

        # Carrega os dados do corpo da requisição
        try:
            dados = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return HttpResponseBadRequest("JSON inválido.")

        # Obtém o ID da fatura
        id_fatura = dados.get('idFatura')
        if not id_fatura:
            return HttpResponseBadRequest("ID da fatura não fornecido.")

        # Busca a fatura e os CTe's relacionados
        fatura = FaturasManager.read_fatura(id_fatura)
        if not fatura:
            return JsonResponse({'status': 404})

        ctes_fatura = Cte.get_ctes_por_fatura(id_fatura)
        lista_ctes = [cte.to_dict() for cte in ctes_fatura]

        # Adiciona os CTe's à fatura
        fatura['ctes'] = lista_ctes

        return JsonResponse({'status': 200, 'fatura': fatura})

    except Exception as e:
        # Log da exceção (opcional) e retorno de erro genérico
        return HttpResponseServerError(f"Erro no servidor: {str(e)}")
