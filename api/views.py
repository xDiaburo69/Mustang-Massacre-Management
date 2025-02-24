from django.shortcuts import render
from rest_framework import generics
from .models import Horses, Employees, Products
from .serializers import HorsesSerializer, EmployeeSerializer, ProductsSerializer

class HorseListView(generics.ListAPIView):
    queryset = Horses.objects.all()
    serializer_class = HorsesSerializer

class EmployeeListView(generics.ListAPIView):
    queryset = Employees.objects.all()
    serializer_class = EmployeeSerializer

class ProductListView(generics.ListAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer