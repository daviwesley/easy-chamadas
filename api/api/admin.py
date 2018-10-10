from django.contrib import admin
from .models import Teacher, Student, Subject, Fault
# Register your models here.

admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(Subject)
admin.site.register(Fault)
