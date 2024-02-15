from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseNotAllowed
from django.core.exceptions import ValidationError
from operacional.classes.veiculo import VeiculoManager
import json


@login_required(login_url='/auth/entrar/')
def read_veiculo_placa(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))
            veiculo = VeiculoManager.get_veiculo_placa(data.get('placa'))
            
            return JsonResponse({'status': 200,'veiculo':veiculo.to_dict()})
        except ValidationError as ve:
            return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})
        except Exception as e:
            return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})
    else:
        return HttpResponseNotAllowed(['GET'])