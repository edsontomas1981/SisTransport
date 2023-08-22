from faturamento.components.obj_calcula_frete import FreightCalculator
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.utils import dprint 
import json

@login_required(login_url='/auth/entrar/')
def calcula_frete(request):
    if request.method == 'GET':
        return JsonResponse({'status': 200})
    elif request.method == "POST":
        try:
            data = json.loads(request.body.decode('utf-8'))
            calcula_frete = FreightCalculator(data)
            calcula_frete.calcula_frete()
            subtotais_dict = calcula_frete.dict_subtotais()
            return JsonResponse({'subtotais': subtotais_dict},status=200)
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        except Exception as e:
            return JsonResponse({'error': 'An error occurred while calculating subtotals'}, status=500)
