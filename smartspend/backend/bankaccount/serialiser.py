from rest_framework import serializers

from .models import BankAccount, Branch


class BankAccountSerialiser(serializers.ModelSerializer):
    branch = Branch

    class Meta:
        model = BankAccount
        fields = "__all__"
