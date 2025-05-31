# REST Framework Imports
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# App Imports
from .models import BankAccount
from .serialiser import BankAccountSerialiser


# Create your views here.
class BankAccountList(APIView):
    """
    List all bank accounts of the user
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bankaccount = BankAccount.objects.filter(user__email=request.user)
        serialiser = BankAccountSerialiser(bankaccount, many=True)
        return Response(serialiser.data, status=status.HTTP_200_OK)

    def post(self, request):
        serialiser = BankAccountSerialiser(request.data)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_201_CREATED)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)


class BankAccountDetail(APIView):
    """
    Retrieve, update or delete a bank account
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return BankAccount.objects.get(account_number=pk)
        except BankAccount.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        bankaccount = self.get_object(pk)
        serialiser = BankAccountSerialiser(bankaccount)
        return Response(data=serialiser.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        bankaccount = self.get_object(pk)
        serializer = BankAccountSerialiser(bankaccount, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        bankaccount = self.get_object(pk)
        bankaccount.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
