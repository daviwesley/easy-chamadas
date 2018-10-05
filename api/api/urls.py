from django.contrib import admin
from django.urls import path
from .views import StudentViewAPI, FaultViewAPI, StudentSearchViewAPI, TeacherViewAPI
from rest_framework.authtoken import views

urlpatterns = [
    path('alunos', StudentViewAPI.as_view(), name='alunos'),
    path('alunos/<int:id>', StudentSearchViewAPI.as_view(), name='procura_aluno'),
    path('faltas', FaultViewAPI.as_view(), name='faltas_api'),
    path('api-token', views.obtain_auth_token, name="tokenapi"),
    path('professores', TeacherViewAPI.as_view(), name='professores' )
]
