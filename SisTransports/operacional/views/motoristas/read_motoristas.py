from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
from operacional.classes.motorista import MotoristaManager
from parceiros.classes.parceiros import Parceiros
from Classes.utils import string_para_data
import json

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def read_motoristas(request):
    try:

        motoristas = MotoristaManager.lista_todos_motoristas()

        return JsonResponse({'status': 200,'motoristas':motoristas})
    
    except ValidationError as ve:
        return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})
    
    except Exception as e:
        return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})
