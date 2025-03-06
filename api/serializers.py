from rest_framework import serializers
from .models import Horses, Employees, Products

class HorsesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Horses
        fields = ['id', 'image', 'name', 'age', 'breed', 'color', 'price', 'is_alive',]
        

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = ['id', 'image', 'first_name', 'last_name', 'age', 'position', 'is_active']

class ProductsSerializer(serializers.ModelSerializer):
    image_path = serializers.SerializerMethodField()
    class Meta:
        model = Products
        fields = ['id', 'image', 'name', 'price', 'sort', 'stock']

    def get_image_path(self, obj):
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url