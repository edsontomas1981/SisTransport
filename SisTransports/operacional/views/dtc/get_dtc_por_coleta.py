from django.views import View
from Classes.BaseView import ViewBase
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from enderecos.classes.seleciona_coletas_mapa import SelecionaEnderecosEntregaColeta

from operacional.classes.dtc import Dtc

class GetDtcPorColeta(ViewBase, View):

    def get(self, request, *args, **kwargs):
        dados = self.process_request_data(request)

        dtc = Dtc.buscar_dtc_por_numero_coleta(63)

        # pontos_atendimento = carrega_coordenadas_pontos_atendimento()
        return JsonResponse({'success': True,'dadosDtc':dtc.to_dict()}, status=201)