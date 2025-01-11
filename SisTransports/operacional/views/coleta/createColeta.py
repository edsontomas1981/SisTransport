from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.dtc import Dtc
from operacional.classes.coleta import Coleta
from Classes.utils import dprint, dpprint, checaCamposJson
from operacional.models.dtc import Dtc as MdlDtc
import json
from operacional.classes.TabelaOcorrencias import TabelaOcorrencias

@login_required(login_url='/auth/entrar/')
def createColeta(request):
    """
    Cria uma coleta com base nos dados recebidos via requisição POST.

    Args:
        request (HttpRequest): Objeto de requisição HTTP que contém os dados para a criação de uma coleta.

    Returns:
        JsonResponse: 
            - Em caso de método GET, retorna um JSON indicando o status de criação.
            - Em caso de método POST, retorna:
                - {'status': 200 ou 201} se a coleta foi criada com sucesso.
                - {'status': 300, 'camposVazios': [lista_de_campos]} se há campos obrigatórios ausentes.
                - {'status': <status_code>} com o código de status de erro específico.

    Raises:
        ValueError: Se o corpo da requisição não for um JSON válido.
    """
    if request.method == 'GET':
        return JsonResponse({'status': "create"})

    elif request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
        except (json.JSONDecodeError, UnicodeDecodeError) as e:
            return JsonResponse({'status': 400, 'error': 'JSON inválido ou erro ao decodificar.'})

        data['usuario_cadastro'] = request.user  

        # Verifica campos obrigatórios
        camposVazios = checaCamposJson(
            data,
            peso='Peso',
            valor="Valor em R$",
            horario="Horário",
            cep="Cep",
            rua="Rua",
            cidade="Cidade",
            uf="Uf",
            numero="Número",
            nomeContato="Nome do contato",
            numeroContato="Numero para contato"
        )

        if len(camposVazios) == 0:
            try:
                coleta = Coleta()
                status = coleta.createColeta(data)
                return JsonResponse({'status': status})
            except Exception as e:
                return JsonResponse({'status': 500, 'error': f'Erro interno ao criar a coleta: {str(e)}'})

        else:
            return JsonResponse({'status': 300, 'camposVazios': camposVazios})

    else:
        return JsonResponse({'status': 405, 'error': 'Método não permitido.'})
