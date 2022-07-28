from django.core.paginator import Paginator
from django.shortcuts import render,redirect
from django.http.response import HttpResponse
from django.contrib.auth.decorators import login_required

@login_required(login_url='/auth/entrar/')
def home(request):
    if request.method == "GET" :
        return render(request,'./home.html',)
    elif request.method == "POST" :
        return render(request,'./home.html',)