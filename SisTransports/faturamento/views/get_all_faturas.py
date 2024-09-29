from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from faturamento.classes.FaturasManager import FaturasManager
from parceiros.classes.parceiros import Parceiros
from operacional.classes.emissores import EmissorManager
from operacional.classes.cte import Cte
from Classes.utils import str_to_date, to_float
import json
from datetime import datetime

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def get_all_faturas (request):
    faturas = FaturasManager()
    faturas.read_faturas()
    print(faturas.read_faturas())
    return JsonResponse({'faturas': faturas.read_faturas()})  


