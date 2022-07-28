from django.shortcuts import redirect
from django.contrib import auth

def sair(request):
     auth.logout(request)
     return redirect('/auth/entrar')