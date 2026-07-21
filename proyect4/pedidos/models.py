from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator

# Create your models here.
class Perfil(models.Model):
  rol=[
    ('mesero','Mesero'),
    ('cocinero','Cocinero'),
    ('admin','Administrador'),
  ]

  user= models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil')
  rol=models.CharField(max_length=10, choices=rol)

  def __str__(self):
    return f'{self.user.username} ({self.get_rol_display()})'

class Aderezo(models.Model):
  nombre=models.CharField(max_length=60, unique=True)
  precio_extra= models.DecimalField(max_digits=6,decimal_places=2, default=0)
  activo=models.BooleanField(default=True);

  def __str__(self):
    return self.nombre

class Producto(models.Model):
  categoria=[
    ('entrada','Entrada'),
    ('plato_fuerte','Plato fuerte'),
    ('postre','Postre'),
    ('bebida','Bebida'),
  ]

  nombre=models.CharField(max_length=100)
  categoria=models.CharField(max_length=20,choices=categoria)
  precio=models.DecimalField(max_digits=8, decimal_places=2)
  descripcion=models.TextField(blank=True)
  disponible=models.BooleanField(default=True)
  aderezos_disponibles=models.ManyToManyField(Aderezo, blank=True, related_name='productos')
  def __str__(self):
    return self.nombre

class Pedido(models.Model):
  estado=[
    ('pendiente','Pedndiente'),
    ('en_preparacion','En preaparacion'),
    ('listo','Listo'),
    ('entregado','Entregado'),
  ]
  numero_cliente=models.PositiveIntegerField()
  mesero=models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='pedidos')
  estado=models.CharField(max_length=20, choices=estado, default= 'pendiente')
  notas=models.TextField(blank=True)
  fecha=models.DateTimeField(auto_now_add=True)
  actualizado_en=models.DateTimeField(auto_now=True)

  def __str__ (sefl):
    return f'Pedido #{sefl.id}-Cliente {sefl.numero_cliente}'

class PedidoItem(models.Model):
  pedidos=models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='items')
  productos=models.ForeignKey(Producto, on_delete=models.PROTECT, related_name='pedido_items')
  cantidad=models.PositiveIntegerField(default=1,validators=[MinValueValidator(1)])
  aderezos=models.ManyToManyField(Aderezo,blank=True,related_name='pedido_items')
  notas=models.CharField(max_length=200,blank=True)
  precio_unitario= models.DecimalField(max_digits=8, decimal_places=2)

  def __str__(self):
    return f'{self.cantidad}x{self.productos.nombre}'