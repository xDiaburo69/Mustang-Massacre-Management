from django.urls import path
from .views import HorseListView, EmployeeListView, ProductListView

urlpatterns = [
    path('horses/', HorseListView.as_view(), name='horses_list'),
    path('employees/', EmployeeListView.as_view(), name='employees_list'),
    path('products/', ProductListView.as_view(), name='products_list'),
]