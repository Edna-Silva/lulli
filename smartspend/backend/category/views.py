# REST Framework Imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# App Imports
from .models import Category
from .serialiser import CategorySerialiser


# Create your views here.
class CategoryList(APIView):
    """
    List all categories and user defined categories
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        categories = Category.objects.all()
        serialiser = CategorySerialiser(categories, many=True)
        return Response(serialiser.data, status=status.HTTP_200_OK)

    def post(self, request):
        serialiser = CategorySerialiser(data=request.data)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_201_CREATED)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetails(APIView):
    """
    Retrieve, update or delete a category
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk):
        category = self.get_object(pk)
        serialiser = CategorySerialiser(category)
        return Response(data=serialiser.data, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        category = self.get_object(pk)
        serializer = CategorySerialiser(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        category = self.get_object(pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
