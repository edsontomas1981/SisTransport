from django.test import TestCase
from django.urls import reverse
from unittest.mock import patch
from Classes.dtc import Dtc
from comercial.classes.cotacao import Cotacao
from operacional.classes.cte import Cte

class BuscaDtcViewTest(TestCase):
    def setUp(self):
        self.url = reverse('buscaDtc')  # Certifique-se de que 'buscaDtc' é o nome da URL
    
    @patch('comercial.classes.tabelaFrete.TabelaFrete.get_tabelas_por_parceiro')
    @patch('comercial.classes.cotacao.Cotacao.selectCotacaoByDtc')
    @patch('operacional.classes.nota_fiscal.Nota_fiscal_CRUD.carrega_nfs')
    @patch('operacional.classes.cte.Cte.read')
    @patch('Classes.dtc.Dtc.readDtc')
    def test_busca_dtc_post_success(self, mock_readDtc, mock_read_cte, mock_carrega_nfs, mock_selectCotacaoByDtc, mock_get_tabelas_por_parceiro):
        mock_readDtc.return_value = 200
        mock_read_cte.return_value = Cte()  # Substitua pelo objeto Cte que você quiser retornar
        mock_carrega_nfs.return_value = []  # Substitua pela lista de notas fiscais
        mock_selectCotacaoByDtc.return_value = {'cotacao': 'alguma_cotacao'}  # Substitua pela cotação desejada
        mock_get_tabelas_por_parceiro.return_value = []  # Substitua pela lista de tabelas
        
        response = self.client.post(self.url, {'numPed': 'algum_numero_de_pedido'})
        
        self.assertEqual(response.status_code, 200)
        # Realize mais verificações no conteúdo da resposta JSON, se necessário

    @patch('Classes.dtc.Dtc.readDtc')
    def test_busca_dtc_post_failure(self, mock_readDtc):
        mock_readDtc.return_value = 300
        
        response = self.client.post(self.url, {'numPed': 'algum_numero_de_pedido'})
        
        self.assertEqual(response.status_code, 200)  # Seu código retorna 300, mas a resposta é bem-sucedida
        # Verifique o conteúdo da resposta JSON para garantir que o status seja 300

    def test_busca_dtc_get(self):
        response = self.client.get(self.url)
        
        self.assertEqual(response.status_code, 200)  # Certifique-se de que sua view está retornando um render de sucesso
        # Realize mais verificações no conteúdo da resposta, se necessário
