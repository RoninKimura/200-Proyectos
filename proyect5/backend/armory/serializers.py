from rest_framework import serializers
from .models import Weapon, Vehicle,Characters, Saga


class SagaBriefSerializer(serializers.ModelSerializer):
    #Estoas son los datos que se mostraran cuando saga se anide a weapons
    class Meta:
        model = Saga
        fields = ['id', 'nombre', 'consola']


class WeaponSerializer(serializers.ModelSerializer):
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    sagas=SagaBriefSerializer(many=True, read_only=True)

    class Meta:
        model = Weapon
        fields = [
            'id', 'nombre', 'tipo', 'tipo_display', 'dano',
            'fecha_introduccion', 'descripcion', 'imagen_url',
            'sagas',
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


class CharactersSerializer(serializers.ModelSerializer):
    tipo_display = serializers.CharField(source='get_especie_display', read_only=True)

    class Meta:
        model = Characters
        fields = [
            'id', 'nombre', 'especie', 'tipo_display',
            'fecha_introduccion', 'descripcion', 'imagen_url',
            'creado_en', 'actualizado_en',
        ]
        read_only_fields = ['id', 'creado_en', 'actualizado_en']


class SagaSerializer(serializers.ModelSerializer):
    tipo_display= serializers.CharField(source='get_consola_display', read_only=True)
    armas_disponibles=WeaponSerializer(many=True, read_only=True)
    armas_ids=serializers.PrimaryKeyRelatedField(
        queryset=Weapon.objects.all(), source='armas_disponibles',
        many=True, write_only=True,required=False,
    )

    class Meta:
        model=Saga
        fields=[
            'id', 'nombre','precio', 'consola', 'tipo_display',
            'fecha_introduccion', 'descripcion', 'imagen_url',
            'armas_disponibles','armas_ids',
            'creado_en', 'actualizado_en',
        ]