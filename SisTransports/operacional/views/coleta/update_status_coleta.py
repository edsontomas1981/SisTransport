from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json

from operacional.classes.coleta import Coleta

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def update_status_coleta(request):
    try:
        # Campos obrigatórios para criação ou atualização do contrato
        required_fields = ['id_coleta', 'status']

        # Carrega os dados da requisição
        data = json.loads(request.body.decode('utf-8'))

        # Verifica se os campos obrigatórios estão presentes nos dados da requisição
        for field in required_fields:
            if field not in data:
                return HttpResponseBadRequest(f"Campo '{field}' é obrigatório")

        # Adiciona o usuário logado como responsável pelo cadastro
        data['usuario_cadastro'] = request.user

        Coleta.update_status_coleta(data.get('id_coleta'),data.get('status'))

        return JsonResponse({'status': 'coletas'})
    except Exception as e:
        return HttpResponseBadRequest(f"Erro ao processar a requisição: {e}")
