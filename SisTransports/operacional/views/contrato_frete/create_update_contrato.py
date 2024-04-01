from datetime import datetime
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json
from operacional.classes.contratos import ContratoManager

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def create_update_contrato(request):
    """
    Cria ou atualiza um contrato de frete com base nos dados fornecidos.

    Requerimentos:
    - Método HTTP: POST
    - Campos obrigatórios: 'freteContratado', 'freteAPagar'
    - URL: /caminho/para/create_update_contrato/

    Exemplo de uso:
    {
        "freteContratado": valor,
        "freteAPagar": valor,
        ...
    }

    Retorna:
    Um objeto JSON com a chave 'status' indicando o status da operação.

    """
    try:
        # Campos obrigatórios para criação ou atualização do contrato
        required_fields = ['freteContratado', 'freteAPagar']

        # Carrega os dados da requisição
        data = json.loads(request.body.decode('utf-8'))

        # Verifica se os campos obrigatórios estão presentes nos dados da requisição
        for field in required_fields:
            if field not in data:
                return HttpResponseBadRequest(f"Campo '{field}' é obrigatório")

        # Adiciona o usuário logado como responsável pelo cadastro
        data['usuario_cadastro'] = request.user

        # Prepara os dados para criar ou atualizar o contrato
        dados = preparar_dados(data)

        # Verifica se há um número de carta frete para decidir entre criar ou atualizar o contrato
        if dados.get("id_contrato"):
            contrato = ContratoManager.atualizar_contrato(dados.get("id_contrato"), dados)
        else:
            contrato = ContratoManager.criar_contrato(dados)
            ContratoManager.add_contrato_manifesto(dados.get('id_manifesto'),contrato.id)

        return JsonResponse({'status': 200,"contrato":contrato.to_dict()})
    except Exception as e:
        return HttpResponseBadRequest(f"Erro ao processar a requisição: {e}")

def preparar_dados(dados):
    dados_preparados = {
        "id_contrato": dados.get("idContrato", None),
        "frete_contratado": float(dados.get("freteContratado", 0)) if dados.get("freteContratado") else 0,
        "data_emissao_contrato": datetime.strptime(dados.get("dataEmissaoContrato", ""), "%Y-%m-%d") if dados.get("dataEmissaoContrato") else None,
        "numero_ciot": dados.get("numeroCiot", ""),
        "valor_pedagio": float(dados.get("valorPedagio", 0)) if dados.get("valorPedagio") else 0,
        "valor_coleta": float(dados.get("valorColeta", 0)) if dados.get("valorColeta") else 0,
        "outros_creditos": float(dados.get("outrosCreditos", 0)) if dados.get("outrosCreditos") else 0,
        "ir_retido": float(dados.get("irRetido", 0)) if dados.get("irRetido") else 0,
        "inss": float(dados.get("inss", 0)) if dados.get("inss") else 0,
        "iss": float(dados.get("iss", 0)) if dados.get("iss") else 0,
        "sest_senat": float(dados.get("sestSenat", 0)) if dados.get("sestSenat") else 0,
        "adiantamento": float(dados.get("adiantamento", 0)) if dados.get("adiantamento") else 0,
        "outros_descontos": float(dados.get("outrosDescontos", 0)) if dados.get("outrosDescontos") else 0,
        "frete_bruto": float(dados.get("freteBruto", 0)) if dados.get("freteBruto") else 0,
        "total_descontos": float(dados.get("totalDescontos", 0)) if dados.get("totalDescontos") else 0,
        "frete_a_pagar": float(dados.get("freteAPagar", 0)) if dados.get("freteAPagar") else 0,
        "contrato_obs": dados.get("contratoObs", ""),
        "usuario":dados.get("usuario_cadastro", ""), 
        "id_manifesto":dados.get("idManifesto","")
    }
    return dados_preparados

