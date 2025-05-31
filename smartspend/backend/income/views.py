# Rest Framework Imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# App Imports
from .models import Income
from .serialiser import IncomeSerialiser


# Create your views here.

class IncomeList(APIView):
    """
    List all income, or create a new income record
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        income = Income.objects.filter(user__email=request.user)
        serialiser = IncomeSerialiser(income, many=True)
        return Response(serialiser.data)

    def post(self, request):
        serialiser = IncomeSerialiser(data=request.data)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_201_CREATED)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)


class IncomeDetail(APIView):
    """
    Retrieve, update or delete an income record
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Income.objects.get(pk=pk)
        except Income.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk):
        income = self.get_object(pk)
        serialiser = IncomeSerialiser(income)
        return Response(data=serialiser.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        income = self.get_object(pk)
        serializer = IncomeSerialiser(income, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        income = self.get_object(pk)
        income.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
