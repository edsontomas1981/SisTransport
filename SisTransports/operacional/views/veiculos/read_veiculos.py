from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
from operacional.classes.veiculo import VeiculoManager

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def read_veiculos(request):
    """
    Obtém uma lista de todos os veículos.

    Returns:
    - JsonResponse: uma resposta JSON com a lista de veículos.
                    status: 200 se bem-sucedido, juntamente com a lista de veículos.
    - JsonResponse: uma resposta JSON com uma mensagem de erro de validação.
                    status: 400 se houver um erro de validação.
    - JsonResponse: uma resposta JSON com uma mensagem de erro desconhecido.
                    status: 500 se houver um erro desconhecido.
    """
    try:
        veiculos = VeiculoManager.lista_todos_veiculos()
        print(veiculos)
        return JsonResponse({'status': 200,'veiculos':veiculos})
    
    except ValidationError as ve:
        return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})
    
    except Exception as e:
        return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})
