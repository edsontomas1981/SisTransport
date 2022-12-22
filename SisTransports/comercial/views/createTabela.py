from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete
from Classes.parceiros import Parceiros
from Classes.utils import verificaCamposObrigatorios,toFloat,checkBox

@login_required(login_url='/auth/entrar/')
def createTabela (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        print(request.POST)
        campos=verificaCamposObrigatorios(request)
        if len(campos)>=0:  
            parceiro=Parceiros.getParceiro(request.POST.get('comlCnpj'))
            tabela=TabelaFrete()
            #verificar a ordem dos parametros 
            tabela.createTabela(None,request.POST.get('descTabela'),
                toFloat(request.POST.get('vlrFrete')),toFloat(request.POST.get('advalor')),
                toFloat(request.POST.get('gris')),toFloat(request.POST.get('despacho')),
                toFloat(request.POST.get('outros')),toFloat(request.POST.get('pedagio')),
                request.POST.get('tipoCobranPedagio'),checkBox(request.POST.get('cobraCubagem')),
                toFloat(request.POST.get('cubagem')),checkBox(request.POST.get('icms')),
                request.POST.get('tipoTabela'),toFloat(request.POST.get('freteMinimo')),
                checkBox(request.POST.get('tabelaBloqueada')),request.POST.get('tipoFrete'))
                
            return JsonResponse({'status': 200,'dados':tabela.toDict()})

        else:
            return JsonResponse({'status': 400,'camposObrigatorios':campos}) 
