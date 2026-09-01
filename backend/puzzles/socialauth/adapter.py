import uuid

from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.headless.adapter import DefaultHeadlessAdapter
from allauth.headless import app_settings as headless_settings
from allauth.headless.socialaccount.views import ProviderTokenView
from config.settings import PENDING_USERNAME_PREFIX


class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def populate_user(self, request, sociallogin, data):
        # print(f"within CustomSocialAccountAdapter.populate_user!")
        # print(f"sociallogin: {sociallogin}")
        # print(f"data: {data}")
        # print(f"request: {request}")
        user = super().populate_user(request, sociallogin, data)
        user.username = f"{PENDING_USERNAME_PREFIX}{uuid.uuid4().hex}"
        # print(f"social login account provider account: {sociallogin.account.get_provider_account()}")
        # print(f"social login account url thing: {sociallogin.account.get_provider_account().get_avatar_url()}")
        user.pfp_url = sociallogin.account.get_provider_account().get_avatar_url()
        return user