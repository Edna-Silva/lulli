from django.urls import path

# rest framework imports
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

# app imports
from .views import IncomeList, IncomeDetail

urlpatterns = [
    path('', IncomeList.as_view()),
    path('<int:pk>', IncomeDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
