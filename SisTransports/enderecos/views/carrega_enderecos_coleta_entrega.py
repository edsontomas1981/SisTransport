from django.views import View
from operacional.classes.cte import Cte
from faturamento.classes.FaturasManager import FaturasManager
from Classes.BaseView import ViewBase
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError

class CarregaEnderecosColetaEntrega(ViewBase, View):
    def post(self, request, *args, **kwargs):
        dados = self.process_request_data(request)
        return JsonResponse({'success': True}, status=201)