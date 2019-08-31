from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .api import SquaresMapViewSet


router = DefaultRouter()
router.register('', SquaresMapViewSet)

urlpatterns = [
    path('maps/', include(router.urls)),
]
