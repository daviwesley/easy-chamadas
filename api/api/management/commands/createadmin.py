from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

import os
import sys

class Command(BaseCommand):
    help = 'Create default admin user'

    def handle(self, *args, **options):
        print('Creating superuser...')

        user = User.objects.filter(username='admin').first()
        if not user:
            try:
                os.environ['DJ_PASSW']
            except KeyError as e:
                return "Define a password before running this command\
                       (set DJ_PASSW=yourpasswd)"
            user = User.objects.create_superuser('admin', 'admin@example.com',
                                                 os.environ['DJ_PASSW'])
            print('User created!')
        else:
            print("[!]admin already exist")
            sys.exit(1)
        print('Done!')
