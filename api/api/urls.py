from django.contrib import admin
from django.urls import path
from .views import StudentViewSet

urlpatterns = [
    path('alunos', StudentViewSet.as_view()),
]
