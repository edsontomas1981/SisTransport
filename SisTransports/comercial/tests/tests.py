from django.test import TestCase
from classes.tabelaFrete import TabelaFrete

# Create your tests here.
class ComercialTestCase(TestCase):
    def setUp(self):
        TabelaFrete.objects.create(name="lion", sound="roar")
        TabelaFrete.objects.create(name="cat", sound="meow")

    def test_animals_can_speak(self):
        """Animals that can speak are correctly identified"""
        lion = TabelaFrete.objects.get(name="lion")
        cat = TabelaFrete.objects.get(name="cat")
        self.assertEqual(lion.speak(), 'The lion says "roar"')
        self.assertEqual(cat.speak(), 'The cat says "meow"')