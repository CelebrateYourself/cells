from django.db.models import F
from rest_framework import viewsets

from .models import SquaresMap
from .serializers import SquaresMapSerializer


class SquaresMapViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SquaresMap.objects.order_by(F('cols') * F('rows'), '-rows')
    serializer_class = SquaresMapSerializer
    lookup_field = 'slug'
