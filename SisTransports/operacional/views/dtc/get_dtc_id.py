from django.views import View
from Classes.BaseView import ViewBase
from django.http import JsonResponse, HttpResponseBadRequest
from operacional.classes.dtc import Dtc
from operacional.classes.cte import Cte
from operacional.classes.coleta import Coleta

class GetDtcPorIdDtc(ViewBase, View):
    """
    Classe responsável por processar requisições POST que buscam um DTC (Documento de Transporte de Carga) 
    e seu respectivo CTe (Conhecimento de Transporte Eletrônico) pelo ID do DTC.
    """

    def post(self, request, *args, **kwargs):
        """
        Processa a requisição POST e retorna informações do DTC e seu CTe associado.

        Args:
            request (HttpRequest): Objeto contendo os dados da requisição.
            *args: Argumentos adicionais.
            **kwargs: Argumentos nomeados adicionais.

        Returns:
            JsonResponse: Um objeto JSON contendo os dados do DTC e CTe associados, 
            ou uma mensagem de erro caso ocorra algum problema.
        """
        try:
            # Processa os dados da requisição
            dados = self.process_request_data(request)

            # Valida se o ID do DTC foi fornecido
            id_dtc = dados.get('id_dtc')
            if not id_dtc:
                return HttpResponseBadRequest("ID do DTC não fornecido.")

            # Obtém o DTC pelo ID
            dtc = Dtc.obter_dtc_id(id_dtc)
            if not dtc:
                return HttpResponseBadRequest(f"DTC com ID {id_dtc} não encontrado.")

            # Obtém o CTe associado ao DTC
            cte = Cte.obtem_cte_by_dtc(id_dtc)

            # Converte os objetos para dicionários
            dtc_dict = dtc.to_dict()
            dtc_dict['cte'] = cte.to_dict() if cte else {}

            # Retorna a resposta JSON com os dados
            return JsonResponse({'success': True, 'dadosDtc': dtc_dict}, status=201)

        except Exception as e:
            # Retorna um erro genérico em caso de exceção não prevista
            return JsonResponse({'success': False, 'error': str(e)}, status=500)

