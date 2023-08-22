from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json


@login_required(login_url='/auth/entrar/')
def create_frete_dtc (request):
    if request.method == 'GET':
        return JsonResponse({'create':'create'})
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        return JsonResponse({'create':'create'})