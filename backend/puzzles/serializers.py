from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from better_profanity import profanity
from django.contrib.auth import get_user_model
from puzzles.models import UserSolvedPuzzles

User = get_user_model()

class UserSolvedPuzzlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSolvedPuzzles
        fields = ['id', 'user', 'solvedPuzzle', 'solvedTime']
        read_only_fields = ['solvedTime', 'id']


class CaseInsensitiveUserCreateSerializer(UserCreateSerializer):
    email = serializers.EmailField(required=False, allow_blank=True)
    def validate_username(self, value):
        if profanity.contains_profanity(value):
            raise serializers.ValidationError(
                "Please choose a different username."
            )
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("An account with that username already exists.")
        return value

    def validate_email(self, value):
        if value:
            value = value.lower()
            if User.objects.filter(email__iexact=value).exists():
                raise serializers.ValidationError(
                    "An account with that email already exists."
                )
        return value
    
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ("username", "password", "email")

class SingleIntSerializer(serializers.Serializer):
    submittedInt = serializers.IntegerField()

class CheckRatRiddleAnswerSerializer(serializers.Serializer):
    submittedInt = serializers.IntegerField()

class CheckRatRiddleBonusAnswerSerializer(serializers.Serializer):
    numHouses = serializers.IntegerField()
    answerToBonus = serializers.IntegerField()

class CheckHorseRiddleAnswerSerializer(serializers.Serializer):
    randSeed = serializers.IntegerField()
    fastestHorsesInt = serializers.IntegerField()
    submittedRaces = serializers.ListField(
        child=serializers.IntegerField()
    )
    numRaces = serializers.IntegerField()

class RaceHorsesSerializer(serializers.Serializer):
    randSeed = serializers.IntegerField()
    submittedHorsesInt = serializers.IntegerField()

class CheckRabbitRiddleBonusAnswerSerializer(serializers.Serializer):
    numBonusRabbits = serializers.IntegerField()
    answerToBonus = serializers.IntegerField()

class CheckRatRiddleAnswerSerializer(serializers.Serializer):
    submittedPlan = serializers.CharField()

    def validate_submittedPlan(self, value):
        try:
            return int(value, 2)
        except ValueError:
            raise serializers.ValidationError("Invalid binary string")
