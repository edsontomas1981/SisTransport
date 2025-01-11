from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
from operacional.classes.ocorrencias_manifesto import Ocorrencia_manifesto
import json

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def get_json_ocorrencias(request):
    try:
        dados = get_json_ocorrencias()

        return JsonResponse({'status': 200,'ocorrencias':dados})

    except ValidationError as ve:
        return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})
    
    except Exception as e:
        return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})
    
def get_json_ocorrencias():
    return {
            "ocorrencias": {
                "OR": [
                { "codigo": "OR01", "descricao": "Operação realizada com sucesso !" },
                { "codigo": "OR02", "descricao": "Operação parcial" },
                { "codigo": "OR03", "descricao": "Operação fora do prazo" },
                { "codigo": "OR04", "descricao": "Recebido com avaria" },
                { "codigo": "OR05", "descricao": "Recebido com divergência" },
                { "codigo": "OR06", "descricao": "Assinatura recusada" },
                { "codigo": "OR07", "descricao": "Recebido por terceiros" }
                ],
                "ONR": [
                { "codigo": "ONR01", "descricao": "Destinatário/remetente ausente" },
                { "codigo": "ONR02", "descricao": "Endereço não encontrado" },
                { "codigo": "ONR03", "descricao": "Recusa da mercadoria" },
                { "codigo": "ONR04", "descricao": "Falta de acesso" },
                { "codigo": "ONR05", "descricao": "Devolução solicitada" },
                { "codigo": "ONR06", "descricao": "Problemas com a documentação" },
                { "codigo": "ONR07", "descricao": "Veículo impedido" }
                ],
                "ONRR": [
                { "codigo": "ONRR01", "descricao": "Coleta não planejada para a rota" },
                { "codigo": "ONRR02", "descricao": "Entrega não planejada para a rota" },
                { "codigo": "ONRR03", "descricao": "Cliente solicitou cancelamento antes da saída" },
                { "codigo": "ONRR04", "descricao": "Documentação pendente antes da saída" },
                { "codigo": "ONRR05", "descricao": "Carga incompatível com veículo planejado" },
                { "codigo": "ONRR06", "descricao": "Prioridade alterada, retirado da rota" },
                { "codigo": "ONRR07", "descricao": "Erro no planejamento de rotas" },
                { "codigo": "ONRR08", "descricao": "Capacidade do veículo excedida, operação adiada" }
                ],
                "OO": [
                { "codigo": "OO01", "descricao": "Extravio de mercadoria" },
                { "codigo": "OO02", "descricao": "Roubo ou furto" },
                { "codigo": "OO03", "descricao": "Danos no transporte" },
                { "codigo": "OO04", "descricao": "Cancelamento da operação" },
                { "codigo": "OO05", "descricao": "Reagendamento solicitado" },
                { "codigo": "OO06", "descricao": "Carga incompatível" },
                { "codigo": "OO07", "descricao": "Problema no veículo" },
                { "codigo": "OO08", "descricao": "Carga redespachada" },
                { "codigo": "OO09", "descricao": "Operação condicionada a pagamento" },
                { "codigo": "OO10", "descricao": "Erro de roteirização" }
                ]
            }
            }
