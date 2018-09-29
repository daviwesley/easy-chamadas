from django.contrib import admin
from django.urls import path
from .views import StudentViewAPI, FaultViewAPI, StudentSearchViewAPI
from rest_framework.authtoken import views

urlpatterns = [
    path('alunos', StudentViewAPI.as_view(), name='alunos'),
    path('alunos/<int:id>', StudentSearchViewAPI.as_view(), name='procura_aluno'),
    path('faltas', FaultViewAPI.as_view(), name='faltas'),
    path('api-token/', views.obtain_auth_token, name="tokenapi")
]
