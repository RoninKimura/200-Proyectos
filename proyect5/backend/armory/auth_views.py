from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class EmailOrUsernameTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Login con usuario/contraseña que además regresa datos del admin en la respuesta."""

    def validate(self, attrs):
        data = super().validate(attrs)
        data['is_staff'] = self.user.is_staff
        data['username'] = self.user.username
        return data


class EmailOrUsernameTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailOrUsernameTokenObtainPairSerializer


class MeView(APIView):
    """Devuelve los datos del usuario autenticado (para saber si es admin en el frontend)."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
        })
