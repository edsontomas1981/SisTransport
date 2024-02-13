from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseNotAllowed
from django.core.exceptions import ValidationError
import json


@login_required(login_url='/auth/entrar/')
def create_veiculo(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))
            data['usuario_cadastro'] = request.user 
            print(data)
            return JsonResponse({'status':200, 'message': 'Proprietário criado com sucesso'})
        except ValidationError as ve:
            return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})
        except Exception as e:
            return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})
    else:
        return HttpResponseNotAllowed(['GET'])

