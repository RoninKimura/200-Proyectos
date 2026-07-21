from rest_framework import serializers
from .models import Weapon, Vehicle


class WeaponSerializer(serializers.ModelSerializer):
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)

    class Meta:
        model = Weapon
        fields = [
            'id', 'nombre', 'tipo', 'tipo_display', 'dano',
            'fecha_introduccion', 'descripcion', 'imagen_url',
            'creado_en', 'actualizado_en',
        ]
        read_only_fields = ['id', 'creado_en', 'actualizado_en']


class VehicleSerializer(serializers.ModelSerializer):
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)

    class Meta:
        model = Vehicle
        fields = [
            'id', 'nombre', 'tipo', 'tipo_display', 'capacidad',
            'fecha_introduccion', 'descripcion', 'imagen_url',
            'creado_en', 'actualizado_en',
        ]
        read_only_fields = ['id', 'creado_en', 'actualizado_en']
