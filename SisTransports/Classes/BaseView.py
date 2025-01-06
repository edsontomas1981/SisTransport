from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseServerError
import json

class ViewBase:
    """
    Classe base para lidar com views que exigem autenticação e retornam respostas JSON.
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
        Processa o corpo da requisição e retorna os dados JSON.
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
            return {}

    def post(self, request, *args, **kwargs):
        """
        Método padrão para requisições POST.
        """
        return JsonResponse({"mensagem": "Método POST padrão"}, status=200)

    def get(self, request, *args, **kwargs):
        """
        Método padrão para requisições GET.
        """
        return JsonResponse({"mensagem": "Método GET padrão"}, status=200)

    def put(self, request, *args, **kwargs):
        """
        Método padrão para requisições PUT.
        """
        return JsonResponse({"mensagem": "Método PUT padrão"}, status=200)

    def delete(self, request, *args, **kwargs):
        """
        Método padrão para requisições DELETE.
        """
        return JsonResponse({"mensagem": "Método DELETE padrão"}, status=200)

    def handle_error(self, e):
        """
        Lida com exceções e retorna uma resposta de erro genérico.
        """
        return HttpResponseServerError(f"Erro no servidor: {str(e)}")
