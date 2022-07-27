from django.core.paginator import Paginator
from django.shortcuts import render,redirect
from django.http.response import HttpResponse
from django.contrib.auth.decorators import login_required

def entrar (request):
    return render(request, 'login.html')