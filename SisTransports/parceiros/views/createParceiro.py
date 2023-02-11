from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from Classes.utils import dprint
from parceiros.classes.parceiros import Parceiros
from enderecos.classes.enderecos import Enderecos


@login_required(login_url='/auth/entrar/')
def createParceiro(request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')

    elif request.method == "POST" :
        dadosBrutos=dict(request.POST.items())
        dados=standartData(dadosBrutos)
        endereco=Enderecos()
        endereco.createEndereco(dados)
        dados['endereco_fk']=endereco.endereco
                
        parceiro=Parceiros()
        parceiro.createParceiro(dados)
        return JsonResponse({'status': 200, 'parceiro':parceiro.parceiro.to_dict()}) 
    
def standartData(dados):
    return {'cnpj':dados['cnpjMdl'],
            'inscr':dados['insc_estMdl'],
            'razao':dados['razaoMdl'],
            'fantasia':dados['fantasiaMdl'],
            'obs':dados['obsMdl'],
            'cep':dados['cepMdl'],
            'logradouro':dados['ruaMdl'],
            'numero':dados['numeroMdl'],
            'complemento':dados['cepMdl'],
            'bairro':dados['bairroMdl'],
            'cidade':dados['cidadeMdl'],
            'estado':dados['ufMdl']
        }

  
