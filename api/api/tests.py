from django.test import TestCase
from model_mommy import mommy
from django.utils.timezone import datetime
from api.models import Student, Teacher, Subject


class TestRecord(TestCase):

    def setUp(self):
        self.teacher = mommy.make(Teacher, name='Tatiane Fernandes')
        self.disciplina = mommy.make(Subject, name='Estrutura de Dados',
                                     hours=64, credit=4, teacher=self.teacher)
        self.student = mommy.make(
            Student, name='Sony Music', id_subscription=381097, subject=self.disciplina)

    def test_student_creation(self):
        self.assertTrue(isinstance(self.student, Student))
        self.assertEquals(self.student.__str__(), self.student.name)
