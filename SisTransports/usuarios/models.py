from django.contrib.auth.models import AbstractUser 
from django.db import models
from operacional.models.emissor import Emissor

class Usuarios(AbstractUser):
    token = models.CharField(max_length=255, null=True, blank=True)
    emissor_fk = models.ForeignKey(Emissor, on_delete=models.CASCADE, null=True, related_name='emissor_usuarios')
