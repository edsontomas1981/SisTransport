from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json

from operacional.classes.manifesto import ManifestoManager

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def delete_dtc_manifesto(request):
    """
    Remove um documento de um manifesto.

    Parâmetros:
    - request: Requisição HTTP contendo os dados do documento a ser removido.

    Retorna:
    - JsonResponse: Resposta HTTP indicando o status da operação e, em caso de sucesso, os documentos restantes no manifesto.
    """
    try:
        # Campos obrigatórios para remover um documento
        required_fields = ['idDtc', 'idManifesto']
        
        # Decodifica os dados da requisição
        data = json.loads(request.body.decode('utf-8'))

        # Verifica se todos os campos obrigatórios estão presentes nos dados
        for field in required_fields:
            if field not in data:
                return JsonResponse({'status': 400, 'error': f'O campo obrigatório {field} está ausente.'}, status=400)

        # Remove o documento do manifesto
        response = ManifestoManager.remove_documento_manifesto(data['idDtc'], data['idManifesto'])
        
        # Verifica se a remoção foi bem-sucedida
        if response.status_code == 200:
            # Obtém os documentos restantes no manifesto
            documentos = ManifestoManager.obtem_documentos_manifesto(data['idManifesto'])
            return JsonResponse({'status': 200, 'documentos': documentos})
        else:
            return JsonResponse({'status': response.status_code})

    except json.JSONDecodeError:
        return JsonResponse({'status': 400, 'error': 'Erro ao decodificar JSON na requisição.'}, status=400)
    
    except Exception as e:
        return JsonResponse({'status': 500, 'error': str(e)}, status=500)
