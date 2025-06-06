from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from .managers import UserManager


# Create your models here.
class User(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    is_onboarded = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email
