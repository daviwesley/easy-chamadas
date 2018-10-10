from rest_framework import serializers
from .models import Student, Subject, Fault, Teacher


class StudentSerializer(serializers.ModelSerializer):
    """ Seriazlize Student model."""
    class Meta:
        model = Student
        fields = ('name', 'id_subscription', 'course', 'subject')


class SubjectSerializer(serializers.ModelSerializer):
    """ Serialize Subject model."""
    class Meta:
        model = Subject
        fields = ('id', 'name', 'hours', 'credit', 'teacher',)
        depth = 1


class FaultSerializer(serializers.ModelSerializer):
    """ Serialize Fault model."""
    class Meta:
        model = Fault
        fields = ('id', 'faults', 'student', 'subject', 'day')


class TeacherSerializer(serializers.ModelSerializer):
    """ Serialize Teacher model."""
    class Meta:
        model = Teacher
        fields = ('id', 'name',)
