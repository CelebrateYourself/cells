from django.db import models
from pytils.translit import slugify
from django.conf import settings


class SquaresMap(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='squares_maps',
    )
    cols = models.PositiveSmallIntegerField()
    rows = models.PositiveSmallIntegerField()
    title = models.CharField(max_length=40, unique=True)
    slug = models.SlugField(max_length=64, primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    json_str = models.TextField()

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)
