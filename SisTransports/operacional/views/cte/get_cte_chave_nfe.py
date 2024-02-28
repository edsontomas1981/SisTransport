from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
from operacional.classes.cte import Cte
import json

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def get_cte_chave_nfe(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        cte_instance = Cte()
        '''
        35231223926683000299570010002402721052695137
        '''
        cte_by_chave_nfe=cte_instance.get_cte_chave_acesso_nfe(data.get('chaveNfe'))

        return JsonResponse({'status': 200,'cte':cte_by_chave_nfe.to_dict()})
    except ValidationError as ve:
        return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})
    
    except Exception as e:
        return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})