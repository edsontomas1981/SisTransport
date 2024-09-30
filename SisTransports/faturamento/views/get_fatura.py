from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from operacional.classes.cte import Cte
from faturamento.classes.FaturasManager import FaturasManager
import json


@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def get_fatura (request):
    dados = json.loads(request.body.decode('utf-8'))
    id_fatura = dados.get('idFatura')
    fatura = FaturasManager.read_fatura(id_fatura)
    return JsonResponse({'status': 200,'fatura':fatura})    