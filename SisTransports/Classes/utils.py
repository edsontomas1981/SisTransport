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