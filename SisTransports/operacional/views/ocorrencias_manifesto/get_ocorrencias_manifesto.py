from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
from operacional.classes.ocorrencias_manifesto import Ocorrencia_manifesto
import json

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def get_ocorrencias_manifesto(request):
    try:
        ocorrencias = Ocorrencia_manifesto.get_ocorrencia()
        dict_ocorrencias = [ocorrencia.to_dict() for ocorrencia in ocorrencias]
        return JsonResponse({'status': 200, 'ocorrencias': dict_ocorrencias})

    except ValidationError as ve:
        return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})
    
    except Exception as e:
        return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})