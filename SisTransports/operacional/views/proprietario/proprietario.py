from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.utils import checaCampos

@login_required(login_url='/auth/entrar/')
def proprietario (request):
    if request.method == 'GET':
        return render(request, 'home.html')
    elif request.method == "POST" :
        return JsonResponse({'status': 200})