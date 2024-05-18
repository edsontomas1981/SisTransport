from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from appMotoristas.views.get_documentos import get_documentos
from appMotoristas.views.login_app import login_app_motorista
from appMotoristas.views.localizacao_motorista import localizacao_motorista


urlpatterns = [
     path('get_dados/',get_documentos,name='get_documentos'),
     path('login_app/',login_app_motorista,name='login_app_motoristas'),
     path('cadastra_usuario_motorista/',login_app_motorista,name='cadastra_usuario_motorista/'),
     path('localizacao_motorista/',localizacao_motorista,name='localizacao_motorista/'),
]