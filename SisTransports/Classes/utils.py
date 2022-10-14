# Identifica campos enviados se estao vazios ou nao 
# sendo identificacaoCampo e o nome vindo da requisição 
# e nome campo e uma frase mais agradavel para retorno da requisição 

def checaCampos(request,**kwargs):
    camposVazios=[]
    for identificacaoCampo,nomeCampo in kwargs.items():
        if request.POST.get(identificacaoCampo) == '': 
            camposVazios.append(nomeCampo)
    return camposVazios


def verificaCamposObrigatorios(request):
    camposObrigatorios=[]
    if request.POST.get('tipoTabela'):
        camposObrigatorios.append('Tipo da Tabela')
    if request.POST.get('freteMinimo'):
        camposObrigatorios.append('Frete mínimo')
    if request.POST.get('descTabela'):
        camposObrigatorios.append('Descrição da tabela')
    if request.POST.get('vlrFrete'):
        camposObrigatorios.append('Valor do Frete')
    if request.POST.get('tipoFrete'):
        camposObrigatorios.append('Tipo do frete')
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

def checaUf(uf):
    listaUf=['RO','AC','AM','RR','PA','AP','TO',
            'MA','PI','CE','RN','PB','PE','AL',
            'SE','BA','MG','ES','RJ','SP','PR',
            'SC','RS','MS','MT','GO','DF']
    if uf in listaUf:
        return True
    else:
        return False
