from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
from comercial.classes.cotacao import Cotacao

import json

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def readCotacao(request):
    """
    Endpoint para ler informações de cotação por ID de Dtc.

    Método suportado: POST
    Parâmetros JSON esperados:
    - idDtc: ID do Dtc para o qual se deseja obter a cotação.

    Retorna:
    - JSON com status 200 e detalhes da cotação se encontrado.
    - JSON com status 400 em caso de erro de validação nos parâmetros.
    - JSON com status 500 em caso de erro desconhecido no servidor.
    """
    try:
        # Verificar se o método da requisição é POST
        if request.method == "POST":
            data = json.loads(request.body.decode('utf-8'))
            id_dtc = data.get('idDtc')

            if id_dtc is None or id_dtc == '':
                raise ValidationError("Parâmetro 'idDtc' não fornecido.")

            cotacao = Cotacao.selectStaticCotacaoByDtc(id_dtc)
            return JsonResponse({'status': 200, 'cotacao': cotacao})

        else:
            return JsonResponse({'status': 400, 'error': 'Método não suportado. Utilize o método POST.'})

    except ValidationError as ve:
        return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})

    except Cotacao.DoesNotExist:
        return JsonResponse({'status': 404, 'error': 'Cotação não encontrada para o ID do Dtc fornecido.'})

    except Exception as e:
        return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})
