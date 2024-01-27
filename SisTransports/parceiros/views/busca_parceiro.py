from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from parceiros.models.parceiros import Parceiros
from contatos.models.contato import Contatos
from django.template.loader import render_to_string
from Classes.consultaCnpj import validaCnpjCpf
from Classes.buscaCnpjWs import cnpjWs
from enderecos.models.endereco import Enderecos
from Classes.utils import dprint
from contatos.classes.contato import Contato
@login_required(login_url='/auth/entrar/')
def busca_parceiro(request):
    if validaCnpjCpf(request.POST.get('cnpj_cpf')):
        if Parceiros.objects.filter(cnpj_cpf=request.POST.get('cnpj_cpf')).exists():
            parceiro = Parceiros.objects.filter(cnpj_cpf=request.POST.get('cnpj_cpf')).get()
            dados=[parceiro.to_dict()]
            contato=Contato()
            listaContatos=contato.readContatos(parceiro.id)
            if contato:
                return JsonResponse({'dados': dados,'contato':contato,'status':200})#Parceiro cadastrado e com contato
            else:
                contato=[]
                dados = [parceiro.to_dict()]
                return JsonResponse({'dados': dados ,'status':201})#Parceiro cadastrado sem contatos
        else:#Buscar cnpj em um webservice
            #verifica se é um cnpj e faz a consulta
            if len(request.POST.get('cnpj_cpf'))==14:
                dadosBrutos,status=parceiroWs(request)
                if status == 429:
                    return JsonResponse({'status':429})#Falha na consulta webservice limite excedido
                elif status == 200:    
                    dados=[{'cnpj_cpf':dadosBrutos['cnpj'],'raz_soc':dadosBrutos['nome'],
                            'nome_fantasia':dadosBrutos['fantasia'],'insc_est':'','observacao': '',
                            'endereco_fk':{'cep':dadosBrutos['cep'],'logradouro':dadosBrutos['logradouro'],
                            'numero':dadosBrutos['numero'],'complemento':dadosBrutos['complemento'],
                            'bairro':dadosBrutos['bairro'],'cidade':dadosBrutos['municipio'],
                            'uf':dadosBrutos['uf']}}]
                    return JsonResponse({'dados': dados,'status':202})#Resposta ok webservice
                else:
                    return JsonResponse({'status':431 })#erro nao especificado
            else:
                    return JsonResponse({'status':430 })#cpf nao cadastrado
    else:
        return JsonResponse({'status':401})#Cnpj ou cpf invalidos 

def parceiroWs(request):
    dados,status=cnpjWs(request.POST.get('cnpj_cpf'))
    return dados,status

def response_to_dict(endereco,parceiro):
    return {
        'cnpj_cpf': parceiro.cnpj_cpf,
        'raz_soc': parceiro.raz_soc,
        'nome_fantasia': parceiro.nome_fantasia,
        'observacao': '',
        'endereco_fk':{
        'cep': endereco.cep,
        'logradouro': endereco.logradouro,
        'numero': endereco.numero,
        'complemento': endereco.complemento,
        'bairro': endereco.bairro,
        'cidade': endereco.cidade,
        'uf': endereco.uf}
    }
    
    
    
    