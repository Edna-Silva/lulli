from django.urls import path

# rest framework imports
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

# app imports
from .views import BankAccountList, BankAccountDetail

urlpatterns = [
    path('', BankAccountList.as_view()),
    path('<int:pk>', BankAccountDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
