from Classes.utils import dprint
from chatbot.service.padrao_json_chat import get_campos_solicitacao_coleta,get_campos_nome_amigavel
from chatbot.service.utils import obter_valor_campo,atualizar_campo,obter_proximo_campo,definir_passo_menu,todos_campos_com_sufixo_estao_preenchidos
from chatbot.service.utils import gerar_mensagem_alteracao
from Classes.utils import busca_cep_ws

def processa_solicitacao_coleta(phone_number,chat,msg):
    
    campo_atual = obter_valor_campo(chat, "menu", "passo")
    chat = atualizar_campo(phone_number, chat, "coletas", campo_atual, msg)
    sufixo = campo_atual.split("_")[-1]

    campos_coleta = get_campos_solicitacao_coleta()

    campos = todos_campos_com_sufixo_estao_preenchidos(chat,sufixo,'coletas',get_campos_nome_amigavel())
    if campos :
        atualizar_campo(phone_number, chat, "menu", "passo", 'aguardando')
        return gerar_mensagem_alteracao(get_campos_nome_amigavel(),chat,campos,'coletas'),chat

    if not chat['menu']['passo'] == 'aguardando':


        if '_cep' in campo_atual:
            cep=busca_cep_ws(chat['coletas'][campo_atual])
            cep = cep[1] 
            # sufixo = campo_atual.split("_")[-1]       
            chat = atualizar_campo(phone_number, chat, "coletas", f'endereco_cep_{sufixo}', cep.get('cep',""))
            chat = atualizar_campo(phone_number, chat, "coletas", f'endereco_uf_{sufixo}', cep.get('state',""))
            chat = atualizar_campo(phone_number, chat, "coletas", f'endereco_cidade_{sufixo}', cep.get('city',""))
            chat = atualizar_campo(phone_number, chat, "coletas", f'endereco_bairro_{sufixo}', cep.get('neighborhood',""))
            chat = atualizar_campo(phone_number, chat, "coletas", f'endereco_rua_{sufixo}', cep.get('street'))
    
        prox_campo, pergunta = obter_proximo_campo(chat, "coletas", campos_coleta, campo_atual)
        chat = definir_passo_menu(chat, "menu", "passo", prox_campo)
        atualizar_campo(phone_number, chat, "menu", "passo", prox_campo)

        return pergunta,chat
    
    else:
        
        if msg == 'ok':
            return "Deseja salvar outra coleta?",chat
        
        if msg == 'editar':
            return "Deseja editar outra coleta?",chat
        


    return pergunta,chat



