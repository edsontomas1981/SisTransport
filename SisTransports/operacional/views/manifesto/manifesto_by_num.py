from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json
from operacional.classes.manifesto import ManifestoManager

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
            return JsonResponse({'status': 400, 'error': 'Número do manifesto não fornecido.'})

        manifesto = ManifestoManager.obter_manifesto_por_id(num_manifesto)
        veiculos = ManifestoManager.obter_lista_veiculos(num_manifesto)

        dcto_manifesto = ManifestoManager.obtem_documentos_manifesto(num_manifesto)

        if manifesto is None:
            return JsonResponse({'status': 404, 'error': 'Manifesto não encontrado.'})

        return JsonResponse({'status': 200, 'manifesto': manifesto.to_dict(),'veiculos':veiculos,'documentos':dcto_manifesto})
    except Exception as e:
        return JsonResponse({'status': 500, 'error': 'Ocorreu um erro ao processar a solicitação.'})
