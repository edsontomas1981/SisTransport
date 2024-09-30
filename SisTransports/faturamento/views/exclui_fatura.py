from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from operacional.classes.cte import Cte
from faturamento.classes.FaturasManager import FaturasManager
import json


@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def exclui_fatura (request):
    dados = json.loads(request.body.decode('utf-8'))
    id_fatura = dados.get('idFatura')
    ctes = Cte.get_ctes_por_fatura(id_fatura)
    for cte in ctes:
        Cte.remove_fatura_cte(cte.id)
    FaturasManager.delete_fatura(id_fatura)
    return JsonResponse({'status': 200})    