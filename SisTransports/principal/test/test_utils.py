from django.test import TestCase, Client
from Classes.utils import checaCamposGeral, dprint, dpprint


class UtilsTest(TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_validaTipo(self):
        '''Testa validação tipo de dado'''
        request = {'peso': ['1'], 'qtde': [5], 'vlrNf': [
            1500.00], 'm3': [0], 'desc': ['teste']}
        resultado = checaCamposGeral(request, peso={'descricao': 'peso',
                                                    'tipoDado': [int],
                                                    'tamanhoMinimo': [0],
                                                    'tamanhoMaximo': [10],
                                                    'obrigatorio': [False],
                                                    'negativo': [False],
                                                    'zero': [False],
                                                    })
        self.assertListEqual(resultado, ['peso'])

    def test_validaTamanhoMinimo(self):
        '''Testa validação tamanho '''
        request = {'peso': [1], 'qtde': [5], 'vlrNf': [1500.00],
                   'm3': [0], 'desc': ['teste']}
        resultado = checaCamposGeral(request, desc={'descricao': 'peso',
                                                    'tamanhoMinimo': [15],
                                                    'tamanhoMaximo': [25],
                                                    'obrigatorio': [False],
                                                    'negativo': [False],
                                                    'zero': [False],
                                                    })
        self.assertListEqual(resultado, ['desc'])

    def test_validaTamanhoMaximo(self):
        '''Testa validação tamanho '''
        request = {'peso': [1], 'qtde': [5], 'vlrNf': [1500.00],
                   'm3': [0], 'desc': ['teste']}
        resultado = checaCamposGeral(request, desc={'descricao': 'peso',
                                                    'tamanhoMinimo': [0],
                                                    'tamanhoMaximo': [3],
                                                    'obrigatorio': [False],
                                                    'negativo': [False],
                                                    'zero': [False],
                                                    })
        self.assertListEqual(resultado, ['desc'])

    def test_validaTamanhoObrigatorio(self):
        '''Testa validação tamanho '''
        request = {'peso': [1], 'qtde': [5], 'vlrNf': [1500.00],
                   'm3': [0], 'desc': ['']}
        resultado = checaCamposGeral(request, desc={'descricao': 'peso',
                                                    'obrigatorio': [True],
                                                    'negativo': [False],
                                                    'zero': [False],
                                                    })
        self.assertListEqual(resultado, ['desc'])

    def test_validaNumeroNegativo(self):        
        '''Testa validação tamanho '''
        request = {'peso': [-1], 'qtde': [5], 'vlrNf': [1500.00], 
                   'm3': [0], 'desc': ['']}
        resultado = checaCamposGeral(request, peso={'descricao': 'peso',
                                                    'negativo': [False],
                                                    })
        self.assertListEqual (resultado, ['peso']) 
        
    def test_validaNumeroZero(self):        
        '''Testa validação tamanho '''
        request = {'peso': [0], 'qtde': [5], 'vlrNf': [1500.00], 
                   'm3': [0], 'desc': ['']}
        resultado = checaCamposGeral(request, peso={'descricao': 'peso',
                                                    'zero': [False],
                                                    })
        self.assertListEqual (resultado, ['peso'])           

        # qtde={'descricao': 'qtde',
        # 'tipoDado': [int],
        # 'obrigatorio': [False],
        # 'tamanhoMinimo': [0],
        # 'tamanho': [10],
        # 'negativo': [False],
        # 'zero': [False],
        # },
        # desc={'descricao': 'qtde',
        # 'tipoDado': [str],
        # 'obrigatorio': [False],
        # 'tamanhoMinimo': [0],
        # 'tamanho': [10],
        # 'negativo': [False],
        # 'zero': [False],
        # },)
