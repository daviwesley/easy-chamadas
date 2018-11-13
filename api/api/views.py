from rest_framework import generics
from rest_framework.authentication import (SessionAuthentication,
                                           BasicAuthentication,
                                           TokenAuthentication)
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .serializers import (StudentSerializer, FaultSerializer,
                          TeacherSerializer, SubjectSerializer,
                          FaultListSerializer, AttendanceSerializer,
                          TurmaSerializer, UserSerializer,
                          TurmaCoreSerializer,)
from .models import Student, Fault, Teacher, Subject, Attendance, Turma
from django.contrib.auth.models import User
from django.http import JsonResponse
# Create your views here.


class StudentViewAPI(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


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
    query = Fault.objects.filter(turma_id=turma)
    lista = []
    for faltas in query.values():
        lista.append(faltas)

    return JsonResponse({'faltas': lista})


@api_view(['GET'])
def get_students_from_turma(request, *args, **kwargs):
    ''' not a fashion way to do it '''
    id = str(kwargs['id'])
    turma = Turma.objects.get(id=id)
    dados = turma.students.values()
    lista = []
    for i in dados:
        lista.append(i)

    return JsonResponse({'alunos': lista})
