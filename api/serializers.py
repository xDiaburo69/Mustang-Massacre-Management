from rest_framework import serializers
from .models import Horses, Employees, Products

class HorsesSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    class Meta:
        model = Horses
        fields = ['id', 'image', 'name', 'age', 'breed', 'color', 'price', 'is_alive',]

    def get_image(self, obj):
        if not obj.image:
            return ""  # oder ein Platzhalterbild
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url
    
    def create(self, validated_data):
        return Products.objects.create(**validated_data)
        

class EmployeeSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    class Meta:
        model = Employees
        fields = ['id', 'image', 'first_name', 'last_name', 'age', 'position', 'is_active']

    def get_image(self, obj):
        if not obj.image:
            return ""  # oder ein Platzhalterbild
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url
    
    def create(self, validated_data):
        return Products.objects.create(**validated_data)

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
