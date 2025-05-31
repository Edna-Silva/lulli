from rest_framework import serializers

from .models import Expense
from category.serialiser import CategorySerialiser
from authentication.serialiser import UserSerializer


class ExpenseSerialiser(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Expense
        fields = '__all__'
