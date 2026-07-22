from rest_framework import viewsets, filters
from .models import Weapon, Vehicle,Characters
from .serializers import WeaponSerializer, VehicleSerializer, CharactersSerializer
from .permissions import IsAdminOrReadOnly


class WeaponViewSet(viewsets.ModelViewSet):
    queryset = Weapon.objects.all()
    serializer_class = WeaponSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nombre', 'descripcion']
    ordering_fields = ['nombre', 'dano', 'fecha_introduccion']


class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nombre', 'descripcion']
    ordering_fields = ['nombre', 'capacidad', 'fecha_introduccion']


class CharactersSet(viewsets.ModelViewSet):
    queryset = Characters.objects.all()
    serializer_class = CharactersSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nombre', 'descripcion']
    ordering_fields = ['nombre', 'especie', 'fecha_introduccion']