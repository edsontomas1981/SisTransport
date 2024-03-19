from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json
from operacional.classes.manifesto import ManifestoManager

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def delete_manifesto(request):
    """
    View para excluir um manifesto.

    Requer autenticação do usuário.
    
    Métodos HTTP permitidos: POST

    Parâmetros:
        - idManifesto (int): O ID do manifesto a ser excluído.

    Retorna:
        - JsonResponse: Um JSON contendo o status da operação.
            - status (int): O código de status da operação.
                - 200: Manifesto excluído com sucesso.
                - 422: Falha na validação dos dados (campo obrigatório não fornecido).
                - 500: Erro interno do servidor ao excluir o manifesto.
            - error (str, opcional): Mensagem de erro, presente apenas se houver um erro interno.

    Exemplo de uso:

    ```json
    {
        "idManifesto": 35
    }
    ```

    """
    required_fields = ['idManifesto']

    data = json.loads(request.body.decode('utf-8'))

    print(data)
    
    for field in required_fields:
        if field not in data or data[field] == '':
            return JsonResponse({'status': 422, 'error': f'O campo {field} é obrigatório.'})

    try:
        ManifestoManager.deletar_manifesto(data['idManifesto'])
        return JsonResponse({'status': 200})
    except Exception as e:
        return JsonResponse({'status': 500, 'error': str(e)})
