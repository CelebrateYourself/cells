from rest_framework import viewsets

from .models import SquaresMap
from .serializers import SquaresMapSerializer


class SquaresMapViewSet(viewsets.ModelViewSet):
    queryset = SquaresMap.objects.all()
    serializer_class = SquaresMapSerializer
    lookup_field = 'slug'
