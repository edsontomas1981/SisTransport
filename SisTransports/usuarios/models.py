from django.contrib.auth.models import AbstractUser 
from django.db import models

class Usuarios(AbstractUser):
    token = models.CharField(max_length=255, null=True, blank=True)