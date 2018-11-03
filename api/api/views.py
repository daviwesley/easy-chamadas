from rest_framework import generics
from rest_framework.authentication import (SessionAuthentication,
                                           BasicAuthentication,
                                           TokenAuthentication)
from rest_framework.permissions import AllowAny, IsAdminUser

from .serializers import (StudentSerializer, FaultSerializer,
                          TeacherSerializer, SubjectSerializer,
                          FaultListSerializer, FaltaSerializer)
from .models import Student, Fault, Teacher, Subject

# Create your views here.


class StudentViewAPI(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class FaultViewAPI(generics.ListCreateAPIView):
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
        return Student.objects.filter(name__startswith=word)


class StudentUpdateView(generics.UpdateAPIView):
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


class SubjectViewAPI(generics.ListCreateAPIView):
    serializer_class = SubjectSerializer
    queryset = Subject.objects.all()
    permission_classes = (AllowAny,)


class SubjectUpdateView(generics.UpdateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
