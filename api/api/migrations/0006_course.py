# Generated by Django 2.1.1 on 2018-09-29 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20180928_2157'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('ES', 'Engenharia de Software'), ('CC', 'Ciências da Computação'), ('EP', 'Engenharia da Produção'), ('EC', 'Engenharia Civil'), ('EM', 'Engenharia Mecânica')], max_length=30)),
            ],
        ),
    ]
