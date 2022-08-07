from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from parceiros.models.parceiros import Parceiros
from contatos.models.contato import Contatos
from django.template.loader import render_to_string


def busca_parceiro(request):
    if Parceiros.objects.filter(cnpj_cpf=request.POST.get('cnpj_cpf')).exists():
        parceiro = Parceiros.objects.filter(cnpj_cpf=request.POST.get('cnpj_cpf')).get()
        contato=[{'teste':'teste','teste2':'teste2'}]
        dados=[parceiro.to_dict()]
        if Contatos.objects.filter(parceiro_fk_id=parceiro.id).exists() :
            print('tem contato')
            dados=[parceiro.to_dict()]
            contatos=Contatos.objects.filter(parceiro_fk_id=parceiro.id)
            contato=[]
            for c in contatos:
                contato.append(c.to_dict())
                print(c)
            return JsonResponse({'dados': dados,'contato':contato})
        else:
            print('sem contato')
            contato=[]
            dados = [parceiro.to_dict()]
            return JsonResponse({'dados': dados ,'contato': contato})
    else:
        print('parceiro nao existe')
        return JsonResponse({'dados': []})
