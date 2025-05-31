from rest_framework import serializers

from .models import Statistic


class StatisticSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Statistic
        fields = '__all__'
