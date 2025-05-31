from rest_framework import serializers

from .models import Wallet


class WalletSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user

        # Create the wallet
        wallet = Wallet.objects.create(**validated_data)

        wallet.user = user
        wallet.save()

        return wallet
