from django.test import TestCase, Client
from Classes.utils import checaCamposGeral



class UtilsTest(TestCase):
    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_validaCampos(self):
        dados={'campo':{'nome':'nome',
                        'tipo':'tipo'},
                'campo2':{'nome':'nome',
                        'tipo':'tipo'},
                'campo3':{'nome':'nome',
                        'tipo':'tipo'}}
        checaCamposGeral(dados,nome='desc',tipo='tipo')
