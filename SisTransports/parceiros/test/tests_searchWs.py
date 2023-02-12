from django.test import TestCase
from Classes.buscaCnpjWs import cnpjWs

class SearchWsTestCase(TestCase):
    def test_createParceiro(self):
        parceiroWs,status=cnpjWs('23926683000108')
        self.assertEqual(status,200)

        
