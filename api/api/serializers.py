from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault
from .models import Student, Subject, Fault, Teacher, Attendance, Turma, TesteUsuario
from django.contrib.auth.models import User


class TeacherSerializer(serializers.ModelSerializer):
    """ Serialize Teacher model."""
    class Meta:
        model = Teacher
        fields = ('id', 'name',)


class TeacherSimpleSerializer(serializers.ModelSerializer):
    """ Serialize only the name """
    class Meta:
        model = Teacher
        fields = ('name',)


class StudentSerializer(serializers.ModelSerializer):
    """ Seriazlize Student model."""
    class Meta:
        model = Student
        fields = ('name', 'id_subscription', 'course',)


class StudentSimpleSerializer(serializers.ModelSerializer):
    """ Serialize only student's name """
    class Meta:
        model = Student
        fields = ('name',)


class SubjectSerializer(serializers.ModelSerializer):
    """ Serialize Subject model."""
    teacher = TeacherSerializer()

    class Meta:
        model = Subject
        fields = ('id', 'name', 'hours', 'credit', 'teacher',)

    def create(self, validated_data):
        # TODO
        name = validated_data.pop('teacher')
        teacher, _ = Teacher.objects.get_or_create(name=name['name'])
        subject = Subject.objects.create(
            name=validated_data['name'], teacher=teacher)
        return subject


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
        # add error messages
        name = validated_data.pop('student')
        sub_name = validated_data.pop('subject')
        student, _ = Student.objects.get_or_create(name=name['name'])
        subject, _ = Subject.objects.get_or_create(name=sub_name['name'])
        falta = Fault.objects.create(faults=validated_data['faults'], student=student,
                                     subject=subject)
        return falta


class AttendanceSerializer(serializers.ModelSerializer):
    student = serializers.CharField()
    subject = serializers.CharField()

    class Meta:
        model = Fault
        fields = ('id', 'student', 'day', 'subject',)

    def create(self, validated_data):
        student, _ = Student.objects.get_or_create(
            name=validated_data['student'])
        subject, _ = Subject.objects.get_or_create(
            name=validated_data['subject'])

        attendance = Attendance.objects.create(
            student=student, subject=subject)

        return attendance


class TurmaSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer()

    class Meta:
        model = Turma
        fields = ('id', 'students', 'teacher', 'name')


class TurmaCoreSerializer(serializers.ModelSerializer):
    students = serializers.CharField()
    students = serializers.CharField()
    teacher = TeacherSimpleSerializer()

    class Meta:
        model = Turma
        fields = ('id', 'students', 'teacher', 'name')

    def create(self, validated_data):
        student_name = validated_data['students']
        teacher_name = validated_data['teacher']
        class_name = validated_data['name']
        print('nomme do professor {}'.format(teacher_name))
        student = Student.objects.get(name=student_name)
        teacher = Teacher.objects.get(name=teacher_name['name'])

        try:
            turma = Turma.objects.get(name=class_name)
            student.turma_set.add(turma)
        except Turma.DoesNotExist:
            turma = Turma.objects.create(name=class_name, teacher=teacher)
            student.turma_set.add(turma)

        return turma


class UserSerializer(serializers.ModelSerializer):
    # get the current user
    user = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = TesteUsuario
        fields = ('user',)
