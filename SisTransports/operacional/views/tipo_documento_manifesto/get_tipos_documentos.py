from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
from operacional.classes.tipos_documentos_manifesto import TipoDocumentoManifestoManager
import json

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def get_tipos_documentos_manifesto(request):
    try:
        tipos = TipoDocumentoManifestoManager.get_tipos()
        dict_tipos = [tipo.to_dict() for tipo in tipos]

        return JsonResponse({'status':200,'tipos':dict_tipos})
    
    except ValidationError as ve:
        return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})
    
    except Exception as e:
        return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})