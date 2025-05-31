from django.urls import path

# rest framework imports
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

# app imports
from .views import ExpenseList, ExpenseDetail

urlpatterns = [
    path('', ExpenseList.as_view()),
    path('<int:pk>', ExpenseDetail.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
