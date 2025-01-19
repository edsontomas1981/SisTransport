from operacional.models.coleta_cte_ocorrencia import Ocorrencia
from operacional.models.ocorrencias_operacoes import TipoOcorrencia

class TabelaOcorrencias:
    def __init__(self):
        pass

    @staticmethod
    def create_ocorrencia(dados):
        """
        Cria uma nova ocorrência de operações com os dados fornecidos.
        """
        try:
            dtc = dados.get('dtc_fk')
            data_ocorrencia = dados.get('data_ocorrencia')
            hora_ocorrencia = dados.get('hora_ocorrencia')
            observacao = dados.get('observacao')
            responsavel = dados.get('responsavel')
            tipo = TipoOcorrencia.objects.get(id=dados.get('tipo'))
            coleta = dados.get('coleta',{})
            cte = dados.get('cte',None)
            usuario = dados.get('usuario_cadastro')

            ocorrencia = Ocorrencia.objects.create(tipo_ocorrencia_fk=tipo, 
                                                coleta_fk=coleta, dtc_fk=dtc, 
                                                cte_fk=cte,usuario_cadastro=usuario,
                                                data_ocorrencia=data_ocorrencia,
                                                hora_ocorrencia=hora_ocorrencia,
                                                observacao=observacao,
                                                responsavel=responsavel)
            return 201
        except:
            return 300
    
    @staticmethod
    def get_ultima_ocorrencia(tipoDocumento, idDocumento,idOcorrencia=None):
        match tipoDocumento:
            case 'coleta':
                if Ocorrencia.objects.filter(coleta_fk = idDocumento).exists():
                    ocorrencia = Ocorrencia.objects.filter(coleta_fk = idDocumento).order_by('id').last()
                    return ocorrencia.tipo_ocorrencia_fk.id == idOcorrencia if True else False
            case 'cte':
                if Ocorrencia.objects.filter(cte_fk = idDocumento).exists():
                    ocorrencia = Ocorrencia.objects.filter(cte_fk = idDocumento).order_by('id').last()
                    return ocorrencia.tipo_ocorrencia_fk.id == idOcorrencia if True else False
                
    @staticmethod
    def get_ocorrencias_por_documento(tipo_documento,id_documento):
        match tipo_documento:
            case '1':#Coleta
                try:
                    ocorrencias = Ocorrencia.objects.filter(coleta_fk=id_documento).order_by('id')
                    return ocorrencias
                except:
                    return 404
                    
            case '2':#Cte
                # try:
                print(id_documento)
                ocorrencias = Ocorrencia.objects.filter(cte_fk=id_documento).order_by('id')
                return ocorrencias
                # except:
                #     return 404
                
    @staticmethod
    def get_ocorrencias_por_dtc(id_dtc):
        try:
            ocorrencias = Ocorrencia.objects.filter(dtc_fk=id_dtc).order_by('id')
            return ocorrencias
        except:
            return 404
                    
        
        
