from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class SingleIntSerializer(serializers.Serializer):
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
