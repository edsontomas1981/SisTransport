from channels.generic.websocket import WebsocketConsumer
import json

class Mapa(WebsocketConsumer):
    # Mantém um dicionário de todos os consumidores conectados, usando a placa como chave
    consumers = {}

    def connect(self):
        # Extrai a placa do parâmetro da query string
        self.id = self.scope['query_string'].decode().split('=')[1]

        # Aceita a conexão do consumidor
        self.accept()

        # Adiciona este consumidor ao dicionário de consumidores, usando a placa como chave
        self.consumers[self.id] = self

    def disconnect(self, close_code):
        # Remove o consumidor do dicionário quando a conexão é fechada
        if self.id in self.consumers:
            del self.consumers[self.id]

    def receive(self, text_data):
        # Recebe dados do consumidor atual
        data = json.loads(text_data)

        # Verifica se há um destinatário específico (placa) na mensagem
        if 'destinatario' in data and data['destinatario'] in self.consumers:
            # Envia a mensagem para o consumidor específico (destinatário)
            self.consumers[data['destinatario']].send(text_data=json.dumps(data))
        else:
            # Se não houver destinatário específico ou destinatário inválido, envia a mensagem para todos os consumidores conectados
            for consumer in self.consumers.values():
                if consumer != self:
                    consumer.send(text_data=json.dumps(data))

    