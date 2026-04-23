from django.contrib import admin
from . import views
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet
from django.urls import path, include

router = DefaultRouter()
router.register("users", CustomUserViewSet, basename="users")

urlpatterns = [
    path('admin/', admin.site.urls),
    path("auth/jwt/create", views.ThrottledLoginView.as_view(), name="jwt-create"),
    path("auth/", include(router.urls)),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path("auth/logout/", views.LogoutView.as_view()),
    path('puzzles/', include('puzzles.urls')), 
    path('getProfileInfo', views.getProfileInfo, name='getProfileInfo'),
    path('getLeaderboardInfo', views.getLeaderboardInfo, name='getLeaderboardInfo')
]

