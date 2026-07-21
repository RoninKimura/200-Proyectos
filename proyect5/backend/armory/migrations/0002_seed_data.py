from django.db import migrations


def seed_data(apps, schema_editor):
    Weapon = apps.get_model('armory', 'Weapon')
    Vehicle = apps.get_model('armory', 'Vehicle')

    weapons = [
        dict(nombre='MA5 Battle Rifle', tipo='rifle_battle', dano=65,
             fecha_introduccion='2001-11-15',
             descripcion='Rifle estándar de la UNSC, preciso a media distancia con ráfaga de tres disparos.'),
        dict(nombre='Energy Sword', tipo='cuerpo_a_cuerpo', dano=100,
             fecha_introduccion='2001-11-15',
             descripcion='Arma cuerpo a cuerpo Covenant capaz de eliminar de un solo golpe.'),
        dict(nombre='Needler', tipo='energia', dano=55,
             fecha_introduccion='2001-11-15',
             descripcion='Arma Covenant que dispara agujas de cristal autoguiadas.'),
        dict(nombre='Sniper Rifle System 99', tipo='francotirador', dano=95,
             fecha_introduccion='2001-11-15',
             descripcion='Rifle de francotirador de la UNSC, letal a larga distancia.'),
    ]
    for w in weapons:
        Weapon.objects.get_or_create(nombre=w['nombre'], defaults=w)

    vehicles = [
        dict(nombre='M12 Warthog', tipo='terrestre', capacidad=3,
             fecha_introduccion='2001-11-15',
             descripcion='Vehículo todoterreno de la UNSC, versátil y ágil en combate.'),
        dict(nombre='Type-26 Banshee', tipo='aereo', capacidad=1,
             fecha_introduccion='2001-11-15',
             descripcion='Nave de ataque Covenant, rápida y maniobrable.'),
        dict(nombre='UNSC Pillar of Autumn', tipo='espacial', capacidad=500,
             fecha_introduccion='2001-11-15',
             descripcion='Crucero de batalla clase Halcyon de la UNSC.'),
    ]
    for v in vehicles:
        Vehicle.objects.get_or_create(nombre=v['nombre'], defaults=v)


def remove_data(apps, schema_editor):
    Weapon = apps.get_model('armory', 'Weapon')
    Vehicle = apps.get_model('armory', 'Vehicle')
    Weapon.objects.all().delete()
    Vehicle.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('armory', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(seed_data, remove_data),
    ]
