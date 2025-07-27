from django.views import View
from operacional.classes.cte import Cte
from Classes.BaseView import ViewBase
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from enderecos.classes.seleciona_coletas_mapa import SelecionaEnderecosEntregaColeta

class CarregaEnderecosColetaEntrega(ViewBase, View):
    def get(self, request, *args, **kwargs):
        dados = self.process_request_data(request)

        pontos_instance = SelecionaEnderecosEntregaColeta()
        pontos_ativos = pontos_instance.select_pontos_de_atendimento()
        pontos_atendimento = pontos_ativos
        
        # pontos_atendimento = carrega_coordenadas_pontos_atendimento()
        return JsonResponse({'success': True,'pontos_atendimento':pontos_atendimento}, status=201)
   
