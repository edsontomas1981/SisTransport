from chatbot.handlers.EstadoConversaManager import EstadoConversaManager
from Classes.utils import dprint
from chatbot.service.padrao_json_chat import default_json


def atualizar_estado_conversa(phone_number, dados_json):
    """
    Atualiza o estado da conversa de um usuário no sistema.

    Args:
        phone_number (str): Número de telefone do usuário.
        dados_json (dict): Dados atualizados do chat.

    Returns:
        dict | bool: Estado atualizado ou False em caso de erro.
    """
    try:
        EstadoConversaManager.atualizar_estado_conversa(phone_number, estado_conversa=dados_json)
        return buscar_usuario_por_telefone(phone_number)
    except Exception as e:
        dprint(f'Erro ao atualizar estado da conversa: {e}')
        return False

def inicializar_usuario_com_json_padrao(phone_number):
    """
    Inicializa um usuário com um JSON de estado padrão.

    Args:
        phone_number (str): Número de telefone do usuário.

    Returns:
        dict: Estado inicializado do usuário.
    """
    atualizar_estado_conversa(phone_number, default_json())
    return buscar_usuario_por_telefone(phone_number)

def verificar_campos_preenchidos(chat, campos, entidade):
    """
    Verifica se há campos vazios em uma entidade do chat.

    Args:
        chat (dict): Dados da conversa do usuário.
        campos (list): Lista de campos a serem verificados.
        entidade (str): Nome da entidade dentro do chat.

    Returns:
        tuple | bool: Campo e pergunta correspondente se houver campos vazios, True se todos estiverem preenchidos.
    """
    entidade_data = chat.get(entidade, {})
    
    for campo, pergunta in campos:
        if not entidade_data.get(campo):
            return campo, pergunta

    return True

def criar_usuario(phone_number):
    """
    Cria ou recupera o estado da conversa de um usuário.

    Args:
        phone_number (str): Número de telefone do usuário.

    Returns:
        dict: Estado da conversa do usuário.
    """
    return EstadoConversaManager.get_or_create_estado_conversa(phone_number)

def mensagem_boas_vindas(nome=None):
    """
    Gera uma mensagem de boas-vindas para o usuário.

    Args:
        nome (str, optional): Nome do usuário. Se não fornecido, será feita a pergunta inicial.

    Returns:
        str: Mensagem de boas-vindas.
    """
    if nome:
        return f"Olá, {nome}! Como posso te ajudar?\n\n{menu_principal()}"
    return "Olá! Meu nome é Zé da Carga! 🚛\nAntes de começarmos, como posso te chamar?"

def menu_principal():
    """
    Retorna o menu principal do chatbot.

    Returns:
        str: Opções do menu principal.
    """
    return (
        "1️⃣ - Fazer um pedido\n"
        "2️⃣ - Acompanhar meu pedido\n"
        "3️⃣ - Falar com um atendente\n"
        "4️⃣ - Ver promoções\n"
        "5️⃣ - Sair"
    )

def obter_valor_campo(chat, entidade, campo):
    """
    Obtém o valor de um campo dentro de uma entidade do chat.

    Args:
        chat (dict): Dados do chat do usuário.
        entidade (str): Nome da entidade.
        campo (str): Nome do campo a ser buscado.

    Returns:
        str: Valor do campo ou string vazia se não existir.
    """
    return chat.get(entidade, {}).get(campo, "")

def atualizar_campo(phone_number, chat, entidade, campo, valor):
    """
    Atualiza um campo específico dentro de uma entidade do chat.

    Args:
        phone_number (str): Número de telefone do usuário.
        chat (dict): Dados do chat do usuário.
        entidade (str): Nome da entidade.
        campo (str): Nome do campo a ser atualizado.
        valor (str): Novo valor do campo.

    Returns:
        dict: Chat atualizado.
    """
    chat.setdefault(entidade, {})[campo] = valor
    return atualizar_estado_conversa(phone_number, chat)

def buscar_usuario_por_telefone(phone_number):
    """
    Busca o estado da conversa do usuário pelo telefone.

    Args:
        phone_number (str): Número de telefone do usuário.

    Returns:
        dict | bool: Estado da conversa do usuário ou False se não encontrado.
    """
    usuario = EstadoConversaManager.buscar_por_fone_email(phone_number)
    
    if usuario:
        if not usuario.get("estado_conversa"):
            usuario["estado_conversa"] = inicializar_usuario_com_json_padrao(phone_number)
        return usuario["estado_conversa"]
    
    return False

