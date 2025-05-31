# Rest Framework Imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# App Imports
from .models import PlannedPayment
from .serialiser import PlannedPaymentSerialser


# Create your views here.
class PlannedPaymentList(APIView):
    """
    List all planned payments belonging to a user
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        plannedpayment = PlannedPayment.objects.filter(user__email=request.user)
        serialiser = PlannedPaymentSerialser(plannedpayment, many=True)
        return Response(serialiser.data, status=status.HTTP_200_OK)

    def post(self, request):
        serialiser = PlannedPaymentSerialser(data=request.data, context={'request': request})
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_201_CREATED)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)


class PlannedPaymentDetail(APIView):
    """
    Retrieve, update or detail a planned payment
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return PlannedPayment.objects.get(pk=pk)
        except PlannedPayment.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk):
        plannedpayment = self.get_object(pk)
        serialiser = PlannedPaymentSerialser(plannedpayment)
        return Response(data=serialiser.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        plannedpayment = self.get_object(pk)
        serializer = PlannedPaymentSerialser(plannedpayment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        plannedpayment = self.get_object(pk)
        plannedpayment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
