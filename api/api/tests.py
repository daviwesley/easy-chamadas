from django.test import TestCase
from model_mommy import mommy
from django.utils.timezone import datetime
from api.models import Student

class TestAluno(TestCase):

    def setUp(self):
        self.student = mommy.make('api.Student', name='Davi Wesley',)

    def test_student_creation(self):
        self.assertTrue(isinstance(self.student, Student))
        self.assertEquals(self.student.__str__(), self.student.name)
