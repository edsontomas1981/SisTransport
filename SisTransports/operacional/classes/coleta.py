from operacional.models.coleta import Coleta  as MdlColeta
from operacional.classes.dtc import Dtc
from operacional.models.dtc import Dtc as ClsDtc
from Classes.utils import toFloat
from django.core.exceptions import ObjectDoesNotExist
from enderecos.classes.carrega_coordenadas import carrega_coordenadas
from operacional.models.coleta_cte_ocorrencia import Ocorrencia
from operacional.classes.TabelaOcorrencias import TabelaOcorrencias


class Coleta(): 
    def __init__(self):
        self.obj_coleta=MdlColeta()

    def saveOrUpdate(self,dados):
        self.obj_coleta.notaFiscal= dados['nf']
        self.obj_coleta.volume= dados['volume']
        self.obj_coleta.peso=dados['peso']
        self.obj_coleta.valor=toFloat(dados['valor'])
        self.obj_coleta.cubM3 =toFloat(dados['m3'])
        self.obj_coleta.veiculo=dados['veiculo']
        self.obj_coleta.tipo=dados['tipoMercadoria']
        self.obj_coleta.horario=dados['horario']
        self.obj_coleta.especie=dados['especie']
        self.obj_coleta.observacao=dados['obs']
        self.obj_coleta.nome=dados['nomeContato']
        self.obj_coleta.contato=dados['numeroContato']
        self.obj_coleta.cep=dados['cep']
        self.obj_coleta.rua=dados['rua']
        self.obj_coleta.numero=dados['numero']
        self.obj_coleta.complemento=dados['complemento']
        self.obj_coleta.bairro=dados['bairro']
        self.obj_coleta.cidade=dados['cidade']
        self.obj_coleta.uf=dados['uf']
        self.obj_coleta.usuario_cadastro=dados['usuario_cadastro']

 
    def readColetaId(self,idColeta):
        if MdlColeta.objects.filter(id=idColeta).exists():
            self.obj_coleta=MdlColeta.objects.filter(id=idColeta).get()

    def readColetaParceiro(self):
        pass

    def createColeta(self,dados):
        # try:
            dtc=Dtc()
            dtc.readDtc(dados['dtc'])
            if dtc.dtc.coleta_fk:
                if MdlColeta.objects.filter(id=dtc.dtc.coleta_fk.id).exists():
                    self.obj_coleta=MdlColeta.objects.filter(id=dtc.dtc.coleta_fk.id).get()
                    self.saveOrUpdate(dados)
                    self.obj_coleta.save()
                    self._add_lat_lng(self.obj_coleta.id)
                    dtc.anexaColeta(dados['dtc'],self.obj_coleta)
                    Coleta.gera_ocorrencia_cte(self.obj_coleta,33,dados.get('usuario_cadastro'))
                    return 201
            else:
                self.saveOrUpdate(dados)
                self.obj_coleta.save()
                self._add_lat_lng(self.obj_coleta.id)
                dtc.anexaColeta(dados['dtc'],self.obj_coleta)
                Coleta.gera_ocorrencia_cte(self.obj_coleta,33,dados.get('usuario_cadastro'))
                return 200
        # except:
        #     return 300
        
    def updateColeta(self,idColeta,dados):
        dtc=Dtc()
        dtc.readDtc(dados['dtc'])
        if MdlColeta.objects.filter(id=idColeta).exists():
            self.obj_coleta=MdlColeta.objects.filter(id=idColeta).get()
            self.saveOrUpdate(dados)
            self.obj_coleta.save()
            dtc.anexaColeta(dados['dtc'],self.obj_coleta)
            return 200 
        
    def deleteColeta(self,idColeta):
        if MdlColeta.objects.filter(id=idColeta).exists():
            self.coleta=MdlColeta.objects.filter(id=idColeta).get()
            if ClsDtc.objects.filter(coleta_fk=idColeta).exists():
                dtc=ClsDtc.objects.filter(coleta_fk=idColeta).get()
                dtc.coleta_fk=None
                dtc.save()
                self.coleta.delete()

    def getColetasAtivas(self):
        """
        Retorna todas as coletas cujo status seja igual a 1.
        
        Returns:
            QuerySet: Uma lista de objetos MdlColeta com status = 1.
        """
        try:
            coletas_ativas = MdlColeta.objects.filter(status=1)
            return coletas_ativas
        except Exception as e:
            return []
    
    @staticmethod
    def update_status_coleta(id_coleta, status):
        try:
            coleta = MdlColeta.objects.get(id=id_coleta)
            coleta.status = status
            coleta.save()
            return 200
        except ObjectDoesNotExist:
            return None
        
    @staticmethod
    def get_coleta_by_idDtc(id_dtc):
        try:
            dtc = ClsDtc.objects.get(id=id_dtc)
            coleta = dtc.to_dict().get('coleta')
            return coleta
        except ObjectDoesNotExist:
            return None
    
    @staticmethod
    def get_dtc_by_id_coleta(id_coleta):
        try:
            dtc = ClsDtc.objects.get(coleta_fk=id_coleta)
            coleta = dtc.to_dict().get('coleta')
            return coleta
        except ObjectDoesNotExist:
            return None
        
    @staticmethod
    def get_obj_dtc_by_id_coleta(id_coleta):
        try:
            dtc = ClsDtc.objects.get(coleta_fk=id_coleta)
            
            return dtc
        except ObjectDoesNotExist:
            return None   

    @staticmethod
    def get_obj_coleta_by_id_coleta(id_coleta):
        try:
            coleta = MdlColeta.objects.filter(id=id_coleta).get()      
            return coleta
        except ObjectDoesNotExist:
            return None
        
    # Método para adicionar latitude e longitude às coletas
    def _add_lat_lng(self, coleta_id):
        """
        Adiciona latitude e longitude ao registro de uma coleta com base no endereço cadastrado.

        Parâmetros:
            coleta_id (int): O ID da coleta que será atualizada.

        Retorno:
            dict: Resultado da operação contendo o status e uma mensagem de sucesso ou erro.
        """
        try:
            # Busca a coleta pelo ID
            coleta = MdlColeta.objects.get(id=coleta_id)

            # Monta o endereço completo para geocodificação
            
            endereco = f"{coleta.rua}, {coleta.numero}, {coleta.bairro}, {coleta.cidade} - {coleta.uf}"
            
            # Obtém as coordenadas usando a função carrega_coordenadas
            coordenadas = carrega_coordenadas(endereco)

            if coordenadas:
                latitude, longitude = coordenadas
                coleta.lat = latitude
                coleta.lng = longitude
                coleta.save()
                return {"status": 200, "message": "Coordenadas adicionadas com sucesso."}
            else:
                return {"status": 400, "message": "Não foi possível obter as coordenadas para o endereço fornecido."}

        except MdlColeta.DoesNotExist:
            return {"status": 404, "message": "Coleta não encontrada."}
        except Exception as e:
            return {"status": 500, "message": f"Erro ao adicionar coordenadas: {str(e)}"}
        
    @staticmethod
    def _get_ultima_ocorrencia(id_coleta):
        
        ocorrencia = Ocorrencia.objects.filter(coleta_fk = id_coleta).order_by('id').last()
        return ocorrencia
    
    @staticmethod
    def _ultima_ocorrencia_e_igual_ocorrencia_a_ser_cadastrada(id_coleta,id_ocorrencia) :
        ultima_ocorrencia = Coleta._get_ultima_ocorrencia(id_coleta)

        if not ultima_ocorrencia:
            return False  
        
        return True if ultima_ocorrencia.tipo_ocorrencia_fk.id == id_ocorrencia or not ultima_ocorrencia else False    
    
    @staticmethod
    def gera_ocorrencia_cte (coleta,id_ocorrencia,usuario):
        if not Coleta._ultima_ocorrencia_e_igual_ocorrencia_a_ser_cadastrada(coleta.id,id_ocorrencia):
            ocorrencia = TabelaOcorrencias()
            dtc = Coleta.get_dtc_by_id_coleta(coleta.id)
            dtc = Dtc.obter_dtc_id(dtc.get('id'))
            dados = {
                'tipo': 33,
                'coleta': coleta,
                'cte': None,
                'dtc': dtc,
                'usuario_cadastro':usuario,
            }
            ocorrencia.create_ocorrencia(dados)
    @staticmethod
    def get_ocorrencias_por_coleta(id_documento):
        try:
            ocorrencias = TabelaOcorrencias.get_ocorrencias_por_documento('1',id_documento)
            return ocorrencias
        except ObjectDoesNotExist:
            return None
