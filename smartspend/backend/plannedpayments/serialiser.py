from rest_framework import serializers

from .models import PlannedPayment


class PlannedPaymentSerialser(serializers.ModelSerializer):
    class Meta:
        model = PlannedPayment
        fields = '__all__'

    def create(self, validated_data):
        user = self.context.get('request').user


        plannedpayment = PlannedPayment.objects.create(**validated_data)
        plannedpayment.user = user
        plannedpayment.save()

        return plannedpayment