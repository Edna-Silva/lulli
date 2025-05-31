from django.urls import path

# rest framework imports
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from rest_framework.urlpatterns import format_suffix_patterns

# app imports
from .views import UserDetail, LogoutView, LoginView, ProtectedView, change_password

urlpatterns = [
    path('protected', ProtectedView.as_view()),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user', UserDetail.as_view()),
    path('user/change_password/', change_password),
    path('logout/', LogoutView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
