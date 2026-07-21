from django.contrib import admin
from .models import Weapon, Vehicle


@admin.register(Weapon)
class WeaponAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo', 'dano', 'fecha_introduccion')
    search_fields = ('nombre',)
    list_filter = ('tipo',)


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo', 'capacidad', 'fecha_introduccion')
    search_fields = ('nombre',)
    list_filter = ('tipo',)
