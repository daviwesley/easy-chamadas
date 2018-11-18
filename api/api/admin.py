from django.contrib import admin
from .models import Teacher, Student, Subject, Fault, Attendance, Turma, TesteUsuario
# Register your models here.


class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'id_subscription', 'course', 'owner')
    list_filter = ('name', 'id_subscription', 'course','owner')
    search_fields = ('name', 'id_subscription')


class TurmaAdmin(admin.ModelAdmin):
    list_display = ('name', 'teacher', 'owner',)
    list_filter = ('name', 'owner',)
    search_fields = ('name', 'owner',)


class FaultAdmin(admin.ModelAdmin):
    list_display = ('student', 'turma', 'faults', 'owner', 'day')
    list_filter = ('student', 'turma', 'faults', 'owner')
    search_fields = ('student', 'turma', 'faults', 'owner')
    date_hierarchy = 'day'


admin.site.register(Teacher)
admin.site.register(Student, StudentAdmin)
admin.site.register(Fault, FaultAdmin)
admin.site.register(Attendance)
admin.site.register(Turma, TurmaAdmin)
