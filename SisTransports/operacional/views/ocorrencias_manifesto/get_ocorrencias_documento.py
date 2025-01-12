from django.views import View
from Classes.BaseView import ViewBase
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from operacional.models.ocorrencias_operacoes import CategoriaOcorrencia, TipoOcorrencia
from operacional.classes.cte import Cte
from operacional.classes.coleta import Coleta

class GetOcorrenciasDocumentos(ViewBase, View):

    def post(self, request, *args, **kwargs):
        try:
            dados = self.process_request_data(request)

            print(dados)

            tipo_de_documento = dados.get('tipoDocumento')

            id_documento = dados.get('idDocumento')

            lista_ocorrencias = []

            if tipo_de_documento == '1':
                ocorrencias = Coleta.get_ocorrencias_por_coleta(id_documento)
            if tipo_de_documento == '2':
                ocorrencias = Cte.get_ocorrencias_documento(id_documento)

            if ocorrencias is not None:
                for ocorrencia in ocorrencias:
                    lista_ocorrencias.append(ocorrencia.to_dict())
            return JsonResponse({'success': True,'ocorrencias':lista_ocorrencias}, status=200)

        except:
            return JsonResponse({'success': False,'error':'Erro interno'}, status=400)
