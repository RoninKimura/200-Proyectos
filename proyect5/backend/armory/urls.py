from rest_framework.routers import DefaultRouter
from .views import WeaponViewSet, VehicleViewSet,CharactersSet,SagaSet

router = DefaultRouter()
router.register(r'weapons', WeaponViewSet, basename='weapon')
router.register(r'vehicles', VehicleViewSet, basename='vehicle')
router.register(r'characters', CharactersSet, basename='character')
router.register(r'sagas', SagaSet, basename='saga')

urlpatterns = router.urls
