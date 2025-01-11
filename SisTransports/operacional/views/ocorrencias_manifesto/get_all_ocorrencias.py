from django.views import View
from Classes.BaseView import ViewBase
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from enderecos.classes.seleciona_coletas_mapa import SelecionaEnderecosEntregaColeta
from operacional.models.ocorrencias_operacoes import CategoriaOcorrencia, TipoOcorrencia

class GetAllOcorrencias(ViewBase, View):

    def get(self, request, *args, **kwargs):
        try:
            dados = self.process_request_data(request)

            ocorrencias = TipoOcorrencia.objects.all()

            lista_ocorrencias = [ocorrencia. to_dict() for ocorrencia in ocorrencias]

            return JsonResponse({'success': True,'dados':lista_ocorrencias}, status=201)
        except:
            return JsonResponse({'success': False,'error':'Erro interno'}, status=400)