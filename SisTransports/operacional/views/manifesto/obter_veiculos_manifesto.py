from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json

from operacional.classes.manifesto import ManifestoManager

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def obter_veiculos_manifesto (request):
    required_fields = ['emissorMdfe','dtInicioManif',
                       'dtPrevisaoChegada','rotasManifesto',
                       'motoristas','veiculos']
        
    data = json.loads(request.body.decode('utf-8'))
    data['usuario_cadastro'] = request.user

    veiculos = ManifestoManager.obter_lista_veiculos(data.get('idManifesto'))

    return JsonResponse({'status':200,'veiculos':veiculos})