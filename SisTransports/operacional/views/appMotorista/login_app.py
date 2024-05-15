from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
import json
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@require_http_methods(["POST","GET"])
def login_app_motorista(request):
    try:
        data = json.loads(request.body)
        print(data)
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'ok'})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    except:
        return JsonResponse({'error': 'Invalid credentials'}, status=401)
