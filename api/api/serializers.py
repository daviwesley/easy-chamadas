from rest_framework import serializers, viewsets
from .models import Student, Subject, Fault, Teacher

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('name', 'id_subscription', 'course', 'subject')

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id','name', 'hours', 'credit', 'teacher',)
        depth = 1

class FaultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fault
        fields = ('id','faults', 'student', 'subject', 'day')

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('id','name',)
