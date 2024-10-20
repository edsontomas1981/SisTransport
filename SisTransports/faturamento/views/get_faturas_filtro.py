from django.views import View
from operacional.classes.cte import Cte
from faturamento.classes.FaturasManager import FaturasManager
from Classes.BaseView import ViewBase
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError

class GetFaturasCriterios(ViewBase, View):

    def post(self, request, *args, **kwargs):
        """
        Implementação do método POST.
        Adiciona novos critérios de fatura.
        """
        dados = self.process_request_data(request)

        fatura = FaturasManager()

        faturas = fatura.read_faturas()

        FaturasManager.get_faturas_filtro(faturas,dados)
        # Sua lógica para adicionar critérios de fatura vai aqui.
        return JsonResponse({'success': True,'teste':'post'}, status=201)
