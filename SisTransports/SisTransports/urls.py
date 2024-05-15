"""SisTransports URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
# from SisTransports.operacional.admin import ModelosJSON
urlpatterns = [
    path('' , include('principal.urls')),
    path('admin/', admin.site.urls),
    path('auth/', include('autenticacao.urls')),
    path('comercial/' , include('comercial.urls')),
    path('faturamento/' , include('faturamento.urls')),
    path('financeiro/' , include('financeiro.urls')),
    path('contato/' , include('contatos.urls')),
    path('parceiros/' , include('parceiros.urls')),
    path('operacional/' , include('operacional.urls')),
    path('appMotoristas/' , include('appMotoristas.urls')),

]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
