from django.test import TestCase
from chatbot.models import EstadoConversa

class EstadoConversaTestCase(TestCase):
    
    def setUp(self):
        """
        Configuração inicial antes de cada teste.
        """
        self.estado = EstadoConversa.objects.create(
            nome="Teste",
            descricao="Teste descrição",
            fone_email_etc="teste@email.com",
            estado_conversa={"status": "pendente"}
        )

    def test_criar_estado_conversa(self):
        """
        Testa a criação de um EstadoConversa.
        """
        novo_estado = EstadoConversa.objects.create(
            nome="Novo",
            descricao="Novo contato",
            fone_email_etc="novo@email.com",
            estado_conversa={"status": "ativo"}
        )
        self.assertEqual(novo_estado.nome, "Novo")
        self.assertEqual(novo_estado.fone_email_etc, "novo@email.com")

    def test_unicidade_fone_email(self):
        """
        Testa se o campo fone_email_etc é único.
        """
        with self.assertRaises(Exception):
            EstadoConversa.objects.create(
                nome="Duplicado",
                descricao="Teste duplicado",
                fone_email_etc="teste@email.com",  # Repetindo o fone
                estado_conversa={"status": "finalizado"}
            )

    def test_buscar_estado_conversa(self):
        """
        Testa a busca de um EstadoConversa pelo fone_email_etc.
        """
        estado = EstadoConversa.objects.get(fone_email_etc="teste@email.com")
        self.assertEqual(estado.nome, "Teste")

    def test_atualizar_estado_conversa(self):
        """
        Testa a atualização dos dados de um EstadoConversa.
        """
        self.estado.nome = "Teste Atualizado"
        self.estado.save()
        estado_atualizado = EstadoConversa.objects.get(fone_email_etc="teste@email.com")
        self.assertEqual(estado_atualizado.nome, "Teste Atualizado")

    def test_deletar_estado_conversa(self):
        """
        Testa a exclusão de um EstadoConversa.
        """
        self.estado.delete()
        with self.assertRaises(EstadoConversa.DoesNotExist):
            EstadoConversa.objects.get(fone_email_etc="teste@email.com")

    def test_to_dict(self):
        """
        Testa se o método to_dict retorna os dados corretamente.
        """
        esperado = {
            "id": self.estado.id,
            "nome": "Teste",
            "descricao": "Teste descrição",
            "fone_email_etc": "teste@email.com",
            "estado_conversa": {"status": "pendente"}
        }
        self.assertEqual(self.estado.to_dict(), esperado)
