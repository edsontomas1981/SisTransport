from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from operacional.classes.dtc import Dtc
from datetime import datetime
import json
from django.utils import timezone

DATE_FORMAT_INPUT = '%Y-%m-%d'
DATE_FORMAT_OUTPUT = '%Y-%m-%d %H:%M:%S.%f'

@login_required(login_url='/auth/entrar/')
def read_coletas_geral(request):
    """
    View para ler as coletas gerais com base nos filtros fornecidos.

    Args:
        request: Objeto HttpRequest contendo os dados da requisição.

    Returns:
        JsonResponse: JSON contendo as coletas gerais correspondentes aos filtros.

    """
    try:
        if request.method == 'POST':
            dados_requisicao = json.loads(request.body.decode('utf-8'))
            data_inicial, data_final = converter_para_formato_desejado(dados_requisicao['dataInicial'], dados_requisicao['dataFinal'])
            # Verifica se Dtc tem o método buscar_registros_com_filtro
            if hasattr(Dtc, 'buscar_registros_com_filtro') and callable(getattr(Dtc, 'buscar_registros_com_filtro')):
                dtc_coletas = Dtc.buscar_registros_com_filtro(data_inicial, data_final,
                                                                dados_requisicao['ordenarPor'], dados_requisicao['filtrar'], dados_requisicao['rota'])
                json_coletas = [dtc.to_dict() for dtc in dtc_coletas]
                return JsonResponse({'status': 200, 'coletas': json_coletas})
            else:
                return JsonResponse({'error': 'Método buscar_registros_com_filtro não está disponível em Dtc'}, status=500)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def converter_para_formato_desejado(data_inicial_str, data_final_str):
    TIME_START = ' 00:00:00'

    if not data_inicial_str:
        data_inicial_str = '1900-01-01'

    if not data_final_str:
        data_final_str = timezone.now().strftime(DATE_FORMAT_INPUT) + ' 23:59:59'
    else:
        if len(data_final_str) <= len(DATE_FORMAT_INPUT):
            data_final_str += ' 23:59:59'

    data_inicial = datetime.strptime(data_inicial_str + TIME_START, DATE_FORMAT_INPUT + TIME_START)
    data_final = datetime.strptime(data_final_str, DATE_FORMAT_INPUT + ' %H:%M:%S')
    print(data_inicial, data_final)
    return data_inicial, data_final

