from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from armory.auth_views import EmailOrUsernameTokenObtainPairView, MeView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('armory.urls')),
    path('api/auth/login/', EmailOrUsernameTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/me/', MeView.as_view(), name='me'),
]
