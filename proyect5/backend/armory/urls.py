from rest_framework.routers import DefaultRouter
from .views import WeaponViewSet, VehicleViewSet,CharactersSet

router = DefaultRouter()
router.register(r'weapons', WeaponViewSet, basename='weapon')
router.register(r'vehicles', VehicleViewSet, basename='vehicle')
router.register(r'characters', CharactersSet, basename='character')

urlpatterns = router.urls
