from django.views import View
from django.http import JsonResponse, HttpResponseNotFound
from Classes.BaseView import ViewBase  # Se ViewBase estiver em outro módulo, ajuste o import
from django.utils.decorators import method_decorator
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotFound
from parceiros.classes.parceiros import Parceiros
from enderecos.classes.filial_responsavel import FilialResponsavelManager
import json


class FilialResponsavelView(ViewBase, View):
    """
    View para manipular FilialResponsavel com os métodos GET, POST, PUT e DELETE.
    """

    def get(self, request, *args, **kwargs):
        filiais = FilialResponsavelManager.read_all()
        return JsonResponse({'status':"get", 'data': filiais}, status=200)

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        parceiro,response = Parceiros.get_parceiro_cnpj(data.get('cnpjCadastroFiliais'))
        if parceiro is None:
            return JsonResponse({'status': 404, 'mensagem': 'parceiro não encontrado.'})
        
        filial = FilialResponsavelManager.create({
            'filial_responsavel': data.get('filialResponsavelMdlFiliais'),
            'parceiro': parceiro,
            'telefone': data.get('telefoneMdlFiliais'),
            'email': data.get('emailMdlFiliais'),
            'responsavel': data.get('responsavelMdlFiliais')
        })
        
        return JsonResponse({'status': 200, 'mensagem': 'Filial criada com sucesso.'})

    def put(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            # Exemplo: id = data.get('id')
            return JsonResponse({'status': 200, 'mensagem': 'Filial atualizada com sucesso.', 'data': data})
        except json.JSONDecodeError:
            return HttpResponseBadRequest('JSON inválido')

def delete(self, request, *args, **kwargs):
    try:
        data = json.loads(request.body)
        # Exemplo: id = data.get('id')
        return JsonResponse({'status': 200, 'mensagem': 'Filial excluída com sucesso.', 'data': data})
    except json.JSONDecodeError:
        return HttpResponseBadRequest('JSON inválido')
    