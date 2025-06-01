from django.contrib.auth import authenticate
from django.http import Http404
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes

# Rest Framework Imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

# Rest Framework Simple JWT Imports
from rest_framework_simplejwt.views import TokenObtainPairView

# App Imports
from .models import User
from .serialiser import UserSerializer, TokenObtainedSerializer, LoginSerializer


# Create your views here.
class UserDetail(APIView):
    """
    Retrieve or update a user.
    """
    permission_classes = (IsAuthenticated,)

    def get_object(self, pk):
        try:
            return User.objects.get(email=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request):
        user = self.get_object(request.user)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def patch(self, request):
        users = self.get_object(request.user)
        serializer = UserSerializer(users, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        serializer = LoginSerializer("refresh")
        if serializer.is_valid(raise_exception=True):
            user = authenticate(email=serializer.data['email'], password=serializer.data['password'])
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': [token.key], "Success": "Login Successfully"}, status=status.HTTP_201_CREATED)
            return Response({'Massage': 'Invalid Email and Password'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response(status=status.HTTP_205_RESET_CONTENT, data={"detail": "Logged out successfully"})

            except Exception:
                return Response(status=status.HTTP_400_BAD_REQUEST, data={"detail": "Invalid refresh token"})
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"detail": "Refresh token not provided"})


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'I am authenticated'})


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = User.objects.filter(email=request.email).update(password=request.password)

    return Response(status=status.HTTP_200_OK)
