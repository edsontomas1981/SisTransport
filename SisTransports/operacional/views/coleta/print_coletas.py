import io
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from django.http import HttpResponse, JsonResponse, FileResponse
from django.contrib.auth.decorators import login_required
import json
from Classes.dtc import Dtc
from operacional.classes.formulario_coleta import imprimir_documento

@login_required(login_url='/auth/entrar/')
def print_coletas(request):
    """
    Esta função lida com a impressão de coletas.

    Método HTTP permitido:
    - GET para retornar informações sobre impressão.
    - POST para realizar a impressão.

    Para realizar a impressão, envie dados JSON no corpo da solicitação POST.

    Exemplo de formato de dados JSON:
    [
        {"id": 1},
        {"id": 2},
        # ...
    ]

    Retorna um JsonResponse indicando o status da operação.

    Possíveis status:
    - {'status': "imprimirColetas"}: Requisição GET bem-sucedida.
    - {'status': 200}: Requisição POST bem-sucedida.

    Prevenção contra erros:
    - Validação da entrada JSON.
    - Manipulação de exceções ao processar as coletas.
      - Caso a lista de coletas esteja vazia.
      - Caso a chamada para `Dtc.getDtcId(coleta_id)` retorne None.
      - Caso ocorram erros durante a impressão do documento.

    """
    def processar_coletas(data):
        """
        Processa os dados de coletas recebidos e retorna uma lista de dicionários representando as coletas.

        Argumentos:
        - data (list): Lista de dicionários representando coletas.

        Retorna:
        - list: Lista de dicionários representando as coletas processadas.

        Levanta:
        - ValueError: Se os dados de coleta não forem uma lista ou se um item de coleta não tiver uma chave 'id' válida.
        """
        if not isinstance(data, list):
            raise ValueError("Os dados de coleta devem ser uma lista.")

        coletas_processadas = []
        for item in data:
            coleta_id = int(item.get('id'))
            if coleta_id is None or not isinstance(coleta_id, int):
                raise ValueError("Cada item de coleta deve ter uma chave 'id' contendo um valor inteiro.")
            
            dtc_obj = Dtc.getDtcId(coleta_id)
            if dtc_obj is None:
                raise ValueError(f"Não foi possível encontrar a coleta com ID {coleta_id}.")
                
            coletas_processadas.append(dtc_obj.to_dict())

        return coletas_processadas

    if request.method == 'GET':
        return JsonResponse({'status': "imprimirColetas"})
    elif request.method == 'POST':
        # try:
        data = json.loads(request.body.decode('utf-8'))
        if not data:
            return JsonResponse({'error': "A lista de coletas está vazia."}, status=400)
        coletas_processadas = processar_coletas(data)
        imprimir_documento(coletas_processadas)
        return JsonResponse({'status': 200})
        # except json.JSONDecodeError:
        #     return JsonResponse({'error': "Erro ao decodificar o JSON no corpo da solicitação."}, status=400)
        # except ValueError as ve:
        #     return JsonResponse({'error': str(ve)}, status=400)
        # except Exception as e:
        #     return JsonResponse({'error': f"Erro ao processar coletas: {str(e)}"}, status=500)
