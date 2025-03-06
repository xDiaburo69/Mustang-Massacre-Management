from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import HorseListView, EmployeeListView, ProductListView, HorseListDetailView, EmployeeListDetailView, ProductListDetailView

urlpatterns = [
    path('horses/', HorseListView.as_view(), name='horses_list'),
    path('horses/<int:pk>/', HorseListDetailView.as_view(), name="horses_detail"),
    path('employees/', EmployeeListView.as_view(), name='employees_list'),
    path('employees/<int:pk>/', EmployeeListDetailView.as_view(), name="employees_detail"),
    path('products/', ProductListView.as_view(), name='products_list'),
    path('products/<int:pk>/', ProductListDetailView.as_view(), name="products_detail"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)