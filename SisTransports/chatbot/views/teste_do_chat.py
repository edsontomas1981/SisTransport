from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required(login_url='/auth/entrar/')
def teste_chat(request):
    if request.method == "GET" :
        return render(request,'./teste_chat.html',)
    elif request.method == "POST" :
        return render(request,'./teste_chat.html',)
    
