from django.views import View
from Classes.BaseView import ViewBase
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from operacional.classes.coleta import Coleta


class GetColetaByDtc(ViewBase, View):
    def post(self, request, *args, **kwargs):
        try:
            dados = self.process_request_data(request)
            coleta = Coleta()
            dict_coleta = coleta.get_coleta_by_idDtc(dados.get('idDtc'))
            return JsonResponse({'success': True,'coleta':dict_coleta}, status=201)
        except Exception as e:
            return HttpResponseServerError({'success': False, 'message': str(e)}, status=500)
        