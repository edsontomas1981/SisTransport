from ast import Num
from traceback import print_tb
from unicodedata import decimal
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from parceiros.models.parceiros import Parceiros
from Classes.dtc import Dtc 
from Classes.coleta import Coleta 
from operacional.models.dtc import Dtc  as MdlDtc

def toFloat(stringTonumber):
    print('1',stringTonumber)
    stringTonumber=stringTonumber.replace(".","")
    stringTonumber=stringTonumber.replace(",",".")
    stringTonumber=float(stringTonumber)
    print('2',stringTonumber)
    return stringTonumber

def validaCampos(request):
    listaCamposObrigatorios=[]
    listaCamposObrigatorios if request.POST.get('volumes') else listaCamposObrigatorios.append('Volume')
    listaCamposObrigatorios if request.POST.get('peso') else listaCamposObrigatorios.append('Peso')
    listaCamposObrigatorios if request.POST.get('valor') else listaCamposObrigatorios.append('Valor')
    listaCamposObrigatorios if request.POST.get('cepColeta') else listaCamposObrigatorios.append('Cep Coleta')
    listaCamposObrigatorios if request.POST.get('rua') else listaCamposObrigatorios.append('Rua')
    listaCamposObrigatorios if request.POST.get('numero') else listaCamposObrigatorios.append('Número')
    listaCamposObrigatorios if request.POST.get('bairro') else listaCamposObrigatorios.append('Bairro')
    listaCamposObrigatorios if request.POST.get('cidade') else listaCamposObrigatorios.append('Cidade')
    listaCamposObrigatorios if request.POST.get('uf') else listaCamposObrigatorios.append('UF')
    listaCamposObrigatorios if request.POST.get('nomeColeta') else listaCamposObrigatorios.append('Nome')
    listaCamposObrigatorios if request.POST.get('contatoColeta') else listaCamposObrigatorios.append('Contato')
    listaCamposObrigatorios if request.POST.get('horario') else listaCamposObrigatorios.append('Horario')
    
    return listaCamposObrigatorios
    

@login_required(login_url='/auth/entrar/')
def saveColeta (request):
    if request.method == 'GET': 
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        if request.POST.get('numPed') != '':
            if MdlDtc.objects.filter(id=request.POST.get('numPed')).exists():
                listaCamposObrigatorios = validaCampos(request)
                if len(listaCamposObrigatorios)!=0:
                    return JsonResponse({'status': 411,
                                        'camposObrigatorios':listaCamposObrigatorios}) #Faltam campos a ser preenchidos
                else:
                    valor=toFloat(request.POST.get('valor'))
                    dtc=MdlDtc.objects.filter(id=request.POST.get('numPed')).get()
                    coleta=Coleta(dtc,request.POST.get('nf'),request.POST.get('volumes'),request.POST.get('peso'),
                                request.POST.get('resultM3'),valor,request.POST.get('especie'),
                                request.POST.get('veiculo'),request.POST.get('tipo'),request.POST.get('horario'),
                                request.POST.get('obs'),request.POST.get('cepColeta'),request.POST.get('rua'),
                                request.POST.get('numero'),request.POST.get('complemento'),request.POST.get('bairro'),
                                request.POST.get('cidade'),request.POST.get('uf'),request.POST.get('nomeColeta'),
                                request.POST.get('contatoColeta'))
                    coleta.salvaColeta()
                return JsonResponse({'status': 200}) #Coleta Salva com sucesso
            else:
                return JsonResponse({'status': 402}) #Dtc não Localizado
        else:
                return JsonResponse({'status': 410}) #Numero do pedido nao informado
