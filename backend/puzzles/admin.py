from django.contrib import admin
from .models import Puzzle
from .models import UserSolvedPuzzles

admin.site.register(Puzzle)
admin.site.register(UserSolvedPuzzles)