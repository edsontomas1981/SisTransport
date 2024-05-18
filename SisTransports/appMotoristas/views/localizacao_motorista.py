from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
import json

# @login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def localizacao_motorista(request):
    try:
        print('acionado')

        return JsonResponse({'dados':200})
   
    except ValidationError as ve:
        return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})
    
    except Exception as e:
        return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})