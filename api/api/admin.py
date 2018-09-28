from django.contrib import admin
from .models import Teacher, Student, Subject, Situation
# Register your models here.

admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(Situation)
admin.site.register(Subject)