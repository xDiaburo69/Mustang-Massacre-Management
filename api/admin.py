from django.contrib import admin
from .models import Horses, Employees, Products

# Register your models here.
admin.site.register(Horses)
admin.site.register(Employees)
admin.site.register(Products)