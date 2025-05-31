from rest_framework import serializers

from category.models import Category
from wallet.models import Wallet
from .models import Budget
from category.serialiser import CategorySerialiser
from wallet.serialiser import WalletSerialiser


class BudgetSerialiser(serializers.ModelSerializer):
    categories = CategorySerialiser(read_only=True)

    # wallet = WalletSerialiser(read_only=True)

    class Meta:
        model = Budget
        fields = '__all__'

    def create(self, validated_data):
        user = self.context.get('request').user

        # Retrieve existing category and wallet
        category_id = self.initial_data.get('categories')
        wallet_id = self.initial_data.get('wallet')

        try:
            print(category_id)
            category = Category.objects.get(pk=category_id.get('id'))
            wallet = Wallet.objects.get(account_number=wallet_id, user=user)
        except (Category.DoesNotExist, Wallet.DoesNotExist):
            raise serializers.ValidationError("Category or Wallet not found.")

        print(validated_data)
        # Create the budget
        budget = Budget.objects.create(
            name=self.initial_data.get('name'),
            total_amount=self.initial_data.get('total_amount'),
            wallet=wallet,
            categories=category,
            user=user,
            month=self.initial_data.get('month'),
            year=self.initial_data.get('year'),
        )
        budget.save()
        return budget
