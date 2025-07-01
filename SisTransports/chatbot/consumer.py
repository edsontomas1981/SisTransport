# # mensagens/consumers.py

# import json
# from channels.generic.websocket import AsyncWebsocketConsumer
# from chatbot.MensagemManager import MensagemManager

# class ChatConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         self.conversa_id = self.scope['url_route']['kwargs']['conversa_id']
#         self.room_group_name = f'chat_{self.conversa_id}'

#         await self.channel_layer.group_add(
#             self.room_group_name,
#             self.channel_name
#         )

#         await self.accept()

#     async def disconnect(self, close_code):
#         await self.channel_layer.group_discard(
#             self.room_group_name,
#             self.channel_name
#         )

#     async def receive(self, text_data):
#         data = json.loads(text_data)
#         mensagem = data.get('mensagem')
#         remetente = data.get('remetente')
#         destinatario = data.get('destinatario')  # precisa ser enviado pelo frontend

#         # Dados para salvar no banco
#         dados_mensagem = {
#             'conversa': self.conversa_id,
#             'remetente': remetente,
#             'destinatario': destinatario,
#             'texto': mensagem,
#         }

#         try:
#             MensagemManager.criar_mensagem(dados_mensagem)
#         except Exception as e:
#             print("Erro ao salvar mensagem:", e)

#         # Log para debug
#         print("Mensagem recebida:", data)

#         # Enviar para o grupo (broadcast)
#         await self.channel_layer.group_send(
#             self.room_group_name,
#             {
#                 'type': 'chat_message',
#                 'mensagem': mensagem,
#                 'remetente': remetente
#             }
#         )

#     async def chat_message(self, event):
#         await self.send(text_data=json.dumps({
#             'mensagem': event['mensagem'],
#             'remetente': event['remetente']
#         }))

