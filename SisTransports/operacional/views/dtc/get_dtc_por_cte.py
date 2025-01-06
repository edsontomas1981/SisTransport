from django.views import View
from operacional.classes.cte import Cte
from Classes.BaseView import ViewBase
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
import random
from enderecos.classes.seleciona_coletas_mapa import SelecionaEnderecosEntregaColeta



class GetDtcPorCte(ViewBase, View):
    def get(self, request, *args, **kwargs):
        dados = self.process_request_data(request)

        dtc = Cte.obtem_cte_id(31)
        # pontos_atendimento = carrega_coordenadas_pontos_atendimento()
        return JsonResponse({'success': True,'dadosDtc':dtc.to_dict()}, status=201)
