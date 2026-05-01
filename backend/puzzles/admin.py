from django.contrib import admin
from .models import User, UserSolvedPuzzles

admin.site.register(UserSolvedPuzzles)
admin.site.register(User)