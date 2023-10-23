from django.db import models

class Data(models.Model):
    data = models.TextField("Data")

    def __str__(self):
        return self.data
