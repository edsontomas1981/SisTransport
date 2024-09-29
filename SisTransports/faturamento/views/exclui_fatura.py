from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse


@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST"])
def exclui_fatura (request):
    return JsonResponse({'status': 200})    