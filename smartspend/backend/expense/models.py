from django.db import models
from category.models import Category
from authentication.models import User


# Create your models here.
class Expense(models.Model):
    name = models.CharField(max_length=55)
    amount = models.FloatField()
    category = models.ForeignKey(to=Category, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now=True)
    description = models.TextField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = 'expense'
        db_table_comment = 'A table for all the expenses'

    def __str__(self):
        return f'{self.name} - {self.amount}'
