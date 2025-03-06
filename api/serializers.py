from rest_framework import serializers
from .models import Horses, Employees, Products

class HorsesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horses
        fields = ['id', 'image', 'name', 'age', 'breed', 'color', 'price', 'is_alive',]
        fields = ['id', 'name', 'age', 'breed', 'color', 'price', 'is_alive']

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = ['id', 'image', 'first_name', 'last_name', 'age', 'position', 'is_active']

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ['id', 'image', 'name', 'price', 'sort', 'stock']