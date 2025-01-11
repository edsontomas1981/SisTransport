from django.views import View
from Classes.BaseView import ViewBase
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
from enderecos.classes.seleciona_coletas_mapa import SelecionaEnderecosEntregaColeta
from operacional.models.ocorrencias_operacoes import CategoriaOcorrencia, TipoOcorrencia
from operacional.classes.TabelaOcorrencias import TabelaOcorrencias
from operacional.classes.dtc import Dtc
from operacional.classes.manifesto import Manifesto 
from operacional.classes.coleta import Coleta
from operacional.classes.cte import Cte

class CadastroDeOcorrencias(ViewBase, View):

    def post(self, request, *args, **kwargs):
        try:
            dados = self.process_request_data(request)

            print(dados)

            user = request.user

            tipo_de_documento = dados.get('mdlTipoDocumentoModalOcorrencia')

            id_documento = dados.get('idDocumentoModalOcorrencia')

            id_ocorrencia = dados.get('selectModalOcorrencias')

            match tipo_de_documento:
                case '1':#Coleta
                    coleta_fk = Coleta.get_dtc_by_id_coleta(id_documento)
                    dtc_fk = Coleta.get_obj_dtc_by_id_coleta(id_documento)
                    print(dtc_fk)
                case '2':#Cte
                    cte_fk = Cte.obtem_cte_id(id_documento)
                    dtc_fk = Cte.obtem_dtc_cte(id_documento)

                    print(dtc_fk)
                case '3':#Manifesto
                    manifesto_fk = ''

            #     case _:
            #         return JsonResponse({'success': False, 'error': 'Tipo de documento inválido'}, status=400)
            

            # Campos obrigatórios para adicionar um motorista a um manifesto
            # required_fields = ['cpfMotorista', 'idManifesto']


            # Verifica se o JSON possui todos os campos obrigatórios
            # for field in required_fields:
            #     if field not in dados or not dados[field]:
            #         return JsonResponse({'status': 422, 'error': f'O campo {field} é obrigatório.'})
                
            # ocorrencias = TipoOcorrencia.
            return JsonResponse({'success': True}, status=200)
        except:
            return JsonResponse({'success': False,'error':'Erro interno'}, status=400)
    
    def preparaDadosEmGeral(dados):
        dtc_fk = Dtc.obter_dtc_id(dados.get('dtc_fk'))
        data_ocorrencia = dados.get('dataOcorrenciaModalOcorrencia')
        hora_ocorrencia = dados.get('horaOcorrenciaModal')
        observacao = dados.get('observacaoModalOcorrencia')
        responsavel = dados.get('responsavelModalOcorrencia')
        usuario_cadastro = dados.get('usuario_cadastro')

        return{'dtc_fk':dtc_fk,
                'data_ocorrencia':data_ocorrencia,
                'hora_ocorrencia ':hora_ocorrencia ,
                'observacao':observacao,
                'responsavel':responsavel,
                'usuario_cadastro':usuario_cadastro,
        }