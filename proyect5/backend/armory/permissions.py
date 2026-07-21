from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnly(BasePermission):
    """
    Cualquiera puede leer (GET/HEAD/OPTIONS).
    Solo un usuario staff/administrador autenticado puede crear, editar o borrar.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)
