from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path(r'^ws/doc/shivang/$', consumers.DocConsumer.as_asgi()),
]
