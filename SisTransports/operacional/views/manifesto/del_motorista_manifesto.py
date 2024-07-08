from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json
from operacional.classes.manifesto import ManifestoManager

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST", "GET"])
def del_motorista_manifesto(request):
    """
    Deleta um motorista de um manifesto e retorna a lista atualizada de motoristas.

    Args:
        request (HttpRequest): A solicitação HTTP que deve conter o corpo JSON com 
            'idManifesto' e 'cpfMotorista'.

    Returns:
        JsonResponse: Um objeto JSON contendo o status da operação e a lista atualizada de motoristas.
    """
    try:
        # Verifica se o método da solicitação é POST
        if request.method != 'POST':
            return JsonResponse({'status': 405, 'message': 'Método não permitido. Use POST.'}, status=405)

        # Tenta carregar o corpo JSON da solicitação
        try:
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return JsonResponse({'status': 400, 'message': 'JSON inválido.'}, status=400)

        # Verifica se os parâmetros necessários estão presentes
        if 'idManifesto' not in data or 'cpfMotorista' not in data:
            return JsonResponse({'status': 400, 'message': 'Parâmetros idManifesto e cpfMotorista são obrigatórios.'}, status=400)

        data['usuario_cadastro'] = request.user

        # Tenta deletar o motorista do manifesto
        try:
            ManifestoManager.deletar_motorista_do_manifesto(data['idManifesto'], data['cpfMotorista'])
        except Exception as e:
            return JsonResponse({'status': 500, 'message': f'Erro ao deletar motorista: {str(e)}'}, status=500)

        # Tenta obter a lista atualizada de motoristas
        try:
            lista_motoristas = ManifestoManager.obter_motoristas_manifesto(data['idManifesto'])
        except Exception as e:
            return JsonResponse({'status': 500, 'message': f'Erro ao obter motoristas: {str(e)}'}, status=500)

        motoristas = [motorista.to_dict() for motorista in lista_motoristas]

        return JsonResponse({'status': 200, 'motoristas': motoristas})

    except Exception as e:
        return JsonResponse({'status': 500, 'message': f'Erro inesperado: {str(e)}'}, status=500)
