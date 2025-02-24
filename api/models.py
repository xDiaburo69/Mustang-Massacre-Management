from django.db import models


class Horses(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    age = models.IntegerField()
    breed = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    price = models.FloatField()
    is_alive = models.BooleanField()

    def __str__(self):
        return self.name
    
class Employees(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.IntegerField()
    position = models.CharField(max_length=50)
    is_active = models.BooleanField()

    def __str__(self):
        return self.last_name

class Products(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    price = models.FloatField()
    sort = models.CharField(max_length=50)
    stock = models.IntegerField()

    def __str__(self):
        return self.name