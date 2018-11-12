from django.urls import path
from .views import (StudentViewAPI, FaultViewAPI, StudentSearchViewAPI,
                    TeacherViewAPI, SubjectViewAPI, SubjectUpdateView,
                    TeacherUpdateView, StudentUpdateView, FaultViewUpdate,
                    StudentSearchNameViewAPI, SubjectSearchView, AttendanceView,
                    TurmaView, FaultListSerializer, UserView, TurmaDeleteView,
                    TeacherDeleteView, StudentDeleteView, get_total_faltas,
                    get_students_from_turma)
from rest_framework.authtoken import views
from django_extensions.management.commands import show_urls

urlpatterns = [
    # Students
    path('alunos', StudentViewAPI.as_view(), name='alunos'),
    path('alunos/update/<int:pk>', StudentUpdateView.as_view()),
    path('alunos/<int:id>', StudentSearchViewAPI.as_view(),
         name='procura_aluno'),
    path('alunos/<str:name>', StudentSearchNameViewAPI.as_view()),
    path('alunos/delete/<int:pk>', StudentDeleteView.as_view()),  # id_subscription
    # Subjects
    path('disciplinas', SubjectViewAPI.as_view()),
    path('disciplinas/<int:pk>', SubjectUpdateView.as_view()),
    path('disciplinas/<str:disciplina>', SubjectSearchView.as_view()),
    # Teachers
    path('professores', TeacherViewAPI.as_view(), name='professores'),
    path('professores/<int:pk>', TeacherUpdateView.as_view()),
    path('professores/<int:pk>', TeacherDeleteView.as_view()),
    # Faults
    path('faltas', FaultViewAPI.as_view(), name='faltas_api'),
    path('faltas/<int:pk>', FaultViewUpdate.as_view()),
    path('faltas/delete/<int:pk>', FaultViewAPI.as_view()),
    path('testefaltas/<str:aluno>/<int:turma>', get_total_faltas),
    # Authentication
    path('api-token', views.obtain_auth_token, name="tokenapi"),
    # Attendances
    path('presencas', AttendanceView.as_view()),
    path('presencas/<int:pk>', AttendanceView.as_view()),
    # Turmas
    path('turmas', TurmaView.as_view()),
    path('turmas/<int:pk>', TurmaDeleteView.as_view()),
    path('turmas/search/<int:id>', get_students_from_turma),
    # Get user id
    path('user', UserView.as_view()),

]
