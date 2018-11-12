from django.test import TestCase
from django.contrib.auth.models import User

from rest_framework.test import APIClient
from model_mommy import mommy
from rest_framework.authtoken.models import Token

from api.models import Student, Subject, Teacher, Fault, Attendance


class TestDatabase(TestCase):
    # fixtures = ['datadumped']

    def setUp(self):
        self.student = mommy.make('api.Student', name='Mikasa',
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

    def test_create_subject(self):
        # Arrange
        fup = mommy.make(Subject, name="Fundamentos de Programação", hours=64,
                         credit=4,)
        # Act
        # Assert
        self.assertTrue(isinstance(fup, Subject))
        self.assertEquals(fup.__str__(), fup.name)

    def test_create_teacher(self):
        # Arrange
        prof = mommy.make(Teacher, name="Saya Jean")
        # Act
        # Assert
        self.assertTrue(isinstance(prof, Teacher))
        self.assertEquals(prof.__str__(), prof.name)

    def test_create_faul(self):
        # Arrange
        aluno = mommy.make(Student, name="Eren Yager")
        falta = mommy.make(Fault, faults=4, student=aluno)
        # Act
        # Assert
        self.assertTrue(isinstance(falta, Fault))

    def test_create_user(self):
        # Arrange
        user = mommy.make(User, username="mikasa", password="loveyager")
        # Act
        # Assert
        self.assertTrue(isinstance(user, User))

    def test_create_attendance_log(self):
        # Arrange
        aluno = mommy.make(Student, name='Erwin Smith')
        sub = mommy.make(Subject, name='Exploração')
        att = mommy.make(Attendance, student=aluno, subject=sub)
        # Act
        # Assert
        self.assertTrue(isinstance(att, Attendance))


class TestURLsemToken(TestCase):
    # fixtures = ['datadumped']

    def setUP(self):
        self.client = APIClient()
        # self.api_client = APIClient()

    # GET methods -----------------------
    def test_url_api_faults_get(self):
        # Assert
        response = self.client.get('/api/faltas')
        # Act
        # Assert
        self.assertEquals(response.status_code, 403)

    def test_url_api_students_get(self):
        # Assert
        response = self.client.get('/api/alunos')
        # Act
        # Assert
        self.assertEquals(response.status_code, 401)

    def test_url_api_students_id_get(self):
        # Assert
        response = self.client.get('/api/alunos/381097')
        # Act
        # Assert
        self.assertEquals(response.status_code, 401)

    def test_url_api_attendance_get(self):
        # Assert
        response = self.client.get('/api/presencas')
        # Act
        # Assert
        self.assertEquals(response.status_code, 401)

    # POST methods ---------------------------
    def test_url_api_faults_post(self):
        # Arrange
        url = '/api/faltas'
        data = {
            "faults": 2,
            "student": {"name": "Eren Yager"},
            "subject": {"name": "Estrutura de Dados"}
        }
        # Act
        response = self.client.post(url, data, format='json')
        # Assert
        self.assertEquals(response.status_code, 403)

    def test_url_api_subject_post(self):
         # Arrange
        url = '/api/disciplinas'
        data = {
            "name": "Teatro",
            "teacher": {"name": "Rosalina Meireles"}
        }
        # Act
        response = self.client.post(url, data, format='json')
        # Assert
        self.assertEquals(response.status_code, 403)

    def test_url_api_student_post(self):
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
        self.assertEquals(response.status_code, 401)

    def test_url_api_teacher_post(self):
        # Arrange
        data = {
            'name': 'Armin Armlet'
        }
        url = '/api/professores'
        # Act
        response = self.client.post(url, data, format='json')
        # Assert
        self.assertEqual(response.status_code, 401)

    def test_url_attendance_post(self):
        # Arrange
        data = {
            "student": "Daniel Wesley",
            "subject": "Teatro"
        }
        url = '/api/presencas'
        # Act
        response = self.client.post(url, data, format='json')
        # Assert
        self.assertEqual(response.status_code, 401)


class TestaURLcomToken(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.token = str(User.objects.create_superuser(
                         username="levi",
                         email="levi@levi.com",
                         password="ackerman948").auth_token)
        self.client.credentials(HTTP_AUTHORIZATION="Token {}".
                                format(self.token))

    def test_received_token(self):
        self.assertEquals(self.token, Token.objects.get(user_id=1).__str__())

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
