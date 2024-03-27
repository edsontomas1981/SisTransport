from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
import json
from operacional.classes.manifesto import ManifestoManager
from operacional.classes.cte import Cte
from operacional.classes.dtc import Dtc

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def add_dtc_manifesto(request):
    required_fields = ['idDcto','idManifesto','cmbTipoManifesto','idTipoDocumento']
    
    try:
        data = json.loads(request.body)

        for field in required_fields:
            if field not in data or data[field] == '':
                return JsonResponse({'status': 422, 'error': f'O campo {field} é obrigatório.'})

        # busca pelo cte
        if int(data.get('idTipoDocumento')) == 1:
            cte = Cte.obtem_cte_id(data.get('idDcto'))
            if cte:
                dados = prepare_data(data,cte.dtc_fk.id)
                resposta = ManifestoManager.add_documento_manifesto(dados)
                documentos=ManifestoManager.obtem_documentos_manifesto(data.get('idManifesto'))
            else:
                return JsonResponse({'status': 422,'erro':'Documento não localizado'})

        # busca pelo numero Dtc
        elif int(data.get('idTipoDocumento')) == 3:
            dtc = Dtc.obter_dtc_id(data.get('idDcto'))
            if dtc:
                dados = prepare_data(data,dtc.id)
                resposta = ManifestoManager.add_documento_manifesto(dados)
                documentos=ManifestoManager.obtem_documentos_manifesto(data.get('idManifesto'))
            else:
                return JsonResponse({'status': 422,'erro':'Documento não localizado'})

        # busca pelo chave cte
        elif int(data.get('idTipoDocumento')) == 4:
            cte = Cte.obtem_cte_chave_cte(data.get('idDcto'))
            if cte:
                dados = prepare_data(data,cte.dtc_fk.id)
                resposta = ManifestoManager.add_documento_manifesto(dados)
                documentos=ManifestoManager.obtem_documentos_manifesto(data.get('idManifesto'))
            else:
                return JsonResponse({'status': 422,'erro':'Documento não localizado'})

        return JsonResponse({'status': resposta.status_code,'documentos':documentos})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def prepare_data(data,id_dtc):
    return {
            'idManifesto':int(data.get('idManifesto')),
            'idDtc':int(id_dtc),
            'ocorrencia_id':int(data.get('cmbTipoManifesto')),
            }