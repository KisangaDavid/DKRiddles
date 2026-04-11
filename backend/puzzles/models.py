from django.db import models
from django.conf import settings

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