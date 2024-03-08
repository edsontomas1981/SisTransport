from parceiros.classes.parceiros import Parceiros
from Classes.utils import string_para_data
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json

from Classes.utils import string_para_data
from Classes.utils import toFloat

from operacional.classes.manifesto import ManifestoManager

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def manifesto_by_num(request):
    data = json.loads(request.body.decode('utf-8'))
    data['usuario_cadastro'] = request.user

    manifesto = ManifestoManager.obter_manifesto_por_id(data.get('numManifesto'))

    return JsonResponse({'status': 200,'manifesto':manifesto.to_dict()})