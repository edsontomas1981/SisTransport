from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.tabelaFrete import TabelaFrete
from parceiros.models.parceiros import Parceiros

def verificaCamposObrigatorios(request):
    camposObrigatorios=[]
    camposObrigatorios if request.POST.get('tipoTabela') else camposObrigatorios.append('Tipo da Tabela')
    camposObrigatorios if request.POST.get('freteMinimo') else camposObrigatorios.append('Frete mínimo')
    camposObrigatorios if request.POST.get('descTabela') else camposObrigatorios.append('Descrição da tabela')
    camposObrigatorios if request.POST.get('vlrFrete') else camposObrigatorios.append('Valor do Frete')
    camposObrigatorios if request.POST.get('tipoFrete') else camposObrigatorios.append('Tipo do frete')

    return camposObrigatorios
def toFloat(stringToFloat):
    stringToFloat=stringToFloat.replace(".","")
    stringToFloat=stringToFloat.replace(",",".")
    stringToFloat=float(stringToFloat)
    return stringToFloat

def checkBox(check):
    if check == 'on':
        return True
    else:
        return False
    
@login_required(login_url='/auth/entrar/')
def createTabela (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    
    elif request.method == "POST" :
        campos=verificaCamposObrigatorios(request)
        if len(campos)>=0:       
            tabela=TabelaFrete()
            tabela.incluiTabela(None,None,request.POST.get('descTabela'),toFloat(request.POST.get('vlrFrete'))
                                ,request.POST.get('tipoFrete'),toFloat(request.POST.get('advalor')),
                                toFloat(request.POST.get('gris')),toFloat(request.POST.get('despacho')),
                                toFloat(request.POST.get('outros')),toFloat(request.POST.get('pedagio')),
                                request.POST.get('tipoCobranPedagio'),checkBox(request.POST.get('cobraCubagem')),
                                toFloat(request.POST.get('cubagem')),checkBox(request.POST.get('icms'))
                                ,checkBox(request.POST.get('tabelaBloqueada')))
            
            parceiro=Parceiros.objects.filter(cnpj_cpf='23926683000108').get()
            print(parceiro)
            tabela.anexaTabelaAoParceiro(parceiro,4)
            return JsonResponse({'status': 200}) 
        else:
            return JsonResponse({'status': 400,'camposObrigatorios':campos}) 
