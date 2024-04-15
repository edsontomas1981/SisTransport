from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from Classes.utils import checaCampos
from operacional.classes.rotas import Rota
from enderecos.classes.enderecos import Enderecos
import json

def preparaDadosEndereco(dados, prefixo):
    """
    Função auxiliar para preparar os dados de endereço.

    Parâmetros:
    - dados: Dicionário contendo os dados da rota.
    - prefixo: Prefixo para os campos de endereço ('origem' ou 'destino').

    Retorna:
    - dict: Dados do endereço prontos para usar.
    """
    return {
        "cep": dados.get(f"cep{prefixo.capitalize()}"),
        "logradouro": dados.get(f"logradouro{prefixo.capitalize()}"),
        "numero": dados.get(f"numero{prefixo.capitalize()}"),
        "complemento": dados.get(f"complemento{prefixo.capitalize()}"),
        "bairro": dados.get(f"bairro{prefixo.capitalize()}"),
        "cidade": dados.get(f"cidade{prefixo.capitalize()}"),
        "estado": dados.get(f"uf{prefixo.capitalize()}"),
    }

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def createRota(request):
    """
    View para criar uma nova rota.

    Parâmetros:
    - request: HttpRequest contendo os dados da rota a ser criada no corpo da requisição.

    Retorna:
    - JsonResponse: Retorna um JSON com o status da operação.
    """
    try:
        # Carregar os dados da requisição
        data = json.loads(request.body.decode('utf-8'))
        data['usuario_cadastro'] = request.user 

        # Criar instâncias de Enderecos
        enderecoOrigem = Enderecos() 
        enderecoDestino = Enderecos()

        # Preparar dados de endereço
        dadosEnderecoOrigem = preparaDadosEndereco(data, "origem")
        dadosEnderecoDestino = preparaDadosEndereco(data, "destino")
        
        # Criar endereços de origem e destino
        enderecoOrigem.createEndereco(dadosEnderecoOrigem)
        enderecoDestino.createEndereco(dadosEnderecoDestino)

        # Adicionar endereços ao dicionário de dados
        data['enderecoOrigem'] = enderecoOrigem.endereco
        data['enderecoDestino'] = enderecoDestino.endereco

        # Preparar dados para salvar
        dados = preparaDadosSalvar(data)
        
        # Verificar campos obrigatórios
        required_fields = ['nomeRota', 'ufOrigem', 'cidadeOrigem', 'ufDestino', 'cidadeDestino']
        for field in required_fields:
            if field not in data or not data[field]:  # Corrigido para verificar se o campo não está vazio
                return JsonResponse({'status': 422, 'error': f'O campo {field} é obrigatório.'})

        # Salvar a rota
        rota = Rota.salvaRota(dados)
        if rota == 422:
            return JsonResponse({'status': 422})  # Cadastro efetuado com sucesso    
        
        return JsonResponse({'status': 200,'dados':rota.rota.to_dict()})  # Cadastro efetuado com sucesso
    except json.JSONDecodeError:
        return JsonResponse({'status': 400, 'error': 'Erro ao decodificar o JSON.'})
    except Exception as e:
        # Capturar outros erros e retornar uma resposta genérica
        return JsonResponse({'status': 500, 'error': str(e)})
            
def preparaDadosSalvar(dados):
    return{"nome":dados.get("nomeRota"),
            "origemCidade":dados.get("cidadeOrigem"),
            "origemUF":dados.get("ufOrigem"),
            "destinoCidade":dados.get("cidadeDestino"),
            "destinoUF":dados.get("ufDestino"),
            "enderecoOrigem":dados.get("enderecoOrigem"),
            "enderecoDestino":dados.get("enderecoDestino"),
    }