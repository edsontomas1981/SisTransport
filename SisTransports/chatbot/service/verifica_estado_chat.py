from chatbot.handlers.EstadoConversaManager import EstadoConversaManager
from Classes.utils import dprint
from chatbot.service.padrao_json_chat import default_json, get_campos_cadastro

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
        if not entidade_data.get(campo) and campo != campo_atual:
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

def processar_mensagem(phone_number, mensagem):
    """
    Processa a mensagem do usuário e define a resposta apropriada.

    Args:
        phone_number (str): Número de telefone do usuário.
        mensagem (str): Mensagem enviada pelo usuário.

    Returns:
        str | dict: Resposta do chatbot ou estado atualizado do chat.
    """
    chat = buscar_usuario_por_telefone(phone_number)

    if not chat:
        chat = criar_usuario(phone_number)
        chat = inicializar_usuario_com_json_padrao(phone_number)
        chat = atualizar_campo(phone_number, chat, "menu", "passo", "nome")
        atualizar_estado_conversa(phone_number, chat)
        return mensagem_boas_vindas()

    if chat["menu"]["menu_atual"] == "cadastro":
        campos_cadastro = get_campos_cadastro()
        campo_atual = obter_valor_campo(chat, "menu", "passo")
        chat = atualizar_campo(phone_number, chat, "data_sender", campo_atual, mensagem)
        prox_campo, pergunta = obter_proximo_campo(chat, "data_sender", campos_cadastro, campo_atual)
        chat = definir_passo_menu(chat, "menu", "passo", prox_campo)
        atualizar_campo(phone_number, chat, "menu", "passo", prox_campo)

        if not prox_campo:
            atualizar_campo(phone_number, chat, "menu", "menu_atual", "menu")
            return menu_principal()

        return pergunta

    if chat["menu"]["menu_atual"] == "menu" and not chat["menu"].get("passo"):
        return menu_principal()

    return chat

