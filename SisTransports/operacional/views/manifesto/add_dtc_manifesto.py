from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
import json
from operacional.classes.manifesto import ManifestoManager
from operacional.classes.cte import Cte

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
            dados = prepare_data(data,cte.dtc_fk.id)
            resposta = ManifestoManager.add_documento_manifesto(dados)
            ManifestoManager.obtem_documentos_manifesto(data.get('idManifesto'))

        # busca pelo chave nfe
        elif data.get('idTipoDocumento') == 2:
            print('chave nfe')


        # busca pelo numero Dtc
        elif data.get('idTipoDocumento') == 3:
            print('dtc')

        # busca pelo chave cte
        elif data.get('idTipoDocumento') == 4:
            print('chave cte')

        return JsonResponse({'status': resposta.status_code})

    except IntegrityError:
        return JsonResponse({'status':409,'error': 'Registro duplicado'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def prepare_data(data,id_dtc):
    return {
            'idManifesto':int(data.get('idManifesto')),
            'idDtc':int(id_dtc),
            'ocorrencia_id':int(data.get('cmbTipoManifesto')),
            }