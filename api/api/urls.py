from django.urls import path
from .views import (StudentViewAPI, FaultViewAPI, StudentSearchViewAPI,
                    TeacherViewAPI, SubjectViewAPI, SubjectUpdateView,
                    TeacherUpdateView, StudentUpdateView, FaultViewUpdate,
                    StudentSearchNameViewAPI, SubjectSearchView,AttendanceView)
from rest_framework.authtoken import views
from rest_framework_swagger.views import get_swagger_view
from django_extensions.management.commands import show_urls

schema_view = get_swagger_view('Documentação da API')
urlpatterns = [
    # Students
    path('alunos', StudentViewAPI.as_view(), name='alunos'),
    path('alunos/update/<int:pk>', StudentUpdateView.as_view()),
    path('alunos/<int:id>', StudentSearchViewAPI.as_view(),
         name='procura_aluno'),
    path('alunos/<str:name>', StudentSearchNameViewAPI.as_view()),
    # Subjects
    path('disciplinas', SubjectViewAPI.as_view()),
    path('disciplinas/<int:pk>', SubjectUpdateView.as_view()),
    path('disciplinas/<str:disciplina>', SubjectSearchView.as_view()),
    # Teachers
    path('professores', TeacherViewAPI.as_view(), name='professores'),
    path('professores/<int:pk>', TeacherUpdateView.as_view()),
    # Faults
    path('faltas', FaultViewAPI.as_view(), name='faltas_api'),
    path('faltas/<int:pk>', FaultViewUpdate.as_view()),
    # Authentication
    path('api-token', views.obtain_auth_token, name="tokenapi"),
    # api docs
    path('docs', schema_view),
    # Attendances
    path('presencas', AttendanceView.as_view()),
]
