# REST Framework Imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

# App Imports
from .models import Wallet
from .serialiser import WalletSerialiser


# Create your views here.
class WalletList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(request.user)
        wallet = Wallet.objects.filter(user__email=request.user)
        serialiser = WalletSerialiser(wallet, many=True)
        return Response(serialiser.data, status=status.HTTP_200_OK)

    def post(self, request):
        serialiser = WalletSerialiser(data=request.data, context={'request': request})
        if serialiser.is_valid():
            serialiser.save()
            return Response(data=serialiser.data, status=status.HTTP_201_CREATED)
        print(serialiser.errors)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)


class WalletDetail(APIView):
    """
    Retrieve, update or delete a wallet instance.
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Wallet.objects.get(account_number=pk)
        except Wallet.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, account_number):
        wallet = self.get_object(account_number)
        serializer = WalletSerialiser(wallet)
        return Response(serializer.data)

    def patch(self, request, account_number):
        wallet = self.get_object(account_number)
        serializer = WalletSerialiser(wallet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, account_number):
        wallet = self.get_object(account_number)
        wallet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
