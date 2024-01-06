from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from operacional.classes.dtc import Dtc
from datetime import datetime

@login_required(login_url='/auth/entrar/')
def read_coletas_geral(request):
    try:
        if request.method == 'POST':
            # Retorna uma resposta indicando que o método GET não é permitido
            return JsonResponse({'error': 'Método GET não é permitido'}, status=405)

        elif request.method == 'GET':
            # Convertendo as strings para objetos datetime
            data_inicial = datetime.strptime('2023-08-21 16:18:18.758502', '%Y-%m-%d %H:%M:%S.%f')
            data_final = datetime.strptime('2023-08-24 16:18:18.758502', '%Y-%m-%d %H:%M:%S.%f')
            
            # Prevenção de erro: verifica se Dtc tem o método buscar_registros_por_intervalo_de_tempo
            if hasattr(Dtc, 'buscar_registros_por_intervalo_de_tempo') and callable(getattr(Dtc, 'buscar_registros_por_intervalo_de_tempo')):
                dtc_coletas = Dtc.buscar_registros_por_intervalo_de_tempo(data_inicial, data_final)
                jsonColetas = [dtc.to_dict() for dtc in dtc_coletas]
                return JsonResponse({'status': jsonColetas})
            else:
                return JsonResponse({'error': 'Método buscar_registros_por_intervalo_de_tempo não está disponível em Dtc'}, status=500)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


