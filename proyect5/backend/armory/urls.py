from rest_framework.routers import DefaultRouter
from .views import WeaponViewSet, VehicleViewSet

router = DefaultRouter()
router.register(r'weapons', WeaponViewSet, basename='weapon')
router.register(r'vehicles', VehicleViewSet, basename='vehicle')

urlpatterns = router.urls
