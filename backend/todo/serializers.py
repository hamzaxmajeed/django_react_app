from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    """
    Convert model instances to JSON format, which is needed for data interchange in the web.
    """
    class Meta:
        """
        Class container with some metadata attached to the model.
        """
        model = Todo
        fields = '__all__'
        extra_fields = ['id', 'title', 'description', 'completed']

    def get_field_names(self, declared_fields, info):
        expanded_fields = super(TodoSerializer, self).get_field_names(declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            return expanded_fields + self.Meta.extra_fields
        else:
            return expanded_fields