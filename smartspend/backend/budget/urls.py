from django.urls import path

# rest framework imports
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

# app imports
from .views import BudgetList, BudgetDetail, update_expenditure

urlpatterns = [
    path('', BudgetList.as_view()),
    path('<int:pk>', BudgetDetail.as_view()),

    path('expenditure/', update_expenditure)
]

urlpatterns = format_suffix_patterns(urlpatterns)
