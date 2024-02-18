# Identifica campos enviados se estao vazios ou nao
# sendo identificacaoCampo e o nome vindo da requisição
# e nome campo e uma frase mais agradavel para retorno da requisição
from termcolor import colored
from datetime import datetime
import re

def checaCampos(request, **kwargs):
    camposVazios = []
    for identificacaoCampo, nomeCampo in kwargs.items():
        if request.POST.get(identificacaoCampo) == '':
            camposVazios.append(nomeCampo)
    return camposVazios

def checaCamposJson(json,**kwargs):
    # deve ser enviados kwargs com chaves e valores identificando quais 
    # campos sao obrigatorios e quais o nomes para apresenta-los ao usuario 
    # ex nomeContato="Nome do contato"
    listaDeCamposVazios = [nome_apresenta for campo, nome_apresenta in kwargs.items() if json.get(campo) == '']
    return listaDeCamposVazios
    
def checaCamposGeral(request, **kwargs):
    camposInvalidos = []
    for nomeCampo, value in kwargs.items():
        if testaCampos(request[nomeCampo][0], nomeCampo,regrasValidacao={nomeCampo: value}):
            camposInvalidos.append(nomeCampo)
    return camposInvalidos

def testaCampos(dado, tipo_dado):
    if isinstance(dado, tipo_dado):
        if tipo_dado == str:
            if not dado.strip():
                return "Campo não pode ser vazio"
        elif tipo_dado == int or tipo_dado == float:
            if dado <= 0:
                return "Valor não pode ser negativo ou zero"
        return True
    else:
        return "Tipo de dado inválido"

def verificaCamposObrigatorios(request):
    camposObrigatorios = []
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
    if isinstance(stringToFloat,str ):
        if ',' in list(stringToFloat):
            stringToFloat = stringToFloat.replace(".", "")
            stringToFloat = stringToFloat.replace(",", ".")
            stringToFloat = float(stringToFloat)

    if stringToFloat:
        return float(stringToFloat)
    else:
        return 0


def checkBox(check):
    if check == 'on' or check == 1:
        return True
    elif check:
        return False
    else:
        return False


def checaUf(uf):
    listaUf = ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO',
               'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL',
               'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR',
               'SC', 'RS', 'MS', 'MT', 'GO', 'DF']
    if uf in listaUf:
        return True
    else:
        return False

def remove_caracteres_cep(cep):
    """Remove caracteres especiais de um CEP e retorna apenas os dígitos."""
    return re.sub(r'\D', '', cep)


def remove_caracteres_cnpj_cpf(cnpj_cpf):
    """Remove caracteres especiais de um CNPJ/CPF e retorna apenas os dígitos."""
    return re.sub(r'\D', '', cnpj_cpf)



def dprint(*args):
    for i in args:
        print(colored('********************************************', 'red'))
        print(colored(i, 'cyan'))


def dpprint(titulo, *args):
    for i in args:
        print(colored('******************'+titulo+'*************', 'yellow'))
        print(colored(i, 'green'))


def string_para_data(data_str):
    try:
        data = datetime.strptime(data_str, '%Y-%m-%d').date()
        return data
    except ValueError:
        print("Formato de data inválido. Utilize o formato 'YYYY-MM-DD'.")