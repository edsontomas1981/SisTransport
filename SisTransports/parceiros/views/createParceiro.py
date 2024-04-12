from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from Classes.utils import dprint
from parceiros.classes.parceiros import Parceiros
from enderecos.classes.enderecos import Enderecos
from Classes.consultaCnpj import validaCnpjCpf

@login_required(login_url='/auth/entrar/')
def createParceiro(request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        if validaCnpjCpf(request.POST.get('cnpj_cpf')):
            dadosBrutos=dict(request.POST.items())
            dados=standartData(dadosBrutos)
            endereco=Enderecos()
            endereco.createEndereco(dados)
            dados['endereco_fk']=endereco.endereco
            parceiro=Parceiros()

            status=parceiro.createParceiro(dados)
            if status == 200:
                print(parceiro.parceiro.to_dict())
                return JsonResponse({'status': status, 'parceiro':parceiro.parceiro.to_dict()})
            elif status == 201:
                print(parceiro.parceiro.to_dict())
                return JsonResponse({'status': status, 'parceiro':parceiro.parceiro.to_dict()})
            else:
                return JsonResponse({'status': status}) 
        else:
            return JsonResponse({'status': 300,'msg':'cnpjInvalido'}) 

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

  
