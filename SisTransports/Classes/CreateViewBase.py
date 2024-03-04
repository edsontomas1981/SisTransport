from abc import ABC, abstractmethod
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
from Classes.utils import string_para_data
import json

class CreateEntityBase(ABC):
    @abstractmethod
    def prepare_data(self, data):
        pass

    @abstractmethod
    def handle_success(self, entity):
        pass

    def handle_error(self, error):
        return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(error)}'})

    def validate_required_fields(self, data, required_fields):
        for field in required_fields:
            if field not in data or data[field] == '':
                return JsonResponse({'status': 422, 'error': f'O campo {field} é obrigatório.'})
        return None

    @login_required(login_url='/auth/entrar/')
    @require_http_methods(["POST","GET"])
    def create_entity(self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))

            required_fields = getattr(self, 'required_fields', [])
            
            validation_error_response = self.validate_required_fields(data, required_fields)
            if validation_error_response:
                return validation_error_response

            prepared_data = self.prepare_data(data)

            entity_manager = getattr(self, 'entity_manager', None)
            if not entity_manager:
                raise NotImplementedError("O gerenciador de entidades não foi definido.")

            entity = entity_manager()
            entity.create_entity(prepared_data)

            return self.handle_success(entity)

        except ValidationError as ve:
            return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})

        except Exception as e:
            return self.handle_error(e)
