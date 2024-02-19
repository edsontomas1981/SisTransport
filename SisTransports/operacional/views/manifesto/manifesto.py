from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


@login_required(login_url='/auth/entrar/')
@require_http_methods(["GET"])
def manifesto (request):
    return render(request, 'manifesto.html')
