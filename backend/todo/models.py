from django.db import models

class Todo(models.Model):
    """
    Models created for the database.
    """
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=500)
    # Completed property is the status of the task, and we will set the default to False.
    completed = models.BooleanField(default=False)

    def __str__(self):
        """
        Lets Django know what to print from the instance of the Todo model.
        """
        return self.title