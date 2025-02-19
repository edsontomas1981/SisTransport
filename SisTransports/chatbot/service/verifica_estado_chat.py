from chatbot.handlers.EstadoConversaManager import EstadoConversaManager
from Classes.utils import dprint
from chatbot.service.padrao_json_chat import default_json
from chatbot.handlers.EstadoConversaManager import EstadoConversaManager

def verifica_estado_chat(phone_number,msg):

    '''campos = [
                ('volumes', "Qual é a metragem desses volumes? Pode ser só da maior, tipo 1,0 x 0,59 x 0,89."),
                ('m3', "Agora, qual é o peso total dessa carga?"),
                ('peso', "Qual é o valor desses produtos?"),
                ('valor_nf', "E o número da nota fiscal, você já tem? Se ainda não tiver, é só digitar 'não'."),
                ('num_nf', "Ótimo! Agora, confirme os dados: Volumes: {}, Peso: {} kg, M³: {}, Valor: R$ {}, Nota Fiscal Nº {}. Está tudo correto ou deseja fazer alguma alteração? Digite 'alterar' para modificar os dados ou 'confirma' para prosseguir."),
            ]
    '''


    chat = EstadoConversaManager.buscar_por_fone_email(phone_number)

    if not chat.get('success'):
        chat = EstadoConversaManager.criar_estado_conversa(phone_number)
    
    if not chat.get('estado_conversa'):
        chat['estado_conversa'] = default_json()
        EstadoConversaManager.atualizar_estado_conversa(phone_number, estado_conversa=chat['estado_conversa'])

    if chat['estado_conversa']['menu_atual'] == "":
        campos = [
                    ('nome',"Como posso te chamar?"),
                    ('email',"Me passa teu e-mail pra gente seguir com isso?"),
                    ('fone',"Qual teu número pra gente se falar, se precisar?")
                ]
        resposta = verifica_campos(chat['estado_conversa'], campos, 'dados_cliente')

        dprint(f'resposta{resposta}')

        return {'resposta': resposta}
      
    if chat['estado_conversa']['menu_atual'] == "cadastro_dados" and chat['estado_conversa']['nome'] == "":
        chat['estado_conversa']['menu_atual'] = "cadastro_dados"

    return chat

def verifica_campos(chat,campos,entidade):
    for campo,pergunta in campos:
        if chat[entidade][campo] == "":
            return campo
    return True


# def apresentar():
#     """ Apresentação no primeiro contato, perguntando o nome do cliente. """
#     return f"Olá! Meu nome é Zé da Carga! 🚛\nAntes de começarmos, como posso te chamar?"


# def mostrar_menu(self):
#     menu_texto = "\n📌 MENU PRINCIPAL:\n"
#     for opcao, descricao in self.menu_principal.items():
#         menu_texto += f"{opcao} - {descricao}\n"
#     return menu_texto


