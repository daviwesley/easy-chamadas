from rest_framework import serializers, viewsets
from .models import Student, Subject, Fault, Teacher

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('name', 'id_subscription', 'course')

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('name', 'hours', 'credit', 'teacher')

class FaultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fault
        fields = ('faults', 'student', 'subject', 'day')

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('name',)