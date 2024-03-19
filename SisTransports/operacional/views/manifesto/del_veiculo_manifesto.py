from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json
from operacional.classes.manifesto import ManifestoManager

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def del_veiculo_manifesto(request):
    """
    View para remover um veículo de um manifesto.

    Requer autenticação do usuário.
    Aceita apenas os métodos POST e GET.

    Parâmetros (POST):
    - idManifesto: ID do manifesto do qual o veículo será removido (obrigatório).
    - placa: Placa do veículo a ser removido (obrigatório).

    Retorna:
    - JSON com status 200 e a lista atualizada de veículos do manifesto em caso de sucesso.
    - JSON com status 422 e uma mensagem de erro caso algum campo obrigatório não seja fornecido.
    - JSON com status 500 e uma mensagem de erro em caso de falha ao remover o veículo.

    Exemplo de uso (POST):
    ```
    {
        "idManifesto": 123,
        "placa": "ABC1234"
    }
    ```
    """
    required_fields = ['idManifesto', 'placa']

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
    else:
        data = request.GET

    for field in required_fields:
        if field not in data or data[field] == '':
            return JsonResponse({'status': 422, 'error': f'O campo {field} é obrigatório.'})

    try:
        ManifestoManager.remover_veiculo_manifesto(data.get('idManifesto'), data.get('placa'))
        veiculos = ManifestoManager.obter_lista_veiculos(data.get('idManifesto'))
        return JsonResponse({'status': 200, 'veiculos': veiculos})
    except Exception as e:
        return JsonResponse({'status': 500, 'error': str(e)})
