from rest_framework import serializers
from .models import Horses, Employees, Products

class HorsesSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField(read_only=True)
    image = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = Horses
        fields = ['id', 'image', 'image_url', 'name', 'age', 'breed', 'color', 'price', 'is_alive',]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return ""


class EmployeeSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField(read_only=True)
    image = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = Employees
        fields = ['id', 'image', 'image_url', 'first_name', 'last_name', 'age', 'position', 'is_active']

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return ""

class ProductsSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField(read_only=True)
    image = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = Products
        fields = ['id', 'image', 'image_url', 'name', 'price', 'sort', 'stock']

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return ""
