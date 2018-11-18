from rest_framework import generics
from rest_framework.authentication import (SessionAuthentication,
                                           BasicAuthentication,
                                           TokenAuthentication)
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import (StudentSerializer, FaultSerializer,
                          TeacherSerializer, SubjectSerializer,
                          FaultListSerializer, AttendanceSerializer,
                          TurmaSerializer, UserSerializer,
                          TurmaCoreSerializer, UserCreatorSerializer)
from .models import Student, Fault, Teacher, Subject, Attendance, Turma
from django.contrib.auth.models import User
from django.http import JsonResponse
# Create your views here.


class StudentViewAPI(generics.ListCreateAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        query = Student.objects.filter(owner_id=self.request.user.id)
        return query

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class FaultViewAPI(generics.ListCreateAPIView, generics.DestroyAPIView):
    # somente usuarios com o token podem acessar
    authentication_classes = (SessionAuthentication, BasicAuthentication,
                              TokenAuthentication)
    # permission_classes = (IsAuthenticated,)
    queryset = Fault.objects.all()
    serializer_class = FaultListSerializer


class FaultViewUpdate(generics.UpdateAPIView):
    queryset = Fault.objects.all()
    serializer_class = FaultSerializer


class StudentSearchViewAPI(generics.ListAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        id = self.kwargs['id']
        return Student.objects.filter(id_subscription=id)


class StudentSearchNameViewAPI(generics.ListAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        word = self.kwargs['name']
        return Student.objects.filter(name__contains=word)


class StudentUpdateView(generics.UpdateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class StudentDeleteView(generics.DestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class TeacherViewAPI(generics.ListCreateAPIView):
    # authentication_classes = (BasicAuthentication,)
    permission_classes = (IsAdminUser,)
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()


class TeacherUpdateView(generics.UpdateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class TeacherDeleteView(generics.DestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class SubjectViewAPI(generics.ListCreateAPIView):
    serializer_class = SubjectSerializer
    queryset = Subject.objects.all()
    authentication_classes = (SessionAuthentication, BasicAuthentication,
                              TokenAuthentication)


class SubjectUpdateView(generics.UpdateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class SubjectSearchView(generics.ListAPIView):
    serializer_class = SubjectSerializer

    def get_queryset(self):
        word = self.kwargs['disciplina']
        return Subject.objects.filter(name__contains=word)


class AttendanceView(generics.ListCreateAPIView, generics.DestroyAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer


class TurmaView(generics.ListCreateAPIView):
    queryset = Turma.objects.all()
    serializer_class = TurmaCoreSerializer


class TurmaDeleteView(generics.DestroyAPIView):
    """ Delete a 'turma'(student class) """
    serializer_class = TurmaSerializer
    queryset = Turma.objects.all()


class UserView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        user = User.objects.filter(id=self.request.user.id)
        return user


class TotalFaltasAlunoTurma(generics.ListAPIView):
    """ return absents days from a given student name and id """
    serializer_class = FaultListSerializer

    def get_queryset(self):
        aluno = self.kwargs['id']
        turma = self.kwargs['turma']
        query = Fault.objects.filter(student_id=aluno, turma_id=turma)
        return query


class RetriveTest(generics.RetrieveAPIView):
    serializer_class = FaultListSerializer
    queryset = Fault.objects.all()


class TurmaFromUser(generics.ListCreateAPIView):
    """ return a list of classes from the current user """
    serializer_class = TurmaCoreSerializer

    def get_queryset(self):
        user = self.request.user.id
        query = Turma.objects.filter(owner_id=user)
        return query


class FaltasFromUser(generics.ListCreateAPIView):
    """ return a list of fault from the current user """
    serializer_class = FaultListSerializer

    def get_queryset(self):
        user = self.request.user.id
        query = Fault.objects.filter(owner_id=user)
        return query


class UserCreator(generics.CreateAPIView):
    serializer_class = UserCreatorSerializer
    permission_classes = (AllowAny,)


@api_view(['GET'])
def get_aluno_total_faltas(request, *args, **kwargs):
    ''' not a fashion way to do it '''
    aluno = str(kwargs['aluno'])
    turma = str(kwargs['turma'])
    query = Fault.objects.filter(student_id=aluno, turma_id=turma)
    a = 0
    for faltas in query:
        a = a + faltas.faults

    return JsonResponse({'faltas': a})


@api_view(['GET'])
def get_total_faltas(request, *args, **kwargs):
    ''' not a fashion way to do it '''
    turma = str(kwargs['turma'])
    print('user=', request.user.id)
    query = Fault.objects.filter(turma_id=turma, owner_id=request.user.id)
    lista = []
    for faltas in query.values():
        lista.append(faltas)

    return JsonResponse({'faltas': lista})


@api_view(['GET'])
def get_students_from_turma(request, *args, **kwargs):
    ''' not a fashion way to do it '''
    id = str(kwargs['id'])
    turma = Turma.objects.get(id=id, owner_id=request.user.id)
    dados = turma.students.values()
    lista = []
    for i in dados:
        lista.append(i)

    return JsonResponse({'alunos': lista})


@api_view(['GET'])
def get_full_list_faltas(request, *args, **kwargs):
    """ return a absent report filter by a 'turma' with student names and total faults"""
    turma = str(kwargs['turma'])
    query = Fault.objects.filter(turma_id=turma, owner_id=request.user.id)
    alunos_id = []
    faltas = []
    for aluno in query:
        alunos_id.append(aluno.student.id_subscription)

    alunos_id = set(alunos_id)

    for aluno in alunos_id:
        query1 = Fault.objects.filter(
            student_id=aluno, turma_id=turma, owner_id=request.user.id)
        print(query1)
        if query1:
            dados = {
                'name': query1[0].student.name,
                'faults': query1.count()*2
            }
            faltas.append(dados)

    return JsonResponse({'alunos': faltas})


@api_view(['GET'])
def get_teacher_name(request):
    user = User.objects.get(id=request.user.id)
    name = '{} {}'.format(user.first_name, user.last_name)

    return JsonResponse({'name': name})
