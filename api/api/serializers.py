from rest_framework import serializers
from .models import Student, Subject, Fault, Teacher


class StudentSerializer(serializers.ModelSerializer):
    """ Seriazlize Student model."""
    class Meta:
        model = Student
        fields = ('name', 'id_subscription', 'course',)


class SubjectSerializer(serializers.ModelSerializer):
    """ Serialize Subject model."""
    class Meta:
        model = Subject
        fields = ('id', 'name', 'hours', 'credit', 'teacher',)


class SubjectSimpleSerializer(serializers.ModelSerializer):
    """Show only the subject's name"""
    class Meta:
        model = Subject
        fields = ('name',)

class FaultSerializer(serializers.ModelSerializer):
    """ Serialize Fault model."""
    class Meta:
        model = Fault
        fields = ('id', 'faults', 'student', 'subject', 'day')


class FaultListSerializer(serializers.ModelSerializer):
    """Serialize a list of faults"""
    student = StudentSerializer()
    subject = SubjectSimpleSerializer()
    class Meta:
        model = Fault
        fields = ('id', 'faults', 'student', 'subject', 'day')

    def create(self, validated_data):
        # TODO
        pass

class TeacherSerializer(serializers.ModelSerializer):
    """ Serialize Teacher model."""
    class Meta:
        model = Teacher
        fields = ('id', 'name',)
