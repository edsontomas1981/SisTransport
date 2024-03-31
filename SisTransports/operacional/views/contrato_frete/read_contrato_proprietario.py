from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json

from Classes.utils import string_para_data
from Classes.utils import toFloat

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def read_contrato_proprietario (request):
    required_fields = ['emissorMdfe','dtInicioManif',
                       'dtPrevisaoChegada','rotasManifesto',
                       'motoristas','veiculos']
        
    # data = json.loads(request.body.decode('utf-8'))
    # data['usuario_cadastro'] = request.user

    return JsonResponse({'status':'read_contrato_proprietario'})