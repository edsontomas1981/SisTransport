from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from parceiros.views.salva_parceiro import salva_parceiro as salvar
from enderecos.views.salva_end import salva_end
from django.contrib import messages
from django.contrib.messages import constants
from enderecos.models.endereco import Enderecos
from parceiros.models.parceiros import Parceiros
from contatos.models.contato import Contatos
from contatos.models.contato import Tipo_contatos
from django.http import JsonResponse

def salvaParceiro(request,endereco):
    parceiro=Parceiros()
    parceiro.cnpj_cpf=request.POST.get('cnpj_cpfMdl')
    parceiro.insc_est=request.POST.get('insc_estMdl')
    parceiro.raz_soc=request.POST.get('razaoMdl')
    parceiro.nome_fantasia=request.POST.get('fantasiaMdl')
    parceiro.observacao=request.POST.get('obsMdl')
    parceiro.endereco_fk=endereco
    parceiro.save()

def alteraParceiro(request,endereco):
    parceiro=Parceiros.objects.filter(cnpj_cpf=request.POST.get('cnpj_cpfMdl')).get()
    parceiro.cnpj_cpf=request.POST.get('cnpj_cpfMdl')
    parceiro.insc_est=request.POST.get('insc_estMdl')
    parceiro.raz_soc=request.POST.get('razaoMdl')
    parceiro.nome_fantasia=request.POST.get('fantasiaMdl')
    parceiro.observacao=request.POST.get('obsMdl')
    parceiro.endereco_fk=endereco
    parceiro.save()

def salvaEndereco(request):
    endereco=Enderecos()
    endereco.cep=request.POST.get('cepMdl')
    endereco.logradouro=request.POST.get('ruaMdl')
    endereco.numero=request.POST.get('numeroMdl')
    endereco.complemento=request.POST.get('complementoMdl')
    endereco.bairro=request.POST.get('bairroMdl')
    endereco.cidade=request.POST.get('cidadeMdl')
    endereco.uf=request.POST.get('ufMdl')
    endereco.save()
    return endereco

def alteraEndereco(request):
    endereco=Enderecos.objects.filter(id=request.POST.get('idEndereco')).get()
    endereco.cep=request.POST.get('cepMdl')
    endereco.logradouro=request.POST.get('ruaMdl')
    endereco.numero=request.POST.get('numeroMdl')
    endereco.complemento=request.POST.get('complementoMdl')
    endereco.bairro=request.POST.get('bairroMdl')
    endereco.cidade=request.POST.get('cidadeMdl')
    endereco.uf=request.POST.get('ufMdl')
    endereco.save()
    return endereco
   
def verificaParceiro(cnpjParc):
    if Parceiros.objects.filter(cnpj_cpfMdl=cnpjParc).exists():
        parceiro=Parceiros.objects.filter(cnpj_cpfMdl=cnpjParc).get()
        return parceiro

@login_required(login_url='/auth/entrar/')
def salva_parceiro(request):
    if request.method == "GET" :
        return render(request,'./cadastroParceiros.html',)
    elif request.method == "POST" :
        if request.POST.get('acaoForm') == 'salvaParceiro':
            if request.POST.get('razaoMdl') == '' or request.POST.get('cnpj_cpfMdl') == '' \
                or request.POST.get('cepMdl') == '' or request.POST.get('ruaMdl') == '' \
                or request.POST.get('bairroMdl') == '' or request.POST.get('cidadeMdl') == ''\
                or request.POST.get('ufMdl') == '' :
                return JsonResponse({'status':400})#Campos Invalidos
            else:
                if Parceiros.objects.filter(cnpj_cpf=request.POST.get('cnpj_cpfMdl')).exists():
                    endereco=alteraEndereco(request)
                    parceiro=alteraParceiro(request,endereco)
                    return JsonResponse({'status': 201})#alteração efetuada
                else:
                    endereco=salvaEndereco(request)
                    parceiro=salvaParceiro(request,endereco)
                    return JsonResponse({'status': 200})#Cadastro Efetuado
        else:
            return render(request,'./cadastroParceiros.html',)

                    

        
