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
            tipo = TipoOcorrencia.objects.get(id=dados.get('tipo'))
            coleta = dados.get('coleta',{})
            dtc = dados.get('dtc')
            cte = dados.get('cte',None)
            usuario = dados.get('usuario_cadastro')
            ocorrencia = Ocorrencia.objects.create(tipo_ocorrencia_fk=tipo, 
                                                coleta_fk=coleta, dtc_fk=dtc, 
                                                cte_fk=cte,
                                                usuario_cadastro=usuario)
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


        
        
