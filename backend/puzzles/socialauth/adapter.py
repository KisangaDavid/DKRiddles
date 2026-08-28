import uuid

from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from config.settings import PENDING_USERNAME_PREFIX


class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def populate_user(self, request, sociallogin, data):
        user = super().populate_user(request, sociallogin, data)
        user.username = f"{PENDING_USERNAME_PREFIX}{uuid.uuid4().hex}"
        return user