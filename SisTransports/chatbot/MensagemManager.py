# mensagens/controllers/MensagemManager.py

mensagens_memoria = {}

class MensagemManager:
    @staticmethod
    def criar_mensagem(dados):
        conversa = dados.get("conversa")
        if not conversa:
            raise ValueError("conversa é obrigatória")

        if conversa not in mensagens_memoria:
            mensagens_memoria[conversa] = []

        mensagens_memoria[conversa].append({
            "remetente": dados["remetente"],
            "destinatario": dados["destinatario"],
            "texto": dados["texto"]
        })

        return True

    @staticmethod
    def listar_mensagens(conversa):
        return mensagens_memoria.get(conversa, [])

