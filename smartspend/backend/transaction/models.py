from django.db import models
from income.models import Income
from expense.models import Expense
from authentication.models import User

TRANSACTION_TYPE = (
    ('INCOME', 'income'),
    ('EXPENSE', 'expense'),
    ('TRANSFER', 'transfer')
)


# Create your models here.
class Transaction(models.Model):
    type = models.CharField(max_length=40, choices=TRANSACTION_TYPE)
    income = models.ForeignKey(Income, on_delete=models.CASCADE, null=True, blank=True)
    expense = models.ForeignKey(Expense, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=150, default='', null=True, blank=True)

    class Meta:
        db_table = 'transaction'
        db_table_comment = 'A table for all the transactions'

    def __str__(self):
        return f'{self.income.name if self.income else self.expense} '
