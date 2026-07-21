from django.contrib import admin
from .models import Pedido,PedidoItem,Perfil,Producto,Aderezo

# Register your models here.
admin.register(Perfil)
admin.register(Producto)
admin.register(Pedido)
admin.register(PedidoItem)
admin.register(Aderezo)
