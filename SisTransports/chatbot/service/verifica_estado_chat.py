from chatbot.handlers.EstadoConversaManager import EstadoConversaManager
from Classes.utils import dprint
from chatbot.service.padrao_json_chat import default_json

def _atualizar_json(phone_number, dados_json):
    try:
        EstadoConversaManager.atualizar_estado_conversa(phone_number, estado_conversa=dados_json)
        return _get_sender_by_phone(phone_number)
    except Exception as e:
        dprint(f'erro{e}')
        return False
    
def _inicializar_sender_com_json_padrao(phone_number):
    _atualizar_json(phone_number,default_json())
    return _get_sender_by_phone(phone_number) 

def _verificar_campos(chat, campos, entidade):
    """Verifica se há campos vazios em uma entidade do chat."""
    
    entidade_data = chat.get(entidade, {})
    
    for campo, pergunta in campos:
        if entidade_data.get(campo) == "":
            return campo, pergunta

    return True

def _criar_sender(phone_number):
    return EstadoConversaManager.get_or_create_estado_conversa(phone_number) 

def _apresentar_sem_nome():
    """ Apresentação no primeiro contato, perguntando o nome do cliente. """
    return f"Olá! Meu nome é Zé da Carga! 🚛\nAntes de começarmos, como posso te chamar?"

def _apresentar_com_nome(nome):
    """Apresentação no primeiro contato, perguntando o nome do cliente e exibindo o menu."""
    
    menu = (
        "1️⃣ - Fazer um pedido\n"
        "2️⃣ - Acompanhar meu pedido\n"
        "3️⃣ - Falar com um atendente\n"
        "4️⃣ - Ver promoções\n"
        "5️⃣ - Sair"
    )
    
    return f"Olá, {nome}! Como posso te ajudar?\n\n{menu}"

def _enviar_menu():
    menu = (
        "1️⃣ - Fazer um pedido\n"
        "2️⃣ - Acompanhar meu pedido\n"
        "3️⃣ - Falar com um atendente\n"
        "4️⃣ - Ver promoções\n"
        "5️⃣ - Sair"
    )
    
    return f"{menu}"


def _popular_campo(phone_number,chat, campo, entidade,valor):
    """Popula os campos de uma entidade do chat."""
    chat[entidade][campo] = valor
    return _atualizar_json(phone_number, chat)

def _get_sender_by_phone(phone_number):
    sender = EstadoConversaManager.buscar_por_fone_email(phone_number)
    if sender:
        if not sender["estado_conversa"]:
            sender["estado_conversa"] = _inicializar_sender_com_json_padrao(phone_number)
            return sender["estado_conversa"]
        return sender["estado_conversa"]
    return False

def _retornar_campo_atual(chat, entidade,campos):

    """Verifica se há campos vazios em uma entidade do chat."""

    entidade_data = chat.get(entidade, {})
    for campo, pergunta in campos:
        if entidade_data.get(campo) == "":
            return campo, pergunta

    return True

def _retornar_proximo_campo(chat, entidade,campos,campo_atual):
    """Verifica se há campos vazios em uma entidade do chat."""
    entidade_data = chat.get(entidade, {})
    for campo, pergunta in campos:
            if entidade_data.get(campo) == "" and not campo == campo_atual:
                return campo,pergunta
    return False,False

def verifica_estado_chat(phone_number,msg):

    '''campos = [
                ('volumes', "Qual é a metragem desses volumes? Pode ser só da maior, tipo 1,0 x 0,59 x 0,89."),
                ('m3', "Agora, qual é o peso total dessa carga?"),
                ('peso', "Qual é o valor desses produtos?"),
                ('valor_nf', "E o número da nota fiscal, você já tem? Se ainda não tiver, é só digitar 'não'."),
                ('num_nf', "Ótimo! Agora, confirme os dados: Volumes: {}, Peso: {} kg, M³: {}, Valor: R$ {}, Nota Fiscal Nº {}. Está tudo correto ou deseja fazer alguma alteração? Digite 'alterar' para modificar os dados ou 'confirma' para prosseguir."),
            ]
    '''
    campos_cadastro = [
                ('nome', "Qual é o seu nome?"),
                ('fone', "Qual é o seu telefone?"),
                ('email', "Qual é o seu email?"),
            ]

    chat = _get_sender_by_phone(phone_number)

    #Primeiro contato com o sender cadastra e começa a solicitar os dados,começando pelo nome
    if not chat:
        chat = _criar_sender(phone_number)
        chat = _inicializar_sender_com_json_padrao(phone_number)
        chat = _popular_campo(phone_number,chat,'passo','menu','nome')
        _atualizar_json(phone_number, chat)
        return _apresentar_sem_nome()

    if chat['menu']['menu_atual'] == 'cadastro':
        campo_atual = chat['menu']['passo']
        chat = _popular_campo(phone_number, chat, campo_atual, 'data_sender', msg)
        prox_campo,pergunta = _retornar_proximo_campo(chat, 'data_sender', campos_cadastro, campo_atual)
        chat['menu']['passo'] = prox_campo
        chat = _popular_campo(phone_number, chat, 'passo', 'menu', prox_campo)

        if not prox_campo:
            _popular_campo(phone_number, chat, 'menu_atual', 'menu', 'menu')
            return _enviar_menu()

        return pergunta

    if chat['menu']['menu_atual'] == 'menu' and (chat['menu']['passo'] == "" or not chat['menu']['passo']):
        return _enviar_menu()



    chat = _get_sender_by_phone(phone_number)

    return chat







# def mostrar_menu(self):
#     menu_texto = "\n📌 MENU PRINCIPAL:\n"
#     for opcao, descricao in self.menu_principal.items():
#         menu_texto += f"{opcao} - {descricao}\n"
#     return menu_texto


