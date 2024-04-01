from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json

from Classes.utils import string_para_data
from Classes.utils import toFloat
from operacional.classes.contratos import ContratoManager

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def delete_contrato(request):
    """
    View para deletar um contrato.

    Requer autenticação.
    Aceita apenas o método HTTP POST.

    Parâmetros esperados no corpo da requisição (formato JSON):
    - id_contrato: ID do contrato a ser deletado.

    Retorna:
    - JsonResponse com um status de 200 se o contrato foi deletado com sucesso.
    - HttpResponseBadRequest com uma mensagem de erro se ocorrerem erros de validação.
    """

    # Campos obrigatórios para a requisição
    required_fields = ['id_contrato']

    try:
        data = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
        return HttpResponseBadRequest('Corpo da requisição não é um JSON válido.')
    
    print(data)

    # Verifica se todos os campos obrigatórios estão presentes na requisição
    for field in required_fields:
        if field not in data:
            return HttpResponseBadRequest(f'O campo obrigatório "{field}" está ausente.')

    # Tenta deletar o contrato
    try:
        contrato_id = data.get('id_contrato')
        ContratoManager.delete_contrato(contrato_id)
    except Exception as e:
        return HttpResponseBadRequest(f'Ocorreu um erro ao deletar o contrato: {str(e)}')

    # Se tudo ocorrer bem, retorna um JsonResponse com status 200
    return JsonResponse({'status': 200})
