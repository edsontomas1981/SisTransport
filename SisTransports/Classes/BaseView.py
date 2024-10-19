from abc import ABC, abstractmethod
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
import json

class ViewBase(ABC):
    """
    Classe abstrata para lidar com views que exigem autenticação e retornam respostas JSON.
    Suporta os métodos HTTP GET, POST, PUT, DELETE.
    """

    @method_decorator(login_required(login_url='/auth/entrar/'))
    def dispatch(self, request, *args, **kwargs):
        """
        Método principal que despacha a requisição para o método correto (POST, GET, PUT, DELETE).
        """
        if request.method == "POST":
            return self.post(request, *args, **kwargs)
        elif request.method == "GET":
            return self.get(request, *args, **kwargs)
        elif request.method == "PUT":
            return self.put(request, *args, **kwargs)
        elif request.method == "DELETE":
            return self.delete(request, *args, **kwargs)
        else:
            return HttpResponseBadRequest("Método HTTP não suportado.")

    def process_request_data(self, request, require_body=True):
        """
        Processa o corpo da requisição e retorna os dados JSON. Lida com erros comuns, como JSON inválido ou corpo vazio.
        
        Parâmetros: 
        -----------
        request (HttpRequest): Requisição HTTP.
        require_body (bool): Se True, o método requer um corpo de requisição. Caso contrário, ignora a validação do corpo.

        Retorna:
        --------
        dict: Dados da requisição processados ou um dicionário vazio se o corpo não for necessário.
        HttpResponse: Caso ocorra erro no processamento dos dados.
        """
        if require_body:
            if not request.body:
                return HttpResponseBadRequest("Corpo da requisição vazio.")
            
            try:
                dados = json.loads(request.body.decode('utf-8'))
                return dados
            except json.JSONDecodeError:
                return HttpResponseBadRequest("JSON inválido.")
        else:
            # Se o corpo não for necessário, retorna um dicionário vazio
            return {}


    @abstractmethod
    def post(self, request, *args, **kwargs):
        """
        Método abstrato para processar requisições POST.
        """
        pass

    @abstractmethod
    def get(self, request, *args, **kwargs):
        """
        Método abstrato para processar requisições GET.
        """
        pass

    @abstractmethod
    def put(self, request, *args, **kwargs):
        """
        Método abstrato para processar requisições PUT.
        """
        pass

    @abstractmethod
    def delete(self, request, *args, **kwargs):
        """
        Método abstrato para processar requisições DELETE.
        """
        pass

    def handle_error(self, e):
        """
        Lida com exceções e retorna uma resposta de erro genérico.

        Parâmetros:
        -----------
        e (Exception): Exceção capturada.

        Retorna:
        --------
        HttpResponseServerError: Resposta de erro com a mensagem da exceção.
        """
        return HttpResponseServerError(f"Erro no servidor: {str(e)}")
