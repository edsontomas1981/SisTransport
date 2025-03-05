from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from operacional.classes.cte import Cte
from faturamento.classes.FaturasManager import FaturasManager
from parceiros.classes.parceiros import Parceiros
from operacional.classes.emissores import EmissorManager
from Classes.utils import str_to_date, dprint
import json

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST", "GET"])
def cria_fatura(request):
    try:
        dados = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
        return JsonResponse({'status': 400, 'error': 'JSON inválido'}, status=400)

    parceiro = Parceiros.read_parceiro(dados.get('cnpjSacadoFatura'))
    if not parceiro:
        return JsonResponse({'status': 404, 'error': 'Parceiro não encontrado'}, status=404)

    emissor = EmissorManager.get_emissores_por_id(dados.get('emissorMdlFatura'))
    if not emissor:
        return JsonResponse({'status': 404, 'error': 'Emissor não encontrado'}, status=404)

    dados['sacado_fk'] = parceiro
    dados['emissor_fk'] = emissor
    dados_normatizados = normatiza_dados(dados)

    if dados.get('idFaturaMdlFatura') == '':
        fatura = FaturasManager()
        fatura.create_fatura(dados_normatizados)
        lista_ctes = dados_normatizados.get('ctes')

        for cte in lista_ctes:
            Cte.adiciona_fatura_ao_cte(cte.get('idCte'), fatura.obj_fatura)

        return JsonResponse({'status': 200, 'message': 'Fatura criada com sucesso','id_fatura':fatura.obj_fatura.id})
    else:
        # Aqui pode-se implementar a lógica de alteração da fatura, se necessário.
        fatura = FaturasManager.read_fatura(dados.get('idFaturaMdlFatura'))
        FaturasManager.atualizar_ctes(dados_normatizados)
        return JsonResponse({'status': 201, 'message': 'Fatura alterada com sucesso','id_fatura':fatura.get('id')})

def normatiza_dados(dados):
    return {
        'id': dados.get('idFaturaMdlFatura') if dados.get('idFaturaMdlFatura') else None,
        'emissor_fk': dados.get('emissor_fk'),
        'sacado_fk': dados.get('sacado_fk'),
        'sacado_id': dados.get('sacado_fk'),
        'data_emissao': str_to_date(dados.get('dataEmissaoModalFatura')),
        'vencimento': str_to_date(dados.get('vencimentoMdlFatura')),
        'valor_total': float(dados.get('valorTotalMdlFatura')) if dados.get('valorTotalMdlFatura') not in [None, ''] else 0.00,
        'valor_a_pagar': float(dados.get('valorAPagarMdlFatura')) if dados.get('valorAPagarMdlFatura') not in [None, ''] else 0.00,
        'desconto': float(dados.get('descontoMdlFatura')) if dados.get('descontoMdlFatura') not in [None, ''] else 0.00,
        'desconto_em_reais': float(dados.get('descontoEmReaisMdlFatura')) if dados.get('descontoEmReaisMdlFatura') not in [None, ''] else 0.00,
        'acrescimo': float(dados.get('acrescimoMdlFatura')) if dados.get('acrescimoMdlFatura') not in [None, ''] else 0.00,
        'acrescimo_em_reais': float(dados.get('acrescimoEmReaisMdlFatura')) if dados.get('acrescimoEmReaisMdlFatura') not in [None, ''] else 0.00,
        'ctes': dados.get('ctes', []),
    }

