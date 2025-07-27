from django.views import View
from django.http import JsonResponse, HttpResponseNotFound
from enderecos.models.filial_responsavel import FilialResponsavel
from Classes.BaseView import ViewBase  # Se ViewBase estiver em outro módulo, ajuste o import
from django.utils.decorators import method_decorator
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotFound
import json


class EntradaNFView(ViewBase, View):
    """
    View para manipular EntradaNF com os métodos GET, POST, PUT e DELETE.
    """

    def get(self, request, *args, **kwargs):
        return JsonResponse({'status':"get"}, status=200)

    def post(self, request, *args, **kwargs):
        return JsonResponse({'status': 'post', 'mensagem': 'Filial criada com sucesso.'}, status=201)

    def put(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            # Exemplo: id = data.get('id')
            return JsonResponse({'status': 'put', 'mensagem': 'Filial atualizada com sucesso.', 'data': data})
        except json.JSONDecodeError:
            return HttpResponseBadRequest('JSON inválido')

    def delete(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            # Exemplo: id = data.get('id')
            return JsonResponse({'status': 'delete', 'mensagem': 'Filial excluída com sucesso.', 'data': data})
        except json.JSONDecodeError:
            return HttpResponseBadRequest('JSON inválido')
    