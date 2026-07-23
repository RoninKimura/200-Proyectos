from django.db import models


class Weapon(models.Model):
    """Catálogo de armas del universo Halo."""

    TIPO_CHOICES = [
        ('rifle_asalto', 'Rifle de asalto'),
        ('rifle_battle', 'Battle Rifle'),
        ('pistola', 'Pistola'),
        ('escopeta', 'Escopeta'),
        ('francotirador', 'Rifle de francotirador'),
        ('energia', 'Arma de energía (Covenant/Forerunner)'),
        ('explosivo', 'Lanzacohetes / Explosivo'),
        ('cuerpo_a_cuerpo', 'Cuerpo a cuerpo'),
    ]

    nombre = models.CharField(max_length=100)                     # varchar
    tipo = models.CharField(max_length=30, choices=TIPO_CHOICES)  # varchar
    dano = models.IntegerField(help_text='Daño estimado por impacto (1-100)')  # int
    fecha_introduccion = models.DateField(                        # date
        help_text='Fecha/año en que aparece por primera vez en la saga'
    )
    descripcion = models.TextField(blank=True)                    # text
    imagen_url = models.URLField(blank=True, null=True)

    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return self.nombre


class Vehicle(models.Model):
    """Catálogo de vehículos del universo Halo."""

    TIPO_CHOICES = [
        ('terrestre', 'Terrestre'),
        ('aereo', 'Aéreo'),
        ('acuatico', 'Acuático/Anfibio'),
        ('espacial', 'Nave espacial'),
    ]

    nombre = models.CharField(max_length=100)                     # varchar
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)   # varchar
    capacidad = models.IntegerField(help_text='Número de tripulantes')  # int
    fecha_introduccion = models.DateField()                       # date
    descripcion = models.TextField(blank=True)                    # text
    imagen_url = models.URLField(blank=True, null=True)

    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return self.nombre


class Characters(models.Model):

    TIPO_CHOICES=[
        ('humano','Humano'),
        ('inteligencia_artificial','Inteligencia Artificial'),
        ('elites','Sangheili'),
        ('grunts','Unggoy'),
        ('brutes','Jiralhanae'),
        ('prophets','San\'Shyuum'),
    ]

    nombre=models.CharField(max_length=100)
    especie=models.CharField(max_length=25, choices=TIPO_CHOICES)
    fecha_introduccion = models.DateField(                        # date
        help_text='Fecha/año en que aparece por primera vez en la saga'
    )
    descripcion = models.TextField(blank=True)                    # text
    imagen_url = models.URLField(blank=True, null=True)

    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return self.nombre


class Saga(models.Model):
    
    TIPO_CHOICES=[
        ('pc','PC'),
        ('xbox','XBOX'),
        ('xbox_360','Xbox 360'),
        ('xbox_one','Xbox One'),
        ('xbox_one','Xbox One'),
    ]

    nombre = models.CharField(max_length=100)
    precio=models.IntegerField(help_text='Costo del Juego en MXN')
    consola=models.CharField(max_length=25, choices=TIPO_CHOICES)
    armas_disponibles = models.ManyToManyField(Weapon, blank=True, related_name='sagas')
    fecha_introduccion = models.DateField(                        # date
        help_text='Fecha/año en que aparece por primera vez en la saga'
    )
    descripcion = models.TextField(blank=True)                    # text
    imagen_url = models.URLField(blank=True, null=True)

    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return self.nombre