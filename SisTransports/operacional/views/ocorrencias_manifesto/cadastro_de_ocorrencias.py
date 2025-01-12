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
from Classes.utils import dprint

class CadastroDeOcorrencias(ViewBase, View):
    def post(self, request, *args, **kwargs):
        try:
            dados = self.process_request_data(request)
            user = request.user
            tipo_de_documento = dados.get('mdlTipoDocumentoModalOcorrencia')
            id_documento = dados.get('idDocumentoModalOcorrencia')
            id_ocorrencia = dados.get('selectModalOcorrencias')
            dados['usuario_cadastro']=user

            match tipo_de_documento:
                case '1':#Coleta
                    coleta_fk = Coleta.get_obj_coleta_by_id_coleta(id_documento)
                    dtc_fk = Coleta.get_obj_dtc_by_id_coleta(id_documento)
                    dados['dtc_fk'] = dtc_fk
                    dados['coleta_fk']=coleta_fk
                    dados['cte_fk']=None
                case '2':#Cte
                    cte_fk = Cte.obtem_cte_id(id_documento)
                    dtc_fk = Cte.obtem_dtc_cte(id_documento)
                    dados['dtc_fk'] = dtc_fk
                    dados['coleta_fk']=None
                    dados['cte_fk']=cte_fk

                case '3':#Manifesto
                    manifesto_fk = ''

            dados_normalizados = prepara_dados_em_geral(dados)

            lista_ocorrencias  =[]
            ocorrencias = None
            
            TabelaOcorrencias.create_ocorrencia(dados_normalizados)
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
    
def prepara_dados_em_geral(dados):
    dtc_fk = dados.get('dtc_fk')
    data_ocorrencia = dados.get('dataOcorrenciaModalOcorrencia')
    hora_ocorrencia = dados.get('horaOcorrenciaModal')
    observacao = dados.get('observacaoModalOcorrencia')
    responsavel = dados.get('responsavelModalOcorrencia')
    usuario_cadastro = dados.get('usuario_cadastro')
    coleta_fk = dados.get('coleta_fk')
    cte_fk = dados.get('cte_fk')
    tipo = dados.get('selectModalOcorrencias')

    return{'dtc_fk':dtc_fk,
            'data_ocorrencia':data_ocorrencia,
            'hora_ocorrencia ':hora_ocorrencia ,
            'observacao':observacao,
            'responsavel':responsavel,
            'usuario_cadastro':usuario_cadastro,
            'coleta':coleta_fk,
            'cte':cte_fk,
            'tipo':tipo,
    }