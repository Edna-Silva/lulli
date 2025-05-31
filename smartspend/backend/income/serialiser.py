from rest_framework import serializers

from category.serialiser import CategorySerialiser
from .models import Income


class IncomeSerialiser(serializers.ModelSerializer):
    # category = CategorySerialiser()

    class Meta:
        model = Income
        fields = '__all__'
