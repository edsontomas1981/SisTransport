from chatbot.handlers.EstadoConversaManager import EstadoConversaManager
from Classes.utils import dprint
from chatbot.service.padrao_json_chat import default_json, get_campos_cadastro
from chatbot.service.utils import atualizar_estado_conversa,inicializar_usuario_com_json_padrao,verificar_campos
from chatbot.service.utils import criar_usuario,mensagem_boas_vindas,menu_principal,obter_valor_campo,atualizar_campo
from chatbot.service.utils import buscar_usuario_por_telefone,obter_proximo_campo,definir_passo_menu
from chatbot.service.solicitar_coleta import processa_solicitacao_coleta

def processar_mensagem(phone_number, mensagem):
    """
    Processa a mensagem do usuário e define a resposta apropriada.

    Args:
        phone_number (str): Número de telefone do usuário.
        mensagem (str): Mensagem enviada pelo usuário.

    Returns:
        str | dict: Resposta do chatbot ou estado atualizado do chat.
    """

    pergunta = "Qual o endereço da coleta?"

    if mensagem == "menu":
        return menu_principal()

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
        dprint(f'chat -0: {chat}')


        if not prox_campo or prox_campo == "":
            atualizar_campo(phone_number, chat, "menu", "menu_atual", "menu")
            return menu_principal()

        return pergunta

    if chat["menu"]["menu_atual"] == "menu" and not chat["menu"].get("passo"):
        match mensagem:
            case "1":
                chat = definir_passo_menu(chat, "menu", "menu_atual", "coleta")
                chat = definir_passo_menu(chat, "menu", "passo", "endereco_cep_coleta")
                atualizar_estado_conversa(phone_number, chat)
                return "Beleza! Agora me passa o CEP do local de coleta."

            case "2":
                return "Acompanhar meu pedido"

            case "3":
                return "Falar com um atendente"

            case "4":
                return "Ver promoções"

            case "5":
                return "Sair"

            case _:
                return menu_principal()
            
    if chat["menu"]["menu_atual"] == "coleta":

        teste = processa_solicitacao_coleta(phone_number,chat,mensagem)
        # pergunta,chat  = processa_solicitacao_coleta(phone_number,chat,mensagem)
        # atualizar_estado_conversa(phone_number, chat)

        # dprint(f'chat chat: {chat}' )
        # dprint(f'obter_proximo_campo: {obter_proximo_campo(chat, "coletas", get_campos_cadastro(), chat["menu"]["passo"])}')
        # dprint(f'campos {chat["menu"]["passo"]}')
        teste= verificar_campos(chat,chat["coletas"]["lista_de_campos"],"coletas")
        dprint(f'verificar_campos_preenchidos: {teste}')
        return pergunta

    return chat

