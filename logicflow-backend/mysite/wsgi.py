"""
WSGI config for mysite project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
import os

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from django.urls import path
from doc.consumers import DocConsumer

websocket_urlpatterns = [
    path('ws/doc/shivang/', DocConsumer.as_asgi()),
]

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')

django_wsgi_app = get_wsgi_application()

application = ProtocolTypeRouter({
    "http": django_wsgi_app,
    # Just HTTP for now. (We can add other protocols later.)
    "websocket": 
            URLRouter(websocket_urlpatterns)
        ,
})