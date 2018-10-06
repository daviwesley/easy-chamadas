from django.test import TestCase
from django.contrib.auth.models import User

from rest_framework.test import APIRequestFactory
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token

from model_mommy import mommy

from api.models import Student

class TestAPIPost(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.client1 = APIClient()
        self.token = str(User.objects.create_superuser(username="levi",email=\
        "levi@levi.com",password="ackerman948").auth_token)
        self.client.credentials(HTTP_AUTHORIZATION="Token {}".format(self.token))
    
    def test_api_create_alunos(self):
        # Arrange
        url = '/api/alunos'
        data = {
            "name": "Annie Leonheart",
            "id_subscription": 432634,
            "course": "CC"
        }
        # Act
        response = self.client.post(url, data, format='json')
        # Assert
        self.assertEqual(response.status_code, 201)
    
    # def test_api_create_subject(self):
    #     # Arrange
    #     url = '/api/disciplinas'
    #     data = {
    #         "name": "Fundamentos de Programação",
    #         "hours": 64,
    #         "credit": 4,
    #         "teacher": [
    #             1
    #         ]
    #     }
    #     # Act
    #     response = self.client.post(url, data, format='json')
    #     # Assert
    #     self.assertEqual(response.status_code, 201)
        