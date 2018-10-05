from django.contrib import admin
from .models import Teacher, Student, Subject, Situation, Fault,Course
# Register your models here.

admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(Subject)
admin.site.register(Fault)
admin.site.register(Course)