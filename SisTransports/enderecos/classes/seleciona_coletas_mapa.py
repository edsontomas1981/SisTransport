from enderecos.models.endereco import Enderecos
from operacional.classes.coleta import Coleta as ClsColetas
from enderecos.classes.carrega_coordenadas import carrega_coordenadas
from operacional.classes.dtc import Dtc
from operacional.classes.cte import Cte
from enderecos.classes.enderecos import Enderecos
from operacional.classes.nota_fiscal import Nota_fiscal_CRUD


class SelecionaEnderecosEntregaColeta:
    """
    Classe responsável por selecionar endereços para entregas e coletas,
    gerenciar coletas ativas e pontos de atendimento.
    """

    def __init__(self):
        pass

    def _select_ctes(self):
        """
        Método privado para selecionar CTes.

        Returns:
            list: Lista de CTes ativos.
        """
        return Cte.obtem_ctes_em_aberto()

    def _select_coletas(self):
        """
        Método privado para selecionar coletas ativas.

        Returns:
            list: Lista de coletas ativas como dicionários.
        """
        coletas_instance = ClsColetas()
        coletas = coletas_instance.getColetasAtivas()
        return [coleta.to_dict() for coleta in coletas]

    def select_pontos_de_atendimento(self):
        """
        Seleciona os pontos de atendimento com base nas coletas ativas e suas coordenadas.

        Returns:
            list: Lista de pontos de atendimento com informações detalhadas.
        """
        pontos_de_atendimento = []
        coletas = self._select_coletas()

        for coleta in coletas:
            dtc = Dtc.buscar_dtc_por_numero_coleta(coleta.get('id'))

            if dtc:
                self._atualizar_coordenadas_se_necessario(coleta)
                pontos_de_atendimento.append(self._montar_ponto_de_atendimento_coleta(coleta, dtc))

        ctes_em_aberto = self._select_ctes()
        ctes_list = [] 

        for cte in ctes_em_aberto:
            totais = self._seleciona_totais_notas_fiscais_dtc(cte.dtc_fk.id)
            if  not cte.dtc_fk.destinatario_fk.endereco_fk.lat or not cte.dtc_fk.destinatario_fk.endereco_fk.lng:
                self._atualizar_coordenadas_se_necessario_cte(cte.id)
            ctes_list.append({
                            'lat': cte.dtc_fk.destinatario_fk.endereco_fk.lat,
                            'lng': cte.dtc_fk.destinatario_fk.endereco_fk.lng,
                            'idDtc': cte.dtc_fk.id,
                            'dadosIntinerario': {
                                'bairro': cte.dtc_fk.destinatario_fk.endereco_fk.logradouro or 'Não informado',
                                'volumes': totais.get('volumes'),
                                'valor': totais.get('valor'),
                                'peso': totais.get('peso'),
                                'remetente': cte.dtc_fk.remetente_fk.raz_soc or 'Não informado',
                                'destinatario': cte.dtc_fk.destinatario_fk.raz_soc or 'Não informado',
                                'data': cte.dtc_fk.data_ultima_atualizacao or 'Não informado',
                                'status': cte.status,
                                'tipo_atendimento':2,
                            }
                        })
            
        for cte_item in ctes_list:
            pontos_de_atendimento.append(cte_item)

        return pontos_de_atendimento

    def _atualizar_coordenadas_se_necessario(self, coleta):
        """
        Atualiza as coordenadas de uma coleta se elas não estiverem definidas.

        Args:
            coleta (dict): Dados da coleta.
        """
        if not coleta.get('lat') or not coleta.get('lng'):
            coleta_instance = ClsColetas()
            coleta_instance.readColetaId(coleta.get('id'))
            endereco = f"{coleta.get('rua')}, {coleta.get('numero')}, {coleta.get('bairro')}, {coleta.get('cidade')}, {coleta.get('uf')}"
            coords = carrega_coordenadas(endereco)
            coleta_instance.obj_coleta.lat = coords[0]
            coleta_instance.obj_coleta.lng = coords[1]
            coleta_instance.obj_coleta.save()

    def _atualizar_coordenadas_se_necessario_cte(self, id_cte):
        cte = Cte.obtem_cte_id(id_cte)    
        rua = cte.dtc_fk.destinatario_fk.endereco_fk.logradouro
        numero = cte.dtc_fk.destinatario_fk.endereco_fk.numero
        bairro = cte.dtc_fk.destinatario_fk.endereco_fk.bairro
        cidade = cte.dtc_fk.destinatario_fk.endereco_fk.cidade
        uf = cte.dtc_fk.destinatario_fk.endereco_fk.uf
        id_endereco = cte.dtc_fk.destinatario_fk.endereco_fk.id
        endereco_instance = Enderecos()

        endereco_instance.readEndereco(id_endereco)

        endereco = f"{rua}, {numero}, {bairro}, {cidade}, {uf}"
        coords = carrega_coordenadas(endereco)
        endereco_instance.endereco.lat = coords[0]
        endereco_instance.endereco.lng = coords[1]
        endereco_instance.endereco.save()

    def _seleciona_totais_notas_fiscais_dtc(self,id):
        notas = Nota_fiscal_CRUD.get_notas_por_id_dtc(id)
        volumes = 0
        peso = 0
        valor = 0
        for nota in notas:
            volumes += int(nota.volume)
            peso += float(nota.peso)
            valor += float(nota.valor_nf)

        return {
            'volumes':volumes,
            'peso':peso,
            'valor':valor
        }

    def _montar_ponto_de_atendimento_coleta(self, coleta, dtc):
        """
        Monta o dicionário com as informações de um ponto de atendimento.

        Args:
            coleta (dict): Dados da coleta.
            dtc (Dtc): Objeto DTC associado à coleta.

        Returns:
            dict: Informações do ponto de atendimento.
        """
        dtc_dict = dtc.to_dict()

        return {
            'lat': coleta.get('lat'),
            'lng': coleta.get('lng'),
            'idDtc': dtc_dict.get('id'),
            'dadosIntinerario': {
                'bairro': coleta.get('bairro') or 'Não informado',
                'volumes': coleta.get('volume') or 0,
                'valor': coleta.get('valor') or 0.0,
                'peso': coleta.get('peso') or 0.0,
                'remetente': dtc_dict.get('remetente', {}).get('raz_soc', 'Não informado'),
                'destinatario': dtc_dict.get('destinatario', {}).get('raz_soc', 'Não informado'),
                'data': coleta.get('data'),
                'status': coleta.get('status'),
                'tipo_atendimento':1,
            }
        }

    def _montar_ponto_de_atendimento_ctes(self, coleta, dtc):
        """
        Monta o dicionário com as informações de um ponto de atendimento.

        Args:
            coleta (dict): Dados da coleta.
            dtc (Dtc): Objeto DTC associado à coleta.

        Returns:
            dict: Informações do ponto de atendimento.
        """
        dtc_dict = dtc.to_dict()

        return {
            'lat': coleta.get('lat'),
            'lng': coleta.get('lng'),
            'idDtc': dtc_dict.get('id'),
            'dadosIntinerario': {
                'bairro': coleta.get('bairro') or 'Não informado',
                'volumes': coleta.get('volume') or 0,
                'valor': coleta.get('valor') or 0.0,
                'peso': coleta.get('peso') or 0.0,
                'remetente': dtc_dict.get('remetente', {}).get('raz_soc', 'Não informado'),
                'destinatario': dtc_dict.get('destinatario', {}).get('raz_soc', 'Não informado'),
                'data': coleta.get('data'),
                'status': coleta.get('status'),
            }
        }    