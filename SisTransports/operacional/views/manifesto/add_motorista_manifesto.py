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

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def add_motorista_manifesto (request):
    required_fields = ['emissorMdfe','dtInicioManif',
                       'dtPrevisaoChegada','rotasManifesto',
                       'motoristas','veiculos']
        
    # data = json.loads(request.body.decode('utf-8'))
    # data['usuario_cadastro'] = request.user

    return JsonResponse({'status': 'add_motorista_manifesto'})