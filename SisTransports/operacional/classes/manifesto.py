from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotFound
from django.db import IntegrityError
from operacional.models.manifestos import Manifesto
from django.utils import timezone
from operacional.classes.motorista import MotoristaManager as Motorista
from operacional.classes.veiculo import VeiculoManager as Veiculo
from operacional.classes.dtc import Dtc
from operacional.classes.ocorrencias_manifesto import Ocorrencia_manifesto
from operacional.models.dtc_manifestos import DtcManifesto
from operacional.classes.cte import Cte

class ManifestoError(Exception):
    """Exceção base para erros relacionados ao manifesto."""

class BadRequestError(ManifestoError):
    """Exceção para erros de solicitação inválida (código HTTP 400)."""

class NotFoundError(ManifestoError):
    """Exceção para erros de recurso não encontrado (código HTTP 404)."""

class InternalServerError(ManifestoError):
    """Exceção para erros internos do servidor (código HTTP 500)."""


class ManifestoManager:
    @classmethod
    def _carregar_dados_comuns(cls, data):
        return {
            'emissor_fk': data.get('emissor_fk'),
            'data_previsão_inicio': data.get('data_previsão_inicio'),
            'data_previsão_chegada': data.get('data_previsão_chegada'),
            'rota_fk': data.get('rota_fk'),
            'frete_carreteiro': data.get('frete_carreteiro'),
            'frete_adiantamento': data.get('frete_adiantamento'),
            'lacres': data.get('lacres'),
            'averbacao': data.get('averbacao'),
            'liberacao': data.get('liberacao'),
            'observacao': data.get('observacao'),
        }

    @classmethod
    def criar_manifesto(cls, data):
        dados_comuns = cls._carregar_dados_comuns(data)
        dados_comuns['usuario_cadastro']= data.get('usuario_cadastro')
        dados_comuns['data_cadastro']=str(timezone.now())
        manifesto = Manifesto.objects.create(**dados_comuns)
        return manifesto
    
    @classmethod
    def atualizar_manifesto(cls, manifesto_id, **kwargs):
        manifesto = cls.obter_manifesto_por_id(manifesto_id)
        for field, value in kwargs.items():
            setattr(manifesto, field, value)
        manifesto.save()
        return manifesto
    
    @classmethod
    def add_motorista(cls, data):
        """
        Adiciona um motorista a um manifesto.

        Args:
            cls (class): A classe que chama este método.
            data (dict): Um dicionário contendo os dados necessários para adicionar um motorista a um manifesto.
                - 'motorista': O objeto do motorista a ser adicionado.
                - 'manifesto': O objeto do manifesto ao qual o motorista será associado.

        Raises:
            TypeError: Se 'data' não for um dicionário.
            KeyError: Se 'motorista' ou 'manifesto' não estiverem presentes em 'data'.
            ValueError: Se 'motorista' ou 'manifesto' forem None.

        Returns:
            int: O código de status HTTP 200 indicando que a operação foi bem-sucedida.
        """

        
        # Verifica se 'data' é um dicionário
        if not isinstance(data, dict):
            print(data)
            raise TypeError("O argumento 'data' deve ser um dicionário.")

        # Obtém o motorista e o manifesto de 'data'
        motorista = data.get('motorista')
        manifesto = data.get('manifesto')

        # Verifica se 'motorista' e 'manifesto' estão presentes em 'data'
        if motorista is None or manifesto is None:
            raise KeyError("Os dados 'motorista' e 'manifesto' são obrigatórios.")

        # Verifica se 'motorista' e 'manifesto' não são None
        if motorista is None or manifesto is None:
            raise ValueError("Os objetos 'motorista' e 'manifesto' não podem ser None.")

        # Salvando motoristas associados ao manifesto
        manifesto.motoristas.add(motorista)
        
        # Retornando código de status HTTP 200
        return 200


    @classmethod
    def cria_ou_atualiza(cls, manifesto_id=None, **kwargs):
        if manifesto_id:
            return cls.atualizar_manifesto(manifesto_id, **kwargs)
        else:
            return cls.criar_manifesto(kwargs)

    @classmethod
    def obter_manifesto_por_id(cls, manifesto_id):
        try:
            # Retornar o manifesto
            if Manifesto.objects.get(id=int(manifesto_id)):
                return Manifesto.objects.get(id=int(manifesto_id))
            else:
                return None
        except Manifesto.DoesNotExist:
            raise ValueError("Manifesto com o ID {} não encontrado".format(manifesto_id))
        except ValueError:
            raise ValueError("O manifesto_id deve ser um número inteiro")


    @classmethod
    def deletar_manifesto(cls, manifesto_id):
        manifesto = cls.obter_manifesto_por_id(manifesto_id)
        manifesto.delete()


    @classmethod
    def obter_motoristas_manifesto(cls, manifesto_id):
        """
        Obtém todos os motoristas relacionados a um manifesto.

        Args:
            manifesto_id (int): O ID do manifesto do qual os motoristas serão obtidos.

        Returns:
            list: Uma lista contendo os objetos de motorista relacionados ao manifesto.
        """
        try:
            # Obtém o manifesto pelo ID
            manifesto = Manifesto.objects.get(id=manifesto_id)

            # Obtém todos os motoristas relacionados ao manifesto
            motoristas = manifesto.motoristas.all()

            return list(motoristas)
        except Manifesto.DoesNotExist:
            raise NotFoundError(f"Manifesto com o ID {manifesto_id} não encontrado.")

    @classmethod
    def deletar_motorista_do_manifesto(cls, manifesto_id, cpf_motorista):
        """
        Exclui um motorista do manifesto pelo CPF do motorista.

        Args:
            manifesto_id (int): O ID do manifesto do qual o motorista será excluído.
            cpf_motorista (str): O CPF do motorista a ser excluído.

        Raises:
            NotFoundError: Se o manifesto com o ID especificado não for encontrado.
            NotFoundError: Se o motorista com o CPF especificado não estiver associado ao manifesto.
        """
        try:
            # Obtém o manifesto pelo ID
            manifesto = Manifesto.objects.get(id=manifesto_id)

            # Obtém o motorista pelo CPF
            motorista = Motorista()
            motorista.read_motorista_by_cpf(cpf_motorista)
            
            if motorista.obj_motorista not in manifesto.motoristas.all():
                raise NotFoundError(f"Motorista com CPF {cpf_motorista} não está associado ao manifesto {manifesto_id}.")

            # Remove o motorista do manifesto
            manifesto.motoristas.remove(motorista.obj_motorista.id)

            return 200
        except:
            return 404

    @classmethod
    def obter_veiculos_manifesto(cls, manifesto_id):
        """
        Obtém todos os veículos relacionados a um manifesto.

        Args:
            manifesto_id (int): O ID do manifesto do qual os veículos serão obtidos.

        Returns:
            list: Uma lista contendo os objetos de veículo relacionmanifestoados ao manifesto.
        """
        try:
            # Obtém o manifesto pelo ID
            manifesto = Manifesto.objects.get(id=manifesto_id)

            # Obtém todos os veículos relacionados ao manifesto
            veiculos = manifesto.veiculos.all()

            return list(veiculos)
        except Manifesto.DoesNotExist:
            raise NotFoundError(f"Manifesto com o ID {manifesto_id} não encontrado.")

    
    @classmethod
    def obter_lista_veiculos(cls, manifesto_id):
        """
        Obtém a lista de veículos associados a um manifesto.

        Args:
            manifesto_id (int): O ID do manifesto do qual os veículos serão obtidos.

        Returns:
            list: Uma lista contendo os veículos associados ao manifesto, representados como dicionários.
            Retorna 404 se o manifesto com o ID especificado não for encontrado.

        Raises:
            ManifestoError: Se ocorrer um erro ao obter os veículos associados ao manifesto.
        """
        try:
            veiculos = cls.obter_veiculos_manifesto(manifesto_id)
            return [veiculo.to_dict() for veiculo in veiculos]
        except NotFoundError:
            return 404
        except Exception as e:
            raise ManifestoError(f"Erro ao obter a lista de veículos para o manifesto {manifesto_id}: {e}")

    @classmethod
    def adicionar_veiculo_manifesto(cls, manifesto_id, veiculo_placa):
        """
        Adiciona um veículo a um manifesto.

        Args:
            manifesto_id (int): O ID do manifesto ao qual o veículo será adicionado.
            veiculo_id (int): O ID do veículo a ser adicionado ao manifesto.

        Returns:
            int: O código de status HTTP 200 indicando que a operação foi bem-sucedida.

        Raises:
            NotFoundError: Se o manifesto com o ID especificado não for encontrado.
            NotFoundError: Se o veículo com o ID especificado não for encontrado.
            ManifestoError: Se ocorrer um erro ao adicionar o veículo ao manifesto.
        """
        try:
            veiculo = Veiculo()

            veiculo = veiculo.get_veiculo_placa(veiculo_placa)

            manifesto =cls.obter_manifesto_por_id(manifesto_id)
            
            manifesto.veiculos.add(veiculo)

            return 200
        except:
            return 400

    @classmethod
    def remover_veiculo_manifesto(cls, manifesto_id, veiculo_placa):
        """
        Remove um veículo de um manifesto.

        Args:
            manifesto_id (int): O ID do manifesto do qual o veículo será removido.
            veiculo_placa (str): A placa do veículo a ser removido do manifesto.

        Returns:
            int: O código de status HTTP 200 indicando que a operação foi bem-sucedida.

        Raises:
            NotFoundError: Se o manifesto com o ID especificado não for encontrado.
            NotFoundError: Se o veículo com a placa especificada não for encontrado no manifesto.
            ManifestoError: Se ocorrer um erro ao remover o veículo do manifesto.
        """
        try:
            veiculo = Veiculo()

            veiculo = veiculo.get_veiculo_placa(veiculo_placa)

            manifesto = cls.obter_manifesto_por_id(manifesto_id)
            
            if veiculo not in manifesto.veiculos.all():
                raise NotFoundError(f"Veículo com placa {veiculo_placa} não está associado ao manifesto {manifesto_id}.")

            manifesto.veiculos.remove(veiculo)

            return 200
        except:
            return 400

            
    @classmethod
    def add_documento_manifesto(cls, dados):
        """
        Adiciona um novo documento de manifesto.

        Parâmetros:
            dados (dict): Um dicionário contendo as informações necessárias para adicionar o documento de manifesto.
                        Deve conter as seguintes chaves:
                        - 'idManifesto': ID do manifesto associado ao documento.
                        - 'idDtc': ID do Dtc associado ao documento.
                        - 'ocorrencia_id': ID da ocorrência de manifesto associada ao documento.

        Retorna:
            HttpResponse: Um objeto HttpResponse com o código de status HTTP apropriado.

        """
        try:
            # Obter o manifesto pelo ID fornecido
            manifesto = cls.obter_manifesto_por_id(int(dados.get('idManifesto')))
            # Obter o Dtc pelo ID fornecido
            dtc = Dtc.obter_dtc_id(int(dados.get('idDtc')))
            # Obter a ocorrência de manifesto pelo ID fornecido
            tipo_manifesto = Ocorrencia_manifesto.get_ocorrencia_id(int(dados.get('ocorrencia_id')))

            # Criar um novo DtcManifesto
            dtc_manifesto = DtcManifesto.objects.create(
                                dtc_fk=dtc,
                                manifesto_fk=manifesto,
                                ocorrencia_manifesto_fk=tipo_manifesto
            )
            return HttpResponse(status=201)  # Retorna HTTP 201 Created
        except ValueError as ve:
            return HttpResponseBadRequest("Erro ao adicionar documento de manifesto: {}".format(ve))
        except IntegrityError:
            return HttpResponse(status=409, content="Registro duplicado")
        except Manifesto.DoesNotExist:
            return HttpResponseNotFound("Manifesto não encontrado com o ID fornecido.")
        except Dtc.DoesNotExist:
            return HttpResponseNotFound("Dtc não encontrado com o ID fornecido.")
        except Ocorrencia_manifesto.DoesNotExist:
            return HttpResponseNotFound("Ocorrência de manifesto não encontrada com o ID fornecido.")
 
    @classmethod
    def obtem_documentos_manifesto(cls, id_manifesto):
        """
        Obtém os documentos associados a um manifesto com o ID especificado.

        Args:
            id_manifesto (int): O ID do manifesto para o qual os documentos devem ser obtidos.

        Returns:
            list: Uma lista de dicionários contendo os dados dos documentos associados ao manifesto.
                Cada dicionário contém os dados do documento e, se disponível, os dados do Conhecimento de Transporte Eletrônico (CT-e) associado.

        Raises:
            Manifesto.DoesNotExist: Se não for encontrado nenhum manifesto com o ID especificado.
        """
        try:
            registros = DtcManifesto.objects.filter(manifesto_fk_id=id_manifesto)
            documentos = []
            for registro in registros:
                cte = Cte.obtem_cte_by_dtc(registro.dtc_fk.id)
                registro_dict = registro.to_dict()  # Supondo que você tenha um método to_dict() que converte o objeto em um dicionário
                if cte:
                    registro_dict['cte'] = cte.to_dict()
                documentos.append(registro_dict)
            return documentos   
        except Manifesto.DoesNotExist:
            return None
        
    @classmethod
    def remove_documento_manifesto(cls, dtc_fk, manifesto_fk):
        """
        Exclui registros de DtcManifesto com base nos valores fornecidos de dtc_fk e manifesto_fk.

        Args:
            dtc_fk (int): O valor de dtc_fk para os registros a serem excluídos.
            manifesto_fk (int): O valor de manifesto_fk para os registros a serem excluídos.

        Returns:
            int: O número de registros excluídos.

        Raises:
            ValueError: Se dtc_fk ou manifesto_fk forem None.
        """
        # Verificações de tipo e valor
        if dtc_fk is None or manifesto_fk is None:
            return HttpResponse(status=404)

        # Exclui registros com base nos valores fornecidos
        DtcManifesto.objects.filter(dtc_fk=dtc_fk, manifesto_fk=manifesto_fk).delete()
        
        return  HttpResponse(status=200)
    








