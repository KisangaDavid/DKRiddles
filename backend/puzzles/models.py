from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db.models.functions import Lower


class PuzzleNames(models.TextChoices):
    RAT_PUZZLE_P1     = "RAT_P1",     "Rat Puzzle Part 1"
    RAT_PUZZLE_P2     = "RAT_P2",     "Rat Puzzle Part 2"
    HORSE_PUZZLE_P1   = "HORSE_P1",   "Horse Puzzle"
    ROOSTER_PUZZLE_P1 = "ROOSTER_P1", "Rooster Puzzle"
    RABBIT_PUZZLE_P1  = "RABBIT_P1",  "Rabbit Puzzle Part 1"
    RABBIT_PUZZLE_P2  = "RABBIT_P2",  "Rabbit Puzzle Part 2"


class User(AbstractUser):
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
        constraints = [
            models.UniqueConstraint(
                Lower('username'),
                name="unique_case_insensitive_username"
            ),
             models.UniqueConstraint(
                Lower('email'),
                name="unique_case_insensitive_email"
            )
        ]


class UserSolvedPuzzles(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    solvedPuzzle = models.CharField(choices=PuzzleNames.choices)
    solvedTime = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'puzzles_solved_puzzles'
        constraints = [
            models.UniqueConstraint(
                fields=["user", "solvedPuzzle"],
                name="unique_user_solvedPuzzle"
            )]