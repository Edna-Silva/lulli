from django.db import models
from authentication.models import User
# Create your models here.

TRANSACTION_TYPE = (
    ('INCOME', 'income'),
    ('EXPENSE', 'expense'),
    ('TRANSFER', 'transfer')
)


class Statistic(models.Model):
    time = models.TimeField()
    day = models.IntegerField()
    week = models.IntegerField()
    month = models.IntegerField()
    year = models.IntegerField()
    amount = models.FloatField()
    type = models.CharField(max_length=40, choices=TRANSACTION_TYPE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f'{self.day} - {self.month} - {self.year}'
