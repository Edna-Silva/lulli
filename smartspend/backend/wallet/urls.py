from django.urls import path

# rest framework imports
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

# app imports
from .views import WalletList, WalletDetail

urlpatterns = [
    path('', WalletList.as_view()),
    path('<int:account_number>', WalletDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
