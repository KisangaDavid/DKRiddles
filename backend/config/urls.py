from django.contrib import admin
from . import views
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet
from django.urls import path, include

router = DefaultRouter()
router.register("users", CustomUserViewSet, basename="users")

urlpatterns = [
    path('be/admin/', admin.site.urls),
    path("be/auth/jwt/create", views.ThrottledLoginView.as_view(), name="jwt-create"),
    path("be/auth/", include(router.urls)),
    path("be/auth/", include("djoser.urls")),
    path("be/auth/", include("djoser.urls.jwt")),
    path("be/auth/logout/", views.LogoutView.as_view()),
    path('be/puzzles/', include('puzzles.urls')), 
    path('be/getProfileInfo', views.getProfileInfo, name='getProfileInfo'),
    path('be/getLeaderboardInfo', views.getLeaderboardInfo, name='getLeaderboardInfo')
]

