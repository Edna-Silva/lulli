from django.db import models
from authentication.models import User

# Create your models here.
class Branch(models.Model):
    branch_code = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=150)

    class Meta:
        db_table = 'branch'
        db_table_comment = 'A table for all the branchs'

    def __str__(self):
        return f'{self.name}'


BANK_ACCOUNT_TYPES = (
    ('CHEQUE', 'cheque'),
    ('SAVINGS', 'savings')
)

ACCOUNT_STATUS = (
    ('OPEN', 'open'),
    ('CLOSED', 'closed'),
    ('FROZEN', 'frozen')
)


class BankAccount(models.Model):
    account_number = models.IntegerField(primary_key=True)
    account_name = models.CharField(max_length=50, default='')
    type = models.CharField(max_length=100, choices=BANK_ACCOUNT_TYPES, default='cheque')
    balance = models.FloatField(default=0.0)
    date_opened = models.DateField()
    date_closed = models.DateField(null=True, blank=True)
    account_status = models.CharField(max_length=50, choices=ACCOUNT_STATUS, default='open')
    branch = models.ForeignKey(Branch, on_delete=models.DO_NOTHING)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        db_table = 'bankaccount'
        db_table_comment = 'A table for all the bank accounts'

    def __str__(self):
        return f'{self.branch} - {self.account_number}'
