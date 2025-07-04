from chatbot.service.padrao_json_chat import get_campos_solicitacao_coleta, get_campos_nome_amigavel
from chatbot.service.utils import (
    obter_valor_campo, atualizar_campo, obter_proximo_campo, definir_passo_menu, 
    todos_campos_com_sufixo_estao_preenchidos, gerar_mensagem_alteracao,buscar_campo,
    dict_campos_por_sufixo
)
from Classes.utils import busca_cep_ws,busca_cnpj_ws,dprint,validaCnpjCpf
from enderecos.classes.enderecos import Enderecos
from parceiros.classes.parceiros import Parceiros

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
        return confirma_dados_coleta(phone_number, chat, sufixo),chat

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

def processa_resposta_confirmacao(phone_number, msg, chat, campos_coleta, campo_atual, sufixo):
    """Processa a resposta do usuário após a confirmação dos dados."""
    
    msg = msg.lower().strip()

    print(f'Sufixo : {chat["coletas"]["sufixo"]}')

    if msg == "ok":
        if chat["coletas"]["sufixo"] == 'remetente' or chat["coletas"]["sufixo"] == 'destinatario':
            dprint(f'Filtrado pelo sufixo : {filtrar_por_sufixo(chat["coletas"],chat["coletas"]["sufixo"])}')
            
        prox_campo, pergunta = obter_proximo_campo(chat, "coletas", campos_coleta, campo_atual)
        chat = atualizar_campo(phone_number, chat, "menu", "passo", prox_campo)
        chat = atualizar_campo(phone_number, chat, "coletas", "sufixo", sufixo)
        return pergunta, chat

    try:
        if not msg.isdigit():
            return 'Por favor, digite um número válido.', chat

        idx = int(msg) - 1

        if idx < 0 or idx >= len(chat['coletas']['lista_de_campos']):
            return 'Por favor, digite um número válido.', chat

        campo_alteracao = chat['coletas']['lista_de_campos'][idx]
        dict_campos = get_campos_solicitacao_coleta()
        campo, pergunta = buscar_campo(campo_alteracao, dict_campos)

        chat = atualizar_campo(phone_number, chat, "coletas", campo_alteracao, '')
        chat = atualizar_campo(phone_number, chat, "menu", "menu_atual", "coleta")
        chat = atualizar_campo(phone_number, chat, "menu", "passo", campo)

        return pergunta, chat

    except ValueError:
        return 'Por favor, digite um número válido.', chat
            
def processa_cnpj(phone_number, chat, campo_atual, sufixo):
    """Busca informações do CEP e atualiza os campos de endereço."""

    cnpj = chat["coletas"][campo_atual]

    parceiro,response_cadastro = Parceiros.get_parceiro_cnpj(chat["coletas"][campo_atual])

    if not parceiro:
        response_ws, parceiro = busca_cnpj_ws(chat["coletas"][campo_atual])
        campos_parceiro=prepara_dados_parceiro(parceiro, sufixo, cnpj,'ws')
        dprint(f'parceiro ws : {parceiro}')
    else:
        campos_parceiro = prepara_dados_parceiro(parceiro.to_dict(), sufixo, cnpj,'cad')
        dprint(f'parceiro bd : {parceiro}')

    for campo, valor in campos_parceiro.items():
        chat = atualizar_campo(phone_number, chat, "coletas", campo, valor)

    return chat

def prepara_dados_parceiro(dados,sufixo,cnpj,fonte='cad'):
    """Prepara os dados do parceiro para serem inseridos no chat."""
    if fonte == "ws":
        return  {
            f"cnpj_{sufixo}": dados.get("cnpj", cnpj),
            f"razao_{sufixo}": dados.get("razao_social", ""),
            f"cep_{sufixo}": dados.get("cep", ""),
            f"rua_{sufixo}": dados.get("logradouro", ""),
            f"numero_{sufixo}": dados.get("numero", ""),   
            f"complemento_{sufixo}": dados.get("complemento",""),
            f"bairro_{sufixo}": dados.get("bairro", ""),
            f"cidade_{sufixo}": dados.get("municipio", ""),
            f"uf_{sufixo}": dados.get("uf", ""),
        }

    else:
        return {
            f"cnpj_{sufixo}": dados.get("cnpj", cnpj),
            f"razao_{sufixo}": dados.get("raz_soc", ""),
            f"cep_{sufixo}": dados.get("endereco_fk").get("cep", ""),
            f"rua_{sufixo}": dados.get("endereco_fk").get("logradouro", ""),
            f"numero_{sufixo}": dados.get("endereco_fk").get("numero", ""),
            f"complemento_{sufixo}": dados.get("endereco_fk").get("complemento", ""),
            f"bairro_{sufixo}":dados.get("endereco_fk").get("bairro", ""),
            f"cidade_{sufixo}":dados.get("endereco_fk").get("cidade", ""),
            f"uf_{sufixo}":dados.get("endereco_fk").get("uf", ""),
        }            

def handler_parceiros(chat, sufixo,fonte):
    """Processa os dados do parceiro para serem inseridos no bd."""

    if fonte == 'ws':
        parceiro = {'cnpj':"",'razao':"",'fantasia':"",'inscr':"",}
        cadastra_parceiro()

    dados = {}
    try:

        parceiro = Parceiros.createParceiro(dados)
        return parceiro
    except Exception as e:
        return {"error": str(e)}
    
def filtrar_por_sufixo(dados: dict, sufixo: str) -> dict:
    """
    Filtra os dados do dicionário pelo sufixo informado.
    
    :param dados: Dicionário contendo os dados.
    :param sufixo: Sufixo pelo qual os dados serão filtrados.
    :return: Novo dicionário contendo apenas as chaves que terminam com o sufixo informado.
    """
    return {chave: valor for chave, valor in dados.items() if chave.endswith(f"_{sufixo}")}

def cadastra_parceiro(dados):
    parceiro = Parceiros.cadastrar_parceiro(dados)
    return parceiro

def cadastra_endereco(dados):
    endereco,status = Enderecos.cadastrar_endereco(dados)
    return endereco

