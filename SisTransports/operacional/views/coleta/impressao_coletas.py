from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required(login_url='/auth/entrar/')
def impressao_coletas (request):
    if request.method == 'GET':
        return render(request, 'impressaoColetas.html')
    elif request.method == 'POST':
        return render(request,'impressaoColetas.html')