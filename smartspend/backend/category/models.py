from django.db import models
from authentication.models import User


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=150)
    icon_name = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        db_table = 'category'
        db_table_comment = 'A table for all the categories'

    def __str__(self):
        return self.name
