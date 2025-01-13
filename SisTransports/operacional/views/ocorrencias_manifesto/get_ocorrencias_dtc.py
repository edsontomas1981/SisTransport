from django.views import View
from Classes.BaseView import ViewBase
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from operacional.models.ocorrencias_operacoes import CategoriaOcorrencia, TipoOcorrencia
from operacional.classes.dtc import Dtc

class GetOcorrenciasDtc(ViewBase, View):

    def post(self, request, *args, **kwargs):
        try:
            dados = self.process_request_data(request)

            id_dtc = int(dados.get('id_dtc'))

            dtc = Dtc.obter_dtc_id(id_dtc)

            ocorrencias = Dtc.obtem_ocorrencias_dtc(id_dtc)

            cnpj_rem  = dtc.to_dict().get('remetente').get('cnpj_cpf')
            cnpj_dest = dtc.to_dict().get('destinatario').get('cnpj_cpf')
            cnpj_tom  = dtc.to_dict().get('tomador').get('cnpj_cpf')
            razao_rem = dtc.to_dict().get('remetente').get('raz_soc')
            razao_dest= dtc.to_dict().get('destinatario').get('raz_soc')
            razao_tom = dtc.to_dict().get('tomador').get('raz_soc')
            
            dict_dtc= {'cnpjRemetente':cnpj_rem,'razaoRemetente':razao_rem,
                                  'cnpjDestinatario':cnpj_dest,'razaoDestinatario':razao_dest,
                                  'cnpjTomador':cnpj_tom,'razaoTomador':razao_tom}
            
            dict_ocorrencias = {'ocorrencias':ocorrencias,'dtc':dict_dtc}
            
            return JsonResponse({'success': True,'dtc':dict_ocorrencias}, status=200)

        except:
            return JsonResponse({'success': False,'error':'Erro interno'}, status=400)
