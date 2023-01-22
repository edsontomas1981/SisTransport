from faturamento.components.calculaFrete import calculaAdvalor, calculaGris, pesoACalcular, calculaCubagem, calculaPedagio
from faturamento.components.calculaFrete import somaSubtotais, geraPercentualAliquota,freteFaixa
from django.test import TestCase, Client


class CalculaFreteTest(TestCase):

    def setUp(self):
        self.geraFaixas=[{'id': 1, 'faixaInicial': 1, 'faixaFinal': 30, 'vlrFaixa': '10.00'},
                    {'id': 2, 'faixaInicial': 31, 'faixaFinal': 50, 'vlrFaixa': '20.00'},
                    {'id': 3, 'faixaInicial': 51, 'faixaFinal': 70, 'vlrFaixa': '30.00'},
                    {'id': 4, 'faixaInicial': 71, 'faixaFinal': 80, 'vlrFaixa': '40.00'}]
                    

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
        
            
