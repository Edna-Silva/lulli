from rest_framework import serializers

from expense.models import Expense
from income.models import Income
from income.serialiser import IncomeSerialiser
from expense.serialiser import ExpenseSerialiser

from .models import Transaction


class TransactionSerialiser(serializers.ModelSerializer):
    income = IncomeSerialiser(allow_null=True)
    expense = ExpenseSerialiser(allow_null=True)

    class Meta:
        model = Transaction
        fields = '__all__'

    def create(self, validated_data):
        income_data = validated_data.pop('income', None)
        expense_data = validated_data.pop('expense', None)
        user = self.context.get('request').user
        print(user)

        # Determine transaction type
        transaction_type = validated_data.get('type')

        # Create the transaction
        transaction = Transaction.objects.create(**validated_data)

        # Create and associate income/expense based on transaction type
        if transaction_type == 'INCOME' and income_data:
            income = Income.objects.create(**income_data, transaction=transaction)
            income.user = user
            income.save()
            transaction.income = income
            transaction.user = user
            transaction.save()

        elif transaction_type == 'EXPENSE' and expense_data:
            expense = Expense.objects.create(**expense_data, transaction=transaction)
            expense.user = user
            expense.save()
            transaction.expense = expense
            transaction.user = user
            transaction.save()

        return transaction
