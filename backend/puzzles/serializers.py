from rest_framework import serializers
from puzzles.models import Puzzle, UserSolvedPuzzles

class PuzzleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Puzzle
        fields = ['name', 'numberSolved', 'created', 'updated', 'id']
        read_only_fields = ['created', 'updated', 'id']

class UserSolvedPuzzlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSolvedPuzzles
        fields = ['id', 'userId', 'solvedPuzzle', 'solvedTime']
        read_only_fields = ['solvedTime', 'id']