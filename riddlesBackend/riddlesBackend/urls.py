from django.contrib import admin
from . import views
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path("auth/logout/", views.LogoutView.as_view()),
    path('puzzles/ratRiddle/checkRatRiddleAnswer', views.checkRatRiddleAnswer, name='checkRatRiddleAnswer'),
    path('puzzles/ratRiddle/checkRatRiddleBonusAnswer', views.checkRatRiddleBonusAnswer, name='checkRatRiddleBonusAnswer'),
    path('puzzles/horseRiddle/checkHorseRiddleAnswer', views.checkHorseRiddleAnswer, name='checkHorseRiddleAnswer'),
    path('puzzles/horseRiddle/raceHorses', views.raceHorses, name='raceHorses'),
    path('puzzles/roosterRiddle/getInitialPiles', views.getInitialPiles, name='getInitialPiles'),
    path('puzzles/roosterRiddle/getRoosterRiddleMove', views.getRoosterRiddleMove, name='getRoosterRiddleMove'),
    path('puzzles/rabbitRiddle/checkRabbitRiddleBonusAnswer', views.checkRabbitRiddleBonusAnswer, name='checkRabbitRiddleBonusAnswer'),
]

