from django.db import models


class Stock(models.Model):
    ticker = models.CharField(max_length=10)
    open = models.FloatField()
    close = models.FloatField()
    volume = models.IntegerField()

    def __str__(self):
        return self.ticker


accountTypes = (
    ("EX", "EXPENSES"),
    ("RE", "REVENUE"),
    ("AS", "ASSET"),
    ("LI", "LIABILITY"),
)


class Account(models.Model):
    number = models.PositiveIntegerField()
    name = models.CharField(max_length=20)
    type = models.CharField(max_length=2, choices=accountTypes)

    def __str__(self):
        return "[ {} | {} ] {}".format(self.number, self.type, self.name)
