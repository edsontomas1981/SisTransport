from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
import json

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def get_documentos(request):
    try:
        print(request.user)
        dados = [
            { "idDtc": 451851, "razao_social": 'Poh sei lá Coorp SEM ', 'endereco': 'Rua Teste', "bairro": "Bairro Teste", 'cidade': 'Cidade Teste', 'uf': 'SP' },
            { "idDtc": 451852, "razao_social": 'Beta Technologies', 'endereco': 'Avenida Central', "bairro": "Centro", 'cidade': 'São Paulo', 'uf': 'SP' },
            { "idDtc": 451853, "razao_social": 'Gamma Solutions', 'endereco': 'Rua da Alegria', "bairro": "Vila Nova", 'cidade': 'Rio de Janeiro', 'uf': 'RJ' },
            { "idDtc": 451854, "razao_social": 'Delta Enterprises', 'endereco': 'Avenida Paulista', "bairro": "Bela Vista", 'cidade': 'São Paulo', 'uf': 'SP' },
            { "idDtc": 451855, "razao_social": 'Epsilon Systems', 'endereco': 'Rua das Flores', "bairro": "Jardim das Flores", 'cidade': 'Belo Horizonte', 'uf': 'MG' },
            { "idDtc": 451856, "razao_social": 'Zeta Holdings', 'endereco': 'Rua do Mercado', "bairro": "Centro", 'cidade': 'Porto Alegre', 'uf': 'RS' },
            { "idDtc": 451857, "razao_social": 'Eta Industries', 'endereco': 'Avenida Atlântica', "bairro": "Copacabana", 'cidade': 'Rio de Janeiro', 'uf': 'RJ' },
            { "idDtc": 451858, "razao_social": 'Theta Corp', 'endereco': 'Rua dos Pinheiros', "bairro": "Pinheiros", 'cidade': 'São Paulo', 'uf': 'SP' },
            { "idDtc": 451859, "razao_social": 'Iota Ventures', 'endereco': 'Avenida Brasil', "bairro": "Vila Brasil", 'cidade': 'Brasília', 'uf': 'DF' },
            { "idDtc": 451860, "razao_social": 'Kappa Solutions', 'endereco': 'Rua da Esperança', "bairro": "Esperança", 'cidade': 'Recife', 'uf': 'PE' },
            { "idDtc": 451861, "razao_social": 'Lambda Enterprises', 'endereco': 'Avenida das Américas', "bairro": "Barra da Tijuca", 'cidade': 'Rio de Janeiro', 'uf': 'RJ' }
        ]

        return JsonResponse({'dados':dados})
   
    except ValidationError as ve:
        return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})
    
    except Exception as e:
        return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})