from django.test import TestCase
from django.contrib.auth.models import User

from rest_framework.test import APIClient

from model_mommy import mommy

from api.models import Student, Subject, Teacher


class TestAPIPost(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.client1 = APIClient()
        self.token = str(User.objects.
                         create_superuser(username="levi",
                                          email="levi@levi.com",
                                          password="ackerman948").auth_token)
        self.client.credentials(HTTP_AUTHORIZATION="Token {}".
                                format(self.token))
        self.aluno = mommy.make(Student, name="Eren Yager",
                                id_subscription=381097)
        self.disciplina = mommy.make(Subject, name="Estrutura de Dados")
        self.teacher = mommy.make(Teacher, name="Tatiane Fernandes")

    def test_api_create_student(self):
        # Arrange
        url = '/api/alunos'
        data = {
            "name": "Annie Leonheart",
            "id_subscription": 432634,
            "course": "Engenharia de Software"
        }
        # Act
        response = self.client.post(url, data, format='json')
        # Assert
        self.assertEqual(response.status_code, 201)

    def test_update_student(self):
        # Arrange
        self.test_api_create_student()  # it needs to create a student
        sub = 381097
        url = "/api/alunos/update/{}".format(sub)

        data = {
            "name": "Armin"
        }
        # Act
        response = self.client.patch(url, data, format='json')
        # Assert
        self.assertEqual(response.status_code, 200)

    def test_api_create_subject(self):
        # Arrange
        url = '/api/disciplinas'
        data = {
            "name": "Fundamentos de Programação",
            "teacher": 1
        }
        # Act
        response = self.client.post(url, data, format='json')
        # Assert
        self.assertEqual(response.status_code, 201)

    def test_update_subject(self):
        # Arrange
        self.test_api_create_subject()  # it needs to create a subject
        id = 1
        url = "/api/disciplinas/{}".format(id)

        data = {
            "name": "Teoria das Cordas"
        }
        # Act
        response = self.client.patch(url, data, format='json')
        # Assert
        self.assertEqual(response.status_code, 200)

    def test_create_a_fault(self):
        # Arrange
        url = '/api/faltas'
        data = {
            "faults": 2,
            "student": {"name":"Eren Yager"},
            "subject": {"name":"Estrutura de Dados"}
        }
        # Act
        response = self.client.post(url, data, format='json')
        # Assert
        self.assertEqual(response.status_code, 201)

    def test_update_student_fault(self):
        # Arrange
        self.test_create_a_fault()  # it needs to create a fault before testing
        id = 1
        url = "/api/faltas/{}".format(id)

        data = {
            "faults": 9
        }
        # Act
        response = self.client.patch(url, data, format='json')
        # Assert
        self.assertEqual(response.status_code, 200)
