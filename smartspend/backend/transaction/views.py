# REST Framework Imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# App Imports
from .models import Transaction
from .serialiser import TransactionSerialiser


# Create your views here.
class TransactionList(APIView):
    """
    List all transactions belonging to the user
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        transaction = Transaction.objects.filter(user__email=request.user)
        serialiser = TransactionSerialiser(transaction, many=True)
        return Response(data=serialiser.data, status=status.HTTP_200_OK)

    def post(self, request):
        serialiser = TransactionSerialiser(data=request.data, context={'request': request})
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_201_CREATED)
        print(serialiser.errors)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)


class TransactionDetail(APIView):
    """
    Retrieve, update or detail a transaction instance
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Transaction.objects.get(pk=pk)
        except Transaction.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk):
        transaction = self.get_object(pk)
        serializer = TransactionSerialiser(transaction)
        return Response(serializer.data)

    def patch(self, request, pk):
        transaction = self.get_object(pk)
        serializer = TransactionSerialiser(transaction, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        transaction = self.get_object(pk)
        transaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
