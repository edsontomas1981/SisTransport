from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tblFaixa import TabelaFaixa
from comercial.classes.tabelaFrete import TabelaFrete as ClasseFrete

@login_required(login_url='/auth/entrar/')
def createFaixa (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')   
    elif request.method == "POST" :
        tabela=ClasseFrete()
        # carrega a tabela que a faixa em questão estará ligada 
        tabela.readTabela(request.POST.get('numTabela'))
        # instancia faixa
        faixa=TabelaFaixa()
        #cria faixa
        resposta,campo,intervalo=faixa.createFaixa(tabela.tabela,request.POST.get('faixaInicial'),request.POST.get('faixaFinal'),
                          request.POST.get('faixaValor'))
        #   cria um dict com todas as faixas da tabela
        if resposta == 200: # inclusão da faixa efetuado
            faixas=[x.toDict() for x in faixa.readFaixas(faixa.faixa.tblVinculada) ]
            return JsonResponse({'status': 200,'faixa':faixas})    
        elif resposta == 400: # algum dos argumentos já compreendidos na faixa 
            return JsonResponse({'status': 400,'campo':campo,'intervalo':intervalo.toDict()})    
        else:
            return JsonResponse({'status': 430})#Erro nao identificado    
