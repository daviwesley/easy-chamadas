from django.contrib import admin
from django.urls import path
from .views import StudentViewAPI, FaultViewAPI
from rest_framework.authtoken import views

urlpatterns = [
    path('alunos', StudentViewAPI.as_view()),
    path('faltas', FaultViewAPI.as_view()),
    path('api-token/', views.obtain_auth_token)
]
