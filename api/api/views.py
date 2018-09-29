from django.shortcuts import render
from rest_framework import generics
from .serializers import StudentSerializer, FaultSerializer
from .models import Student, Fault

# Create your views here.

class StudentViewAPI(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class FaultViewAPI(generics.ListCreateAPIView):
    queryset = Fault.objects.all()
    serializer_class = FaultSerializer