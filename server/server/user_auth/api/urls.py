from django.urls import path
from .views import UserViewSet ,Login , VerifyingUserOTP , GetUser
urlpatterns = [
    path('user', UserViewSet.as_view({"post":"create"})),
    path('login', Login.as_view()),
    path('verify', VerifyingUserOTP.as_view()),
    path('details/<int:pk>/', GetUser.as_view())
]
