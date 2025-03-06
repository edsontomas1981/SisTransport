from chatbot.service.padrao_json_chat import get_campos_solicitacao_coleta, get_campos_nome_amigavel
from chatbot.service.utils import (
    obter_valor_campo, atualizar_campo, obter_proximo_campo, definir_passo_menu, 
    todos_campos_com_sufixo_estao_preenchidos, gerar_mensagem_alteracao,buscar_campo,
    dict_campos_por_sufixo
)
from Classes.utils import busca_cep_ws,busca_cnpj_ws,dprint,validaCnpjCpf


def processa_solicitacao_coleta(phone_number, chat, msg):
    
    """Processa a solicitação de coleta interagindo com o chatbot."""

    campos_coleta = get_campos_solicitacao_coleta()
    campo_atual = obter_valor_campo(chat, "menu", "passo")

    
    sufixo = campo_atual.split("_")[-1]

    sufixo = sufixo if sufixo != "aguardando" else ""

    if campo_atual != "aguardando":
        chat = atualizar_campo(phone_number, chat, "coletas", campo_atual, msg)

    campos_preenchidos = todos_campos_com_sufixo_estao_preenchidos(
        chat, sufixo, "coletas", get_campos_nome_amigavel()
    )

    if campos_preenchidos:

        return confirma_dados_coleta(phone_number, chat, sufixo)

    if chat["menu"]["passo"] != "aguardando":
        if "_cep" in campo_atual:
            chat = atualizar_campo(phone_number, chat, "coletas", campo_atual, msg)
            chat = processa_endereco_cep(phone_number, chat, campo_atual, sufixo)

        if "cnpj_" in campo_atual:
            if not validaCnpjCpf(msg):
                return "CNPJ inválido. Por favor, insira um CNPJ válido.", chat
            
            chat = processa_cnpj(phone_number, chat, campo_atual, sufixo)

        prox_campo, pergunta = obter_proximo_campo(chat, "coletas", campos_coleta, campo_atual)
        chat = definir_passo_menu(chat, "menu", "passo", prox_campo)
        chat = atualizar_campo(phone_number, chat, "menu", "passo", prox_campo)

        return pergunta, chat
    
    if campos_preenchidos:
        return processa_resposta_confirmacao(phone_number,msg, chat, campos_coleta, campo_atual, sufixo)

    return processa_resposta_confirmacao(phone_number,msg, chat, campos_coleta, campo_atual, sufixo)

def confirma_dados_coleta(phone_number, chat, sufixo):
    """Confirma os dados antes de continuar com a coleta."""

    atualizar_campo(phone_number, chat, "menu", "passo", "aguardando")
    atualizar_campo(phone_number, chat, "coletas", "sufixo", sufixo)

    campos_verificar = dict_campos_por_sufixo(chat,sufixo,'coletas',get_campos_nome_amigavel())
    
    return gerar_mensagem_alteracao(get_campos_nome_amigavel(), chat,campos_verificar,'coletas'), chat

def processa_endereco_cep(phone_number, chat, campo_atual, sufixo):
    """Busca informações do CEP e atualiza os campos de endereço."""

    cep_info = busca_cep_ws(chat["coletas"][campo_atual])[1]
    
    campos_endereco = {
        f"endereco_cep_{sufixo}": cep_info.get("cep", chat["coletas"][campo_atual]),
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
            try:
                idx = int(msg) - 1
                campo_alteracao = chat['coletas']['lista_de_campos'][idx]
                dict_campos = get_campos_solicitacao_coleta()
                campo,pergunta = buscar_campo(campo_alteracao,dict_campos)
                chat = atualizar_campo(phone_number, chat, "coletas", campo_alteracao, '')
                chat = atualizar_campo(phone_number, chat, "menu", "menu_atual", "coleta")
                chat = atualizar_campo(phone_number, chat, "menu", "passo", campo)
                return pergunta, chat

            except ValueError:
                return 'Por favor, digite um número válido.', chat
            
def processa_cnpj(phone_number, chat, campo_atual, sufixo):
    """Busca informações do CEP e atualiza os campos de endereço."""

    status, parceiro = busca_cnpj_ws(chat["coletas"][campo_atual])

    campos_parceiro = {
        f"cnpj_{sufixo}": parceiro.get("cnpj", chat["coletas"][campo_atual]),
        f"razao_{sufixo}": parceiro.get("razao_social", ""),
        f"cep_{sufixo}": parceiro.get("cep", ""),
        f"rua_{sufixo}": parceiro.get("logradouro", ""),
        f"numero_{sufixo}": parceiro.get("numero", ""),   
        f"complemento_{sufixo}": parceiro.get("complemento",""),
        f"bairro_{sufixo}": parceiro.get("bairro", ""),
        f"cidade_{sufixo}": parceiro.get("municipio", ""),
        f"uf_{sufixo}": parceiro.get("uf", ""),
    }

    dprint(campos_parceiro)

    for campo, valor in campos_parceiro.items():
        chat = atualizar_campo(phone_number, chat, "coletas", campo, valor)

    return chat
                