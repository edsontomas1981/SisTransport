from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required(login_url='/auth/entrar/')
def salva_parceiro(request):

    print('*****************************************************************')
    if request.method == "GET" :
        return render(request,'./home.html',)
    elif request.method == "POST" :
        return render(request,'./home.html',)