def obter_proximo_campo(chat, entidade, campos, campo_atual):
    """
    Obtém o próximo campo vazio em uma entidade do chat.

    Args:
        chat (dict): Dados do chat do usuário.
        entidade (str): Nome da entidade.
        campos (list): Lista de campos a serem verificados.
        campo_atual (str): Nome do campo atual.

    Returns:
        tuple: Próximo campo e a pergunta associada ou (False, False) se não houver mais campos.
    """
    entidade_data = chat.get(entidade, {})
        
    for campo, pergunta in campos:
        if not entidade_data.get(campo) and campo != campo_atual and campo != "aguardando":
            print(f'buscando erro aguardando {campo}')
            return campo, pergunta

    return False, False

def definir_passo_menu(chat, entidade, passo, valor):
    """
    Define um passo específico dentro do menu do chat.

    Args:
        chat (dict): Dados do chat do usuário.
        entidade (str): Nome da entidade.
        passo (str): Nome do passo.
        valor (str): Valor a ser definido.

    Returns:
        dict: Chat atualizado.
    """
    chat.setdefault(entidade, {})[passo] = valor
    return chat


def todos_campos_com_sufixo_estao_preenchidos(chat, sufixo, entidade, campos):
    """
    Verifica se todos os campos que terminam com um determinado sufixo estão preenchidos em uma entidade.

    Esta função percorre os campos fornecidos e verifica se todos os campos que terminam com o sufixo especificado
    estão preenchidos na entidade fornecida.

    Parâmetros:
    -----------
    chat : dict
        Um dicionário contendo informações do chat, que pode ser usado para contexto adicional.
    sufixo : str
        O sufixo que identifica os campos que devem ser verificados.
    entidade : dict
        A entidade que contém os campos a serem verificados.
    campos : list
        Uma lista de strings representando os nomes dos campos que devem ser verificados.

    Retorna:
    --------
    bool
        Retorna True se todos os campos correspondentes ao sufixo estiverem preenchidos, False caso contrário.
    """

    lista_campos={}
    idx = 0
    dprint(f'opa esse sufixo aqui {sufixo}')
    for campo,nome_amigavel in campos:
        if campo.endswith(sufixo):
            if chat[entidade][campo] == "":
                return False
            else:
                lista_campos[f'({idx+1}) - {nome_amigavel}']=campo
                idx += 1
    return lista_campos

def gerar_mensagem_alteracao(campos_nome_amigavel, chat, campos, entidade, opcao_invalida=False):
    """
    Gera uma mensagem para o usuário verificar todos os campos preenchidos.
    
    Parâmetros:
    campos_nome_amigavel (dict): Dicionário onde as chaves são os nomes dos campos e os valores são os rótulos amigáveis.
    chat (dict): Dicionário contendo os valores preenchidos pelo usuário para cada campo.
    
    Retorna:
    str: Mensagem formatada com os valores para confirmação do usuário.
    """
    mensagem = ''

    if opcao_invalida:
        mensagem += "Opção inválida! Digite o número do campo que quer mudar ou 'ok' se estiver tudo certo.\n\n"
    else:
        mensagem += "Confere aí os dados:\n\n"

    lista_campos = gera_lista_campos_alteracao(campos)

    chat[entidade]['lista_de_campos'] = lista_campos

    # Itera sobre o dicionário de campos e seus rótulos amigáveis
    for nome_amigavel, campo in campos.items():
        valor = chat.get(entidade).get(campo, "Não informado")  # Obtém o valor do campo ou "Não informado" se não existir
        mensagem += f"{nome_amigavel}: {valor}\n"

    if not opcao_invalida:
        mensagem += "\nOpção inválida! Digite o número do campo que quer mudar ou 'ok' se estiver tudo certo.\n\n"
    
    return mensagem


def gera_lista_campos_alteracao(campos):
    print(campos)
    lista_campos=[]
    for campo,valor in campos.items():
        # dprint(f'Campo {campo} valor {valor}')
        lista_campos.append(valor)
    return lista_campos