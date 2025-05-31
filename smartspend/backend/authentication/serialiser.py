from rest_framework import serializers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# app imports
from .models import User


# class serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class TokenObtainedSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(TokenObtainedSerializer, cls).get_token(user)

        # Add custom claims
        token['email'] = user.get_email_field_name()
        # ...

        return token


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "password"]
