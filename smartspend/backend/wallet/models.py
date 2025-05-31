from django.db import models
from authentication.models import User


# Create your models here.
class Wallet(models.Model):
    account_number = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30)
    balance = models.FloatField(default=0.0)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    is_default = models.BooleanField(default=False)

    class Meta:
        db_table = 'wallet'
        db_table_comment = 'A table for all the wallets'

    def __str__(self):
        return f'{self.name} - {self.balance}'
