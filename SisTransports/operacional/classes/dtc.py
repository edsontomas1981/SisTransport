from operacional.models.dtc import Dtc as ClsDtc
from Classes.utils import verificaCamposObrigatorios,toFloat
from Classes.utils import checkBox,dprint,dpprint
from operacional.classes.rotas import Rota
from datetime import datetime  # Adicione esta linha para importar a classe datetime
from operacional.models.coleta import Coleta
from operacional.models.coleta_cte_ocorrencia import Ocorrencia
from django.db.models import Q



class Dtc:
    def __init__(self):
        self.dtc=ClsDtc()
    
    def salvaOuAlteraDtc(self,dados):
        self.dtc.remetente_fk=dados['remetente'] if dados['remetente'] else None
        self.dtc.destinatario_fk=dados['destinatario']
        self.dtc.tipoFrete=dados['modalidadeFrete']
        self.dtc.tomador_fk=dados['tomador']
        if dados['consignatario'] :
            self.dtc.consignatario_fk=dados['consignatario']
        else:
            self.dtc.consignatario_fk=None
        if dados['rota'] : 
            self.dtc.rota_fk=dados['rota']            
    
    def createDtc(self,dados):
        try:
            self.salvaOuAlteraDtc(dados)
            self.dtc.data_cadastro = datetime.now()
            self.dtc.save()

        except:
            return 300
    
    def readDtc(self,idDtc):
        if ClsDtc.objects.filter(id=idDtc).exists():
            dtc=ClsDtc.objects.filter(id=idDtc).get()  
            if dtc.coleta_fk:
                coleta = Coleta.objects.get(id=dtc.coleta_fk.id)
                dtc.coleta_fk = coleta
            self.dtc=dtc
    
    def updateDtc(self, dados, idDtc):
        if ClsDtc.objects.filter(id=idDtc).exists():
            self.dtc = ClsDtc.objects.get(id=idDtc)

            fields_to_update = ['consignatario', 'remetente', 'destinatario', 'modalidadeFrete', 'tomador', 'rota']
            for field in fields_to_update:
                if field in dados:
                    if field == 'tipoFrete':
                        setattr(self.dtc, field, dados[field])
                    else:
                        setattr(self.dtc, f'{field}_fk', dados[field] if dados[field] else None)
                        
            self.dtc.tipoFrete=dados['modalidadeFrete']
            self.dtc.save()
            return 200
        else:
            return 400
        
    def anexaColeta(self,idDtc,coleta):
        try:
            if ClsDtc.objects.filter(id=idDtc).exists():
                self.dtc=ClsDtc.objects.filter(id=idDtc).get() 
                self.dtc.coleta_fk=coleta
                self.dtc.save()
                return 200
        except:
            return 300
        
    def deleteRota(self,idRota):
        pass
    
    def to_dict(self):
        return self.dtc.to_dict()
    
    @staticmethod
    def buscar_registros_com_filtro(data_inicial, data_final, ordenar_por=1,filtrar = 0, rota_id=0 ):
        try:
            # primeiro seleciona o periodo
            registros = ClsDtc.objects.filter(
                coleta_fk__isnull=False,
                data_cadastro__range=(data_inicial, data_final)
            )

            # Aplicar filtros adicionais
            if int(filtrar) == 1:  # Em aberto
                registros = registros.filter(coleta_fk__status=int(filtrar))
            elif int(filtrar) == 2:  # Coletados
                    registros = registros.filter(coleta_fk__status=int(filtrar))
            elif int(filtrar) == 3:  # Em rota
                    registros = registros.filter(coleta_fk__status=int(filtrar))
                
            if rota_id.strip():  # Verifica se rota_id não está vazio
                if int(rota_id) != 0:  # Se não for "Todos"
                    registros = registros.filter(rota_fk__id=int(rota_id))

            # Adicione mais condições conforme necessário para outros filtros

            # Ordenar
            if int(ordenar_por) == 2:  # Remetente
                registros = registros.order_by('remetente_fk__raz_soc')
            elif int(ordenar_por) == 3:  # Destinatário
                registros = registros.order_by('destinatario_fk__raz_soc')
            else:  # Data (padrão)
                registros = registros.order_by('data_cadastro')

            return registros
        except Exception as e:
            # Log ou trate a exceção conforme necessário
            raise
    
    @classmethod
    def obter_dtc_id(cls, idDtc):
        """
        Obtém um objeto ClsDtc pelo seu ID.

        Args:
            idDtc (int): O ID do ClsDtc a ser obtido.

        Returns:
            ClsDtc: O objeto ClsDtc correspondente ao ID fornecido.

        Raises:
            ClsDtc.DoesNotExist: Se o objeto ClsDtc com o ID fornecido não existir.
            ValueError: Se o ID fornecido não for um inteiro positivo.
        """
        # if not isinstance(idDtc, int) or idDtc <= 0:
        #     raise ValueError("O ID deve ser um inteiro positivo.")

        try:
            return ClsDtc.objects.get(id=int(idDtc))
        except ClsDtc.DoesNotExist:
            return None

    @staticmethod
    def buscar_dtc_por_numero_coleta(numero_coleta):
        """
        Busca um DTC pelo número da coleta.

        Args:
            numero_coleta (str): O número da coleta.

        Returns:
            ClsDtc: O DTC correspondente ao número da coleta, se existir.
            None: Caso não encontre nenhuma coleta ou DTC.

        Raises:
            ValueError: Se nenhum DTC for encontrado para a coleta.
        """
        try:

            # Buscar o DTC associado à coleta
            dtc = ClsDtc.objects.filter(coleta_fk=numero_coleta).first()
            if dtc:
                return dtc
            else:

                return None
                # raise ValueError(f"Nenhum DTC encontrado para a coleta com número {numero_coleta}.")
        
        except Coleta.DoesNotExist:
            raise ValueError(f"Nenhuma coleta encontrada com o número {numero_coleta}.")
        
    @staticmethod
    def obtem_ocorrencias_dtc(idDtc):
        """
        Obtém as ocorrências associadas a um DTC específico.

        Args:
            idDtc (int): O ID do DTC.

        Returns:
            list: Uma lista de dicionários contendo as ocorrências do DTC.
        """
        ocorrencias = Ocorrencia.objects.filter(dtc_fk=idDtc).order_by('-data_ocorrencia')
        return [ocorrencia.to_dict() for ocorrencia in ocorrencias]
    
    @staticmethod
    def buscar_dtc_por_trechos_cnpj(trecho):
        """
        Busca DTCs onde o remetente ou o destinatário contenham o trecho informado.

        Args:
            trecho (str): O trecho a ser buscado (CNPJ ou razão social).

        Returns:
            QuerySet: Um QuerySet com os DTCs que atendem aos critérios.
        """
        try:
            # Filtrar por CNPJ ou razão social tanto no remetente quanto no destinatário
            dtcs = ClsDtc.objects.filter(
                Q(remetente_fk__cnpj_cpf__icontains=trecho) | 
                Q(destinatario_fk__cnpj_cpf__icontains=trecho)
            )
            return dtcs
        except Exception as e:
            return None
        
    @staticmethod
    def buscar_dtc_por_trechos_razao(trecho):
        """
        Busca DTCs onde o remetente ou o destinatário contenham o trecho informado.

        Args:
            trecho (str): O trecho a ser buscado (CNPJ ou razão social).

        Returns:
            QuerySet: Um QuerySet com os DTCs que atendem aos critérios.
        """
        try:
            # Filtrar por CNPJ ou razão social tanto no remetente quanto no destinatário
            dtcs = ClsDtc.objects.filter(
                Q(remetente_fk__raz_soc__icontains=trecho) | 
                Q(destinatario_fk__raz_soc__icontains=trecho)
            )
            return dtcs
        except Exception as e:
            return None