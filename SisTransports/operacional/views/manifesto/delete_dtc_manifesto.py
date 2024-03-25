from parceiros.classes.parceiros import Parceiros
from Classes.utils import string_para_data
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json

from Classes.utils import string_para_data
from Classes.utils import toFloat

from operacional.classes.emissores import EmissorManager
from operacional.classes.rotas import Rota
from operacional.classes.motorista import MotoristaManager
from operacional.classes.veiculo import VeiculoManager
from operacional.classes.manifesto import ManifestoManager
import json

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def delete_dtc_manifesto(request):
    required_fields = ['idDtc','idManif']
    data = json.loads(request.body.decode('utf-8'))

    return JsonResponse({'status': 'delete dtc'})