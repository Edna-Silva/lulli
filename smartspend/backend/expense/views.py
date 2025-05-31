from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# App Imports
from .models import Expense
from authentication.models import User
from .serialiser import ExpenseSerialiser
from django.forms.models import model_to_dict


# Create your views here.

class ExpenseList(APIView):
    """
    List all expenses
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        expense = Expense.objects.all()
        serialiser = ExpenseSerialiser(expense, many=True)
        return Response(serialiser.data)

    def post(self, request):
        user = User.objects.get(email=request.user).pk
        expense_data = {'name': request.data.get('name'), 'amount': request.data.get('amount'),
                        'category': request.data.get('category'), 'user': user}
        serialiser = ExpenseSerialiser(data=expense_data)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_201_CREATED)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)


class ExpenseDetail(APIView):
    """
    Retrieve, update or delete an expense record
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Expense.objects.get(pk=pk)
        except Expense.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk):
        expense = self.get_object(pk)
        serialiser = ExpenseSerialiser(expense)
        return Response(data=serialiser.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        expense = self.get_object(pk)
        serializer = ExpenseSerialiser(expense, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        income = self.get_object(pk)
        income.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
