from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json
from operacional.classes.cte import Cte

@login_required(login_url='/auth/entrar/')
def delete_cte(request):
    if request.method == 'GET':
        return JsonResponse({'create': 'delete'})
    elif request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        print(data)

        cte = Cte()
        cte.read(data['idDtc'])
        if cte.obj_cte:
            cte.delete(data['idDtc'])
            return JsonResponse({'create': 200})
        else:
            return JsonResponse({'create': 400})

