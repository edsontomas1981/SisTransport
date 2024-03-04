from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json

from operacional.classes.emissores import EmissorManager

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def get_emissores(request):
    try:    
        emissores = EmissorManager.get_todos_emissores()
        listaEmissores = [emissor.to_dict() for emissor in emissores]
        return JsonResponse({'status': 200, 'emissores':listaEmissores})
    except Exception as e:
        return JsonResponse({'status': 400, 'error': f'Erro desconhecido: {str(e)}'})