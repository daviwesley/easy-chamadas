from django.contrib import admin
from django.urls import path
from .views import (StudentViewAPI, FaultViewAPI, StudentSearchViewAPI, TeacherViewAPI,\
SubjectViewAPI, SubjectUpdateView, TeacherUpdateView, StudentUpdateView, FaultViewUpdate)
from rest_framework.authtoken import views

urlpatterns = [
    # metodos update e put
    path('alunos/update/<int:pk', StudentUpdateView.as_view()),
    path('disciplinas/<int:pk', SubjectUpdateView.as_view()),
    path('professores/<int:pk', TeacherUpdateView.as_view()),
    path('faltas/<int:pk', FaultViewUpdate.as_view()),
    path('alunos', StudentViewAPI.as_view(), name='alunos'),
    path('alunos/<int:id>', StudentSearchViewAPI.as_view(), name='procura_aluno'),
    path('faltas', FaultViewAPI.as_view(), name='faltas_api'),
    path('api-token', views.obtain_auth_token, name="tokenapi"),
    path('professores', TeacherViewAPI.as_view(), name='professores' ),
    path('disciplinas', SubjectViewAPI.as_view())
]
