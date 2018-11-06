# Generated by Django 2.1.2 on 2018-11-05 23:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20181102_1949'),
    ]

    operations = [
        migrations.CreateModel(
            name='Present',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day', models.DateField(auto_now=True, verbose_name='Data')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Student', verbose_name='Aluno')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Subject')),
            ],
            options={
                'verbose_name': 'Presença',
            },
        ),
    ]
