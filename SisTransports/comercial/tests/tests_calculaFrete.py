from comercial.classes.calculaFrete import calculaAdvalor, calculaGris, pesoACalcular, calculaCubagem, calculaPedagio
from comercial.classes.calculaFrete import somaSubtotais, geraPercentualAliquota
from django.test import TestCase, Client


class CalculaFreteTest(TestCase):

    def setUp(self):
        pass

    def test_calculaFrete(self):

        self.assertEqual(geraPercentualAliquota(7), 0.93)
        self.assertEqual(geraPercentualAliquota(12), 0.88)
        self.assertEqual(geraPercentualAliquota(17), 0.83)
        self.assertEqual(geraPercentualAliquota(0),None)
        self.assertEqual(geraPercentualAliquota(-7),None)
        
        self.assertEqual(somaSubtotais(1, 1, 1, 1, 1), 5)
        self.assertEqual(somaSubtotais(1), 1)

        self.assertEqual(calculaAdvalor(7, 1500.00), 105)
        self.assertEqual(calculaAdvalor(0, 1500.00), 0)
        self.assertEqual(calculaAdvalor(7, 0), 0)
        self.assertEqual(calculaAdvalor(-1, 1500.00), 0)
        self.assertEqual(calculaAdvalor(1, -1500.00), 0)

        self.assertEqual(calculaGris(7, 1500.00), 105)
        self.assertEqual(calculaGris(0, 1500.00), 0)
        self.assertEqual(calculaGris(7, 0), 0)
        self.assertEqual(calculaGris(-1, 1500.00), 0)
        self.assertEqual(calculaGris(1, -1500.00), 0)

        self.assertEqual(calculaCubagem(1, 300), 300)
        self.assertEqual(calculaCubagem(0, 300), None)
        self.assertEqual(calculaCubagem(1, 0), None)
        self.assertEqual(calculaCubagem(-1, 300), None)
        self.assertEqual(calculaCubagem(1, -300), None)

        self.assertEqual(pesoACalcular(1, 300), 300)
        self.assertEqual(pesoACalcular(250, 0), 250)

        self.assertEqual(calculaPedagio(1, 5, 250), 15)
        self.assertEqual(calculaPedagio(2, 5, 15), 5)
        self.assertEqual(calculaPedagio(3, 5, 300), None)  # Opcao Invalida
        self.assertEqual(calculaPedagio(0, 5, 300), None)  # Opcao Invalida
        self.assertEqual(calculaPedagio(1, 0, 300), 0)  # Vlr Pedagio invalido
        # Peso de calculo Pedagio invalido
        self.assertEqual(calculaPedagio(1, 5, 0), 0)
