# Generated by Django 2.1.2 on 2018-11-02 22:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_auto_20181102_1947'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Course',
        ),
        migrations.AlterField(
            model_name='student',
            name='course',
            field=models.CharField(choices=[('Engenharia de Software', 'Engenharia de Software'), ('Ciências da Computação', 'Ciências da Computação'), ('Engenharia da Produção', 'Engenharia da Produção'), ('Engenharia Civil', 'Engenharia Civil'), ('Engenharia Mecânica', 'Engenharia Mecânica')], max_length=30, verbose_name='Curso'),
        ),
    ]
