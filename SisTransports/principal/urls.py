from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from principal import views

urlpatterns = [
    path('',views.home,
         name='home'),
]