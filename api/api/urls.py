from django.urls import path
from .views import (StudentViewAPI, FaltasFromUser, StudentSearchViewAPI,
                    TeacherViewAPI, SubjectViewAPI, SubjectUpdateView,
                    TeacherUpdateView, StudentUpdateView, FaultViewUpdate,
                    StudentSearchNameViewAPI, SubjectSearchView, AttendanceView,
                    TurmaFromUser, FaultListSerializer, UserView, TurmaDeleteView,
                    TeacherDeleteView, StudentDeleteView, get_aluno_total_faltas,
                    get_students_from_turma, get_total_faltas, TotalFaltasAlunoTurma,
                    RetriveTest, FaultViewAPI, get_full_list_faltas, UserCreator,
                    get_teacher_name)
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
    path('professores/user', get_teacher_name ),
    # Faults
    path('faltas', FaltasFromUser.as_view(), name='faltas_api'),
    path('faltas/<int:pk>', FaultViewUpdate.as_view()),
    path('faltas/delete/<int:pk>', FaultViewAPI.as_view()),
    # path('faltas/<str:aluno>/<int:turma>', get_aluno_total_faltas),
    path('faltas/<int:id>/<int:turma>', TotalFaltasAlunoTurma.as_view()),
    path('faltas/id/<int:pk>', RetriveTest.as_view()),
    # Authentication
    path('api-token', views.obtain_auth_token, name="tokenapi"),
    path('create', UserCreator.as_view()),
    # Attendances
    path('presencas', AttendanceView.as_view()),
    path('presencas/<int:pk>', AttendanceView.as_view()),
    # Turmas
    path('turmas', TurmaFromUser.as_view()),
    path('turmas/relatorio/<int:turma>',get_full_list_faltas),
    path('turmas/<int:pk>', TurmaDeleteView.as_view()),
    path('turmas/alunos/<int:id>', get_students_from_turma),
    path('turmas/faltas/<int:turma>', get_total_faltas),
    # Get user id
    path('user', UserView.as_view()),

]
