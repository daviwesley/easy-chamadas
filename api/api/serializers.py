from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework import serializers
from rest_framework.exceptions import NotFound
from rest_framework.fields import CurrentUserDefault


from .models import Student, Subject, Fault, Teacher, Attendance, Turma, TesteUsuario


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
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Student
        fields = ('name', 'id_subscription', 'course', 'owner')


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
        fields = ('id', 'faults', 'student', 'turma', 'day')


class TurmaSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer()

    class Meta:
        model = Turma
        fields = ('id', 'students', 'teacher', 'name')


class TurmaSimpleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Turma
        fields = ('name', 'id')


class TurmaNameSerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = Turma
        fields = ('name',)


class TurmaCoreSerializer(serializers.ModelSerializer):
    students = serializers.CharField()
    teacher = serializers.CharField()
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Turma
        fields = ('id', 'students', 'teacher', 'name', 'owner')

    def create(self, validated_data):
        student_name = validated_data['students']
        teacher_name = validated_data['teacher']
        class_name = validated_data['name']
        current_user = User.objects.get(username=self.context['request'].user)
        try:
            student = Student.objects.get(name=student_name, owner=current_user)
        except Student.DoesNotExist:
            raise NotFound(
                '{} não encontrado, crie um registro antes!'.format(student_name))

        try:
            teacher = Teacher.objects.get(name=teacher_name)
        except Teacher.DoesNotExist:
            raise NotFound(
                '{} não encontrado, crie um registro antes!'.format(teacher_name))

        try:
            turma = Turma.objects.get(name=class_name,owner=current_user)
            student.turma_set.add(turma)
        except Turma.DoesNotExist:
            print('#bug', self.context['request'].user)
            turma = Turma.objects.create(
                name=class_name, teacher=teacher, owner=current_user)
            student.turma_set.add(turma)

        return turma


class FaultListSerializer(serializers.ModelSerializer):
    """Serialize a list of faults"""
    student = serializers.CharField(required=True)
    turma = serializers.CharField()
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Fault
        fields = ('faults', 'student', 'turma', 'day', 'id', 'owner')

    def create(self, validated_data):
        # TODO
        # add error messages
        name = validated_data.pop('student')
        sub_name = validated_data.pop('turma')
        current_user = User.objects.get(username=self.context['request'].user)
        print('CURENT USER IS....',current_user)
        try:
            student = Student.objects.get(name=name, owner=current_user)
        except Student.DoesNotExist:
            raise NotFound(
                '{} não encontrado, crie um registro antes!'.format(name))
        try:
            turma = Turma.objects.get(name=sub_name, owner=current_user)
        except Turma.DoesNotExist:
            raise NotFound(
                '{} não encontrado, crie um registro antes!'.format(sub_name))

        falta = Fault.objects.create(faults=validated_data['faults'], student=student,
                                     turma=turma, owner=current_user)
        return falta


class AttendanceSerializer(serializers.ModelSerializer):
    student = serializers.CharField()
    subject = serializers.CharField()
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Fault
        fields = ('id', 'student', 'day', 'subject', 'owner')

    def create(self, validated_data):
        current_user = User.objects.get(username=self.context['request'].user)
        student, _ = Student.objects.get_or_create(
            name=validated_data['student'])
        subject, _ = Subject.objects.get_or_create(
            name=validated_data['subject'])

        attendance = Attendance.objects.create(
            student=student, subject=subject, owner=current_user)

        return attendance


class UserSerializer(serializers.ModelSerializer):
    # get the current user
    user = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = TesteUsuario
        fields = ('user',)


class UserCreatorSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'password')
