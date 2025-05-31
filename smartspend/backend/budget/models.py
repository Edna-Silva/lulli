from django.db import models
from wallet.models import Wallet
from category.models import Category
from authentication.models import User


# Create your models here.
class Budget(models.Model):
    name = models.CharField(max_length=50)
    total_amount = models.FloatField(default=0.0)
    current_expenditure = models.FloatField(default=0.0)
    categories = models.ForeignKey(Category, on_delete=models.CASCADE)
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    month = models.IntegerField(default=0)
    year = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = 'budget'
        db_table_comment = 'A table for all the budgets'

    def __str__(self):
        return f'{self.name} - {self.total_amount}'
