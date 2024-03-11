from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json

from Classes.utils import string_para_data, toFloat
from operacional.classes.manifesto import ManifestoManager
from parceiros.classes.parceiros import Parceiros

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def manifesto_by_num(request):
    """
    Retorna um manifesto com base no número do manifesto fornecido.
    
    Parâmetros esperados:
    - numManifesto: Número do manifesto a ser pesquisado.
    
    Respostas:
    - status 200: Retorna o manifesto encontrado no formato JSON.
    - status 400: Retorna um JSON com a mensagem de erro caso o número do manifesto não seja fornecido ou seja inválido.
    - status 404: Retorna um JSON com a mensagem de erro caso o manifesto não seja encontrado.
    """
    try:
        data = json.loads(request.body.decode('utf-8'))
        num_manifesto = data.get('numManifesto')
        if not num_manifesto:
            return JsonResponse({'status': 400, 'error': 'Número do manifesto não fornecido.'}, status=400)
        
        manifesto = ManifestoManager.obter_manifesto_por_id(num_manifesto)
        if manifesto is None:
            return JsonResponse({'status': 404, 'error': 'Manifesto não encontrado.'}, status=404)
        
        return JsonResponse({'status': 200, 'manifesto': manifesto.to_dict()})
    except Exception as e:
        return JsonResponse({'status': 500, 'error': 'Ocorreu um erro ao processar a solicitação.'}, status=500)
