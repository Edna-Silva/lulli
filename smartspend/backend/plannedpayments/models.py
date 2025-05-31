from django.db import models

from category.models import Category
from income.models import Income
from expense.models import Expense
from authentication.models import User

RECURANCE_SCHEDULE = (
    ('MONTH', 'month'),
    ('WEEK', 'week'),
    ('DAY', 'day'),
    ('YEAR', 'year')
)

TRANSACTION_TYPE = (
    ('INCOME', 'income'),
    ('EXPENSE', 'expense')
)


# Create your models here.
class PlannedPayment(models.Model):
    name = models.CharField(max_length=150, default='')
    amount = models.FloatField(default=0.0)
    category = models.ForeignKey(to=Category, on_delete=models.CASCADE, default=None, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    is_recurring = models.BooleanField()
    repeat_occurrence = models.IntegerField(null=True, blank=True)
    repeat_schedule = models.CharField(max_length=25, choices=RECURANCE_SCHEDULE, null=True, blank=True)
    payment_date = models.DateTimeField()
    transaction_type = models.CharField(max_length=25, choices=TRANSACTION_TYPE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = 'plannedpayment'
        db_table_comment = 'A table for all the planned payments'

    def __str__(self):
        return f'{self.name} - {self.repeat_occurrence if self.is_recurring else self.payment_date} {self.repeat_schedule if self.is_recurring else ""}'
