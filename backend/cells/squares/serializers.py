from rest_framework import serializers

from .models import SquaresMap


class SquaresMapSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.get_username')

    class Meta:
        model = SquaresMap
        fields = '__all__'
        read_only_fields = ('author', 'slug', 'created_at', 'updated_at')
        lookup_field = 'slug'
        extra_kwargs = {
            'url': {'lookup_field': 'slug'},
        }
