from Classes.utils import dprint
from chatbot.service.padrao_json_chat import get_campos_solicitacao_coleta, get_campos_nome_amigavel
from chatbot.service.utils import (
    obter_valor_campo, atualizar_campo, obter_proximo_campo, definir_passo_menu, 
    todos_campos_com_sufixo_estao_preenchidos, gerar_mensagem_alteracao
)
from Classes.utils import busca_cep_ws


def processa_solicitacao_coleta(phone_number, chat, msg):
    
    """Processa a solicitação de coleta interagindo com o chatbot."""

    campos_coleta = get_campos_solicitacao_coleta()
    campo_atual = obter_valor_campo(chat, "menu", "passo")

    sufixo = campo_atual.split("_")[-1]
    sufixo = sufixo if sufixo !="aguardando" else ""

    if campo_atual != "aguardando":
        chat = atualizar_campo(phone_number, chat, "coletas", campo_atual, msg)

    campos_preenchidos = todos_campos_com_sufixo_estao_preenchidos(
        chat, sufixo, "coletas", get_campos_nome_amigavel()
    )

    if campos_preenchidos:
        return confirma_dados_coleta(phone_number, chat, sufixo)

    if chat["menu"]["passo"] != "aguardando":
        if "_cep" in campo_atual:
            atualizar_campo(phone_number, chat, "coletas", campo_atual, msg)
            chat = processa_endereco_cep(phone_number, chat, campo_atual, sufixo)

        prox_campo, pergunta = obter_proximo_campo(chat, "coletas", campos_coleta, campo_atual)
        chat = definir_passo_menu(chat, "menu", "passo", prox_campo)
        atualizar_campo(phone_number, chat, "menu", "passo", prox_campo)

        return pergunta, chat

    return processa_resposta_confirmacao(phone_number,msg, chat, campos_coleta, campo_atual, sufixo)

def confirma_dados_coleta(phone_number, chat, sufixo):
    """Confirma os dados antes de continuar com a coleta."""
    
    atualizar_campo(phone_number, chat, "menu", "passo", "aguardando")
    atualizar_campo(phone_number, chat, "coletas", "sufixo", sufixo)
    
    campos_preenchidos = todos_campos_com_sufixo_estao_preenchidos(
        chat, sufixo, "coletas", get_campos_nome_amigavel()
    )
    
    return gerar_mensagem_alteracao(get_campos_nome_amigavel(), chat, campos_preenchidos, "coletas"), chat


def processa_endereco_cep(phone_number, chat, campo_atual, sufixo):
    """Busca informações do CEP e atualiza os campos de endereço."""

    cep_info = busca_cep_ws(chat["coletas"][campo_atual])[1]
    
    campos_endereco = {
        f"endereco_cep_{sufixo}": cep_info.get("cep", ""),
        f"endereco_uf_{sufixo}": cep_info.get("state", ""),
        f"endereco_cidade_{sufixo}": cep_info.get("city", ""),
        f"endereco_bairro_{sufixo}": cep_info.get("neighborhood", ""),
        f"endereco_rua_{sufixo}": cep_info.get("street", ""),
    }

    for campo, valor in campos_endereco.items():
        chat = atualizar_campo(phone_number, chat, "coletas", campo, valor)

    return chat


def processa_resposta_confirmacao(phone_number,msg, chat, campos_coleta, campo_atual, sufixo):
    """Processa a resposta do usuário após a confirmação dos dados."""

    match msg:
        case "ok":
            prox_campo, pergunta = obter_proximo_campo(chat, "coletas", campos_coleta, campo_atual)
            chat = atualizar_campo(phone_number, chat,"menu", "passo", prox_campo)
            chat = atualizar_campo(phone_number, chat, "coletas", "sufixo", sufixo)
            return pergunta, chat

        case _:
            if isinstance(msg, str) or isinstance(msg, int):
                try:
                    idx = int(msg) - 1
                    dprint('entrei no int')
                    print(f'Índice calculado: {idx}')
                except ValueError:
                    dprint('A mensagem não é um número válido para conversão em int.')

            if sufixo == "":
                sufixo = chat['coletas']['sufixo']
            campos_preenchidos = todos_campos_com_sufixo_estao_preenchidos(
                chat, sufixo, "coletas", get_campos_nome_amigavel()
            )
            return gerar_mensagem_alteracao(get_campos_nome_amigavel(), chat, campos_preenchidos, "coletas",True), chat
