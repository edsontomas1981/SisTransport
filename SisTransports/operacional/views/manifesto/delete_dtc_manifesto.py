from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json

from operacional.classes.manifesto import ManifestoManager
import json

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def delete_dtc_manifesto(request):
    required_fields = ['idDtc','idManif']
    data = json.loads(request.body.decode('utf-8'))

    response = ManifestoManager.remove_documento_manifesto(data.get('idDtc'),data.get('idManifesto'))
    print(response)
    if response.status_code == 200:
        documentos = ManifestoManager.obtem_documentos_manifesto(data.get('idManifesto'))
        return JsonResponse({'status':response.status_code,'documentos':documentos})

    return JsonResponse({'status':response.status_code})