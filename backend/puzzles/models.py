from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

class user(AbstractUser):
    first_name = None
    last_name = None
    email = models.EmailField(unique=True, null=True, blank=True)
    numPuzzlesSolved = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if self.email == "":
            self.email = None
        super().save(*args, **kwargs)

    class Meta:
        db_table = 'puzzles_users' 

class Puzzle(models.Model):
    name = models.CharField(max_length=255)
    numberSolved = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'puzzles_puzzles' 

class UserSolvedPuzzles(models.Model):
    userId = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE
    )
    solvedPuzzle = models.ForeignKey(Puzzle, on_delete=models.CASCADE)
    solvedTime = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'puzzles_solved_puzzles' 