from . import views
from django.urls import path

urlpatterns = [
    path('ratRiddle/checkRatRiddleAnswer', views.checkRatRiddleAnswer, name='checkRatRiddleAnswer'),
    path('ratRiddle/checkRatRiddleBonusAnswer', views.checkRatRiddleBonusAnswer, name='checkRatRiddleBonusAnswer'),
    path('horseRiddle/checkHorseRiddleAnswer', views.checkHorseRiddleAnswer, name='checkHorseRiddleAnswer'),
    path('horseRiddle/raceHorses', views.raceHorses, name='raceHorses'),
    path('roosterRiddle/getInitialPiles', views.getInitialPiles, name='getInitialPiles'),
    path('roosterRiddle/getRoosterRiddleMove', views.getRoosterRiddleMove, name='getRoosterRiddleMove'),
    path('rabbitRiddle/checkRabbitRiddleAnswer', views.checkRabbitRiddleAnswer, name='checkRabbitRiddleAnswer'),
    path('rabbitRiddle/checkRabbitRiddleBonusAnswer', views.checkRabbitRiddleBonusAnswer, name='checkRabbitRiddleBonusAnswer'),
]
