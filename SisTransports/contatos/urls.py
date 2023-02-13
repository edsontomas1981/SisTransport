from django.conf import settings
from django.conf.urls.static import static
from django.urls import path,include
from contatos import views as viewsContato

urlpatterns = [
    path('',viewsContato.contato,name='contato'),
    path('createContato/',viewsContato.createContato,name='createContato'),
    path('readContato/',viewsContato.readContato,name='readContato'),
    path('readContatos/',viewsContato.readContatos,name='readContatos/'),
    path('updateContato/',viewsContato.updateContato,name='updateContato'),
    path('deleteContato/',viewsContato.deleteContato,name='deleteContato'),
    ]
    