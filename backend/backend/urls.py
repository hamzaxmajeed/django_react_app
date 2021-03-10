from django.contrib import admin
from django.urls import path, include
from todo import views
from rest_framework import routers

# To autoconfig urls and set ViewSet logic.
router = routers.DefaultRouter()
"""
When you go to tasks, this will return a list of all the tasks for the todo items.
# Create, read, update and delete operations can be done when inside tasks.
"""
router.register(r'tasks', views.TodoView, 'task')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]
