from django.test import TestCase
from django.contrib.auth.models import User
from chatbot.models import ChatMessage

class ChatMessageManagerTest(TestCase):
    def setUp(self):
        # Criar usuários para os testes
        self.remetente = User.objects.create_user(username="usuario1", password="senha123")
        self.destinatario = User.objects.create_user(username="usuario2", password="senha123")
    
    def test_criar_mensagem(self):
        """
        Testa a criação de uma nova mensagem usando o método 'criar_mensagem'.
        """
        mensagem = ChatMessage.objects.criar_mensagem(
            remetente=self.remetente,
            destinatario=self.destinatario,
            mensagem="Oi, tudo bem?",
            estado_conversa={"status": "ativo"}
        )
        
        self.assertEqual(mensagem.remetente, self.remetente)
        self.assertEqual(mensagem.destinatario, self.destinatario)
        self.assertEqual(mensagem.mensagem, "Oi, tudo bem?")
        self.assertEqual(mensagem.estado_conversa, {"status": "ativo"})
        self.assertFalse(mensagem.lida)  # Por padrão, a mensagem não deve estar lida

    def test_obter_mensagens(self):
        """
        Testa o filtro de mensagens com o método 'obter_mensagens'.
        """
        # Criar algumas mensagens
        mensagem1 = ChatMessage.objects.criar_mensagem(
            remetente=self.remetente,
            destinatario=self.destinatario,
            mensagem="Mensagem 1"
        )
        mensagem2 = ChatMessage.objects.criar_mensagem(
            remetente=self.remetente,
            destinatario=self.destinatario,
            mensagem="Mensagem 2",
            lida=True
        )
        
        # Obter mensagens não lidas
        mensagens_nao_lidas = ChatMessage.objects.obter_mensagens(remetente=self.remetente, lida=False)
        self.assertIn(mensagem1, mensagens_nao_lidas)
        self.assertNotIn(mensagem2, mensagens_nao_lidas)
        
        # Obter mensagens lidas
        mensagens_lidas = ChatMessage.objects.obter_mensagens(remetente=self.remetente, lida=True)
        self.assertIn(mensagem2, mensagens_lidas)
        self.assertNotIn(mensagem1, mensagens_lidas)

    def test_marcar_como_lida(self):
        """
        Testa o método 'marcar_como_lida'.
        """
        # Criar uma mensagem
        mensagem = ChatMessage.objects.criar_mensagem(
            remetente=self.remetente,
            destinatario=self.destinatario,
            mensagem="Mensagem para marcar como lida"
        )
        
        # Verificar se a mensagem não está lida inicialmente
        self.assertFalse(mensagem.lida)
        
        # Marcar como lida
        mensagem = ChatMessage.objects.marcar_mensagem_como_lida(mensagem.id)
        
        # Verificar se a mensagem foi marcada como lida
        self.assertTrue(mensagem.lida)

    def test_deletar_mensagem(self):
        """
        Testa a exclusão de uma mensagem com o método 'deletar_mensagem'.
        """
        # Criar uma mensagem
        mensagem = ChatMessage.objects.criar_mensagem(
            remetente=self.remetente,
            destinatario=self.destinatario,
            mensagem="Mensagem a ser deletada"
        )
        
        # Verificar se a mensagem existe
        self.assertTrue(ChatMessage.objects.filter(id=mensagem.id).exists())
        
        # Deletar a mensagem
        resultado = ChatMessage.objects.deletar_mensagem(mensagem.id)
        
        # Verificar se a mensagem foi deletada
        self.assertTrue(resultado)
        self.assertFalse(ChatMessage.objects.filter(id=mensagem.id).exists())

    def test_buscar_mensagens_por_estado(self):
        """
        Testa a busca de mensagens com base no estado da conversa.
        """
        # Criar mensagens com diferentes estados
        mensagem1 = ChatMessage.objects.criar_mensagem(
            remetente=self.remetente,
            destinatario=self.destinatario,
            mensagem="Mensagem 1",
            estado_conversa={"status": "ativo"}
        )
        mensagem2 = ChatMessage.objects.criar_mensagem(
            remetente=self.remetente,
            destinatario=self.destinatario,
            mensagem="Mensagem 2",
            estado_conversa={"status": "inativo"}
        )
        
        # Buscar mensagens com estado "ativo"
        mensagens_ativas = ChatMessage.objects.buscar_mensagens_por_estado("ativo")
        self.assertIn(mensagem1, mensagens_ativas)
        self.assertNotIn(mensagem2, mensagens_ativas)
        
        # Buscar mensagens com estado "inativo"
        mensagens_inativas = ChatMessage.objects.buscar_mensagens_por_estado("inativo")
        self.assertIn(mensagem2, mensagens_inativas)
        self.assertNotIn(mensagem1, mensagens_inativas)
