from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
from operacional.classes.cte import Cte
import json

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def get_cte_by_dtc(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        cte_instance = Cte()
        cte_by_dtc=cte_instance.get_cte_by_dtc(data.get('idDtc'))
        return JsonResponse({'status': 200,'cte':cte_by_dtc.to_dict()})
    
    except ValidationError as ve:
        return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})
    
    except Exception as e:
        return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})

