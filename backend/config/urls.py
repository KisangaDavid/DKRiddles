from django.contrib import admin
from . import views
from django.urls import path, include


urlpatterns = [
    path('be/admin/', admin.site.urls),
    # path("be/auth/", include("djoser.urls")),
    # path("be/auth/", include("djoser.urls.jwt")),
    path("be/auth/csrf/", views.getCsrfToken, name="csrf-token"),
    path("be/auth/set-up-conn/", views.setUpConn, name="set-up-conn"),
    path('be/puzzles/', include('puzzles.urls')), 
    path('be/getProfileInfo', views.getProfileInfo, name='getProfileInfo'),
    path('be/setUsername', views.setUsername, name='setUsername'),
    path('be/getLeaderboardInfo', views.getLeaderboardInfo, name='getLeaderboardInfo'),
    # path('be/accounts/', include('allauth.urls')),
    path("be/_allauth/", include("allauth.headless.urls")),
]

