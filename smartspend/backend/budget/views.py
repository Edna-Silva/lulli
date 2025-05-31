# REST Framework Imports
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# App Imports
from .models import Budget
from .serialiser import BudgetSerialiser


# Create your views here.
class BudgetList(APIView):
    """
    List all budgets
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        budget = Budget.objects.filter(user__email=request.user)
        serialiser = BudgetSerialiser(budget, many=True)
        return Response(serialiser.data, status=status.HTTP_200_OK)

    def post(self, request):
        serialiser = BudgetSerialiser(data=request.data, context={'request': request})
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_201_CREATED)
        print(serialiser.errors)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)


class BudgetDetail(APIView):
    """
        Retrieve, update or delete a budget
        """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Budget.objects.get(pk=pk)
        except Budget.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        budget = self.get_object(pk)
        serialiser = BudgetSerialiser(budget)
        return Response(data=serialiser.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        category = self.get_object(pk)
        serializer = BudgetSerialiser(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        budget = self.get_object(pk)
        budget.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_expenditure(request):
    budget_c = Budget.objects.get(categories__id=request.data.get('category')).current_expenditure
    budget = Budget.objects.filter(categories__id=request.data.get('category')).update(
        current_expenditure=budget_c + float(request.data.get('amount')))

    return Response(status=status.HTTP_200_OK)