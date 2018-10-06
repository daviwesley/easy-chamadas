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
    #fixtures = ['datadumped']

    def setUp(self):
        self.student = mommy.make('api.Student', name='Mikasa',\
        id_subscription=381097)
        self.client = APIClient()

    def test_student_creation(self):
        self.assertTrue(isinstance(self.student, Student))
        self.assertEquals(self.student.__str__(), self.student.name)
    
    def test_student_name(self):
        # Arrange
        student = self.student
        # Act
        name = student.name
        # Assert
        self.assertEqual(name, "Mikasa")

    def test_tem_usuario_joão(self):
        # Arrange
        davi = User.objects.create_user(username="joão")
        # Act
        nome = davi.username
        # Assert
        self.assertEqual(nome, "joão")

class TestURLsemToken(TestCase):
    #fixtures = ['datadumped']

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

class TestaURLcomToken(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.token = str(User.objects.create_superuser(username="levi",email=\
        "levi@levi.com",password="ackerman948").auth_token)
        self.client.credentials(HTTP_AUTHORIZATION="Token {}".format(self.token))

    def testa_url_professores_deve_retorna_200(self):
        response = self.client.get('/api/professores')
        self.assertEquals(response.status_code, 200)
    
    def test_url_api_faults_with_token(self):
        response = self.client.get('/api/faltas')
        self.assertEquals(response.status_code, 200)

    def test_url_api_students_with_token(self):
        response = self.client.get('/api/alunos')
        self.assertEquals(response.status_code, 200)
    
    def test_url_api_students_id_with_token(self):
        response = self.client.get('/api/alunos/381097')
        self.assertEquals(response.status_code, 200)
