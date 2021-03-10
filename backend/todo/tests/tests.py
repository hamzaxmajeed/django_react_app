from django.test import TestCase
from backend.todo.models import Todo
# from django.core.urlresolvers import reverse
from django.utils import timezone

# Models test
class TodoModelTest(TestCase):

    def create_tasks(self, title="Test task", description="Testing the description", completed="false"):
        return Todo.objects.create(title=title, description=description, completed=completed, created_at=timezone.now())

    def test_tasks_creation(self):
        w = self.create_tasks()
        self.assertTrue(isinstance(w, Todo))
        self.assertEqual(w.__unicode__(), w.title)

        # def test_tasks_list_view(self):
        # w = self.create_tasks()
        # url = reverse("task.views.tasks")
        # resp = self.client.get(url)

        # self.assertEqual(resp.status_code, 200)
        # self.assertIn(w.title, resp.content)