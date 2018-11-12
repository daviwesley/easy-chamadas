from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

# Create your models here.


class Teacher(models.Model):
    name = models.CharField(verbose_name='nome', max_length=55, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Professor'
        verbose_name_plural = 'Professores'


class Subject(models.Model):
    name = models.CharField(max_length=40, verbose_name='nome')
    hours = models.IntegerField(verbose_name='horas', default=64)
    credit = models.IntegerField(verbose_name='creditos', default=4)
    teacher = models.ForeignKey("Teacher", on_delete=models.CASCADE,
                                verbose_name="Professor")

    class Meta:
        verbose_name = 'Disciplina'

    def __str__(self):
        return self.name


class Student(models.Model):
    COURSES = (('Engenharia de Software', 'Engenharia de Software'),
               ('Ciências da Computação', 'Ciências da Computação'),
               ('Engenharia da Produção', 'Engenharia da Produção'),
               ('Engenharia Civil', 'Engenharia Civil'),
               ('Engenharia Mecânica', 'Engenharia Mecânica'),)

    name = models.CharField(max_length=55, verbose_name='nome', unique=True)
    id_subscription = models.IntegerField(primary_key=True,
                                          verbose_name='matricula')
    course = models.CharField(max_length=30, choices=COURSES,
                              verbose_name="Curso")

    class Meta:
        verbose_name = 'Aluno'

    def __str__(self):
        return self.name


class Turma(models.Model):
    """ Model for student classes"""
    name = models.CharField(max_length=55, verbose_name='Nome da turma')
    teacher = models.ForeignKey(
        Teacher, on_delete=models.CASCADE, verbose_name='Professor')
    students = models.ManyToManyField(Student, verbose_name='Estudantes')

    def __str__(self):
        return '{} - {}'.format(self.name, self.teacher)

    class Meta:
        verbose_name = 'Turma'


class Situation(models.Model):
    SITUACAO = (('REP', 'Reprovado por falta'),
                ('ATV', 'Ativo'),)
    sit = models.CharField(max_length=30, choices=SITUACAO, default='ATV')

    class Meta:
        verbose_name = 'Situação'


class Fault(models.Model):
    faults = models.IntegerField(verbose_name='Faltas',default=2)
    student = models.ForeignKey(Student, on_delete=models.CASCADE,
                                verbose_name='Aluno')
    turma = models.ForeignKey(Turma, on_delete=models.CASCADE,
                                verbose_name='Turma')
    day = models.DateField(auto_now=True, verbose_name="Data")

    class Meta:
        verbose_name = 'Falta'

    def __str__(self):
        return "{} - {}".format(self.student.name, self.turma.name)


class Attendance(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE,
                                verbose_name='Aluno')
    day = models.DateField(auto_now=True, verbose_name="Data")
    subject = models.ForeignKey('Subject', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Presença'

    def __str__(self):
        return '{} - {} /{}'.format(self.student.name, self.subject.name,
                                    self.day)


class TesteUsuario(models.Model):
    """ only for test purposes """
    name = models.CharField(max_length=40)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


# cria um token quando um usuário é criado
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
