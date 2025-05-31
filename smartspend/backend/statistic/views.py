# REST Framework Imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

# App Imports
from .models import Statistic
from .serialiser import StatisticSerialiser


# Create your views here.
class StatisticList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        statistic = Statistic.objects.filter(user__email=request.user)
        serialiser = StatisticSerialiser(statistic, many=True)
        return Response(serialiser.data, status=status.HTTP_200_OK)

    def post(self, request):
        serialiser = StatisticSerialiser(data=request.data)
        if serialiser.is_valid():
            serialiser.save()
            return Response(data=serialiser.data, status=status.HTTP_201_CREATED)
        print(serialiser.errors)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)


def get_object(pk):
    try:
        return Statistic.objects.get(pk=pk)
    except Statistic.DoesNotExist:
        raise status.HTTP_404_NOT_FOUND


class StatisticDetail(APIView):
    """
    Retrieve, update or delete a wallet instance.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        statistic = get_object(pk)
        serializer = StatisticSerialiser(statistic)
        return Response(serializer.data)

    def patch(self, request, pk):
        statistic = get_object(pk)
        serializer = StatisticSerialiser(statistic, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        statistic = get_object(pk)
        statistic.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
