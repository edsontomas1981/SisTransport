from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.utils import dprint,dpprint,checaCamposJson
import json
from operacional.classes.nota_fiscal import Nota_fiscal_CRUD
from django.utils import timezone
from django.conf import settings
from operacional.classes.dtc import Dtc


@login_required(login_url='/auth/entrar/')
def create_nf(request):
    if request.method == 'GET':
        return JsonResponse({'status': "create"})  # Cadastro efetuado com sucesso
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        dtc = Dtc()
        dtc.readDtc(data['dtc'])

        # Prepare os dados com a informação 'preDtc' adicionada
        dados = prepara_dados(data, request)
        dados['dtc'] = dtc.dtc


        nf = Nota_fiscal_CRUD()
        nf_existe = nf.is_nf_linked_to_dtc(data['chaveAcessoNf'],dtc.dtc.id)

        if nf_existe == 201:
            nf.update(dados)
            return JsonResponse({'status': 201,'nf':nf.carrega_nfs(dtc.dtc.id)}) 
        elif nf_existe == 200:
            nf.create(dados)
            
            return JsonResponse({'status': 200,'nf':nf.carrega_nfs(dtc.dtc.id)}) 
        else:
            return JsonResponse({'status': 404})



def prepara_dados(data, request):
    dados = {
        'chave_acesso': data['chaveAcessoNf'],
        'num_nf': data['numNf'],
        'data_emissao': data['dataEmissaoNf'],
        'natureza': data['natureza'],
        'especie': data['especieNf'],
        'tipo_documento': data['tipoDocumento'],
        'volume': data['qtdeNf'],
        'peso': data['pesoNf'],
        'm3': data['resultM3Peso'],
        'valor_nf': data['valorNf'],
        'usuario_cadastro': request.user,  # Usuário autenticado que está cadastrando
        'usuario_ultima_atualizacao': request.user,  # Mesmo usuário para atualização inicial
        'data_cadastro': timezone.now(),  # Data e hora atual
        'data_ultima_atualizacao': timezone.now(),  # Data e hora atual
    }
    return dados
