from django.test import TestCase, Client
from django.utils.timezone import datetime
from django.db import models
from django.contrib.auth.models import User

from rest_framework.test import APIRequestFactory
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token

from model_mommy import mommy

from api.models import Student

class TestAluno(TestCase):

    def setUp(self):
        self.student = mommy.make('api.Student', name='Davi Wesley',)

    def test_student_creation(self):
        self.assertTrue(isinstance(self.student, Student))
        self.assertEquals(self.student.__str__(), self.student.name)

class TestURLSNoToken(TestCase):
    #fixtures = ['dados_api']

    def setUP(self):
        self.client = Client()
        #self.api_client = APIClient()

    def test_url_api_faults_without_token(self):
        response = self.client.get('/api/faltas')
        self.assertEquals(response.status_code, 403)

    def test_url_api_students(self):
        response = self.client.get('/api/alunos')
        self.assertEquals(response.status_code, 401)
    
    def test_url_api_students_id(self):
        response = self.client.get('/api/alunos/381097')
        self.assertEquals(response.status_code, 401)
    
    