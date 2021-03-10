from django.contrib import admin
from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    """
    To be able to register the model.
    """
    list_display = ('title', 'description', 'completed')


# To register model
admin.site.register(Todo, TodoAdmin)