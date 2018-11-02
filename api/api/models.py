from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Create your models here.


class Teacher(models.Model):
    name = models.CharField(verbose_name='nome', max_length=55)

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

    name = models.CharField(max_length=55, verbose_name='nome')
    id_subscription = models.IntegerField(primary_key=True,
                                          verbose_name='matricula')
    course = models.CharField(max_length=30, choices=COURSES,
                              verbose_name="Curso")

    class Meta:
        verbose_name = 'Aluno'

    def __str__(self):
        return self.name


class Situation(models.Model):
    SITUACAO = (('REP', 'Reprovado por falta'),
                ('ATV', 'Ativo'),)
    sit = models.CharField(max_length=30, choices=SITUACAO, default='ATV')

    class Meta:
        verbose_name = 'Situação'


class Fault(models.Model):
    faults = models.IntegerField(verbose_name='Faltas')
    student = models.ForeignKey(Student, on_delete=models.CASCADE,
                                verbose_name='Aluno')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE,
                                verbose_name='Disciplina')
    day = models.DateField(auto_now=True, verbose_name="Data")

    class Meta:
        verbose_name = 'Falta'

    def __str__(self):
        return self.student.name


# cria um token quando um usuário é criado
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
