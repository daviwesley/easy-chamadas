from rest_framework import serializers
from .models import Student, Subject, Fault, Teacher
from drf_writable_nested import WritableNestedModelSerializer


class StudentSerializer(serializers.ModelSerializer):
    """ Seriazlize Student model."""
    class Meta:
        model = Student
        fields = ('name', 'id_subscription', 'course',)


class StudentSimpleSerializer(serializers.ModelSerializer):
    """ Serialize only student's name """
    class Meta:
        model = Student
        fields =('name',)

class SubjectSerializer(serializers.ModelSerializer):
    """ Serialize Subject model."""
    class Meta:
        model = Subject
        fields = ('id', 'name', 'hours', 'credit', 'teacher',)


class SubjectSimpleSerializer(serializers.ModelSerializer):
    """Show only the subject's name"""
    class Meta:
        model = Subject
        fields = ('name', 'pk',)

class FaultSerializer(serializers.ModelSerializer):
    """ Serialize Fault model."""
    class Meta:
        model = Fault
        fields = ('id', 'faults', 'student', 'subject', 'day')


class FaultListSerializer(serializers.ModelSerializer):
    """Serialize a list of faults"""
    student = StudentSimpleSerializer()
    subject = SubjectSimpleSerializer()
    class Meta:
        model = Fault
        fields = ('id', 'faults', 'student', 'subject', 'day')

    def create(self, validated_data):
        # TODO
        name = validated_data.pop('student')
        sub_name = validated_data.pop('subject')
        student, _ = Student.objects.get_or_create(name=name['name'])
        subject, _ = Subject.objects.get_or_create(name=sub_name['name'])
        falta = Fault.objects.create(faults=validated_data['faults'], student=student,
                                     subject=subject)
        return falta



class FaltaSerializer(WritableNestedModelSerializer):
    student = StudentSimpleSerializer(many=False)
    subject = SubjectSimpleSerializer(many=False)

    class Meta:
        model = Fault
        fields = ('id', 'faults', 'student', 'subject',)


class TeacherSerializer(serializers.ModelSerializer):
    """ Serialize Teacher model."""
    class Meta:
        model = Teacher
        fields = ('id', 'name',)
