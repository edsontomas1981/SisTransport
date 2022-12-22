from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete
from Classes.utils import checaCampos,toFloat,checkBox,dprint
from Classes.parceiros import Parceiros

@login_required(login_url='/auth/entrar/')
def updateTabela (request):
    if request.method == 'GET':
        return render(request, 'home.html')
    elif request.method == "POST" :
        tabela=TabelaFrete()
        tabela.readTabela(request.POST.get('numTabela'))
        tabela.updateTabela(request.POST.get('numTabela'),
                            None,None,request.POST.get('descTabela'),
                            toFloat(request.POST.get('vlrFrete')),
                            request.POST.get('tipoFrete'),
                            toFloat(request.POST.get('advalor')),
                            toFloat(request.POST.get('gris')),
                            toFloat(request.POST.get('despacho')),
                            toFloat(request.POST.get('outros')),
                            toFloat(request.POST.get('pedagio')),
                            request.POST.get('tipoCobranPedagio'),
                            checkBox(request.POST.get('cobraCubagem')),
                            toFloat(request.POST.get('cubagem')),
                            checkBox(request.POST.get('icms')),
                            checkBox(request.POST.get('tabelaBloqueada')),
                            request.POST.get('tipoTabela'),
                            toFloat(request.POST.get('freteMinimo')),)
        return JsonResponse({'status': 200}) 