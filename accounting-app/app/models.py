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
    number = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=20)
    type = models.CharField(max_length=2, choices=accountTypes)

    def __str__(self):
        return "[ {} | {} ] {}".format(self.number, self.type, self.name)


class AccountingRecord(models.Model):
    debit = models.ForeignKey(Account, on_delete=models.DO_NOTHING, null=False, blank=False, related_name="%(class)s_debit")
    credit = models.ForeignKey(Account, on_delete=models.DO_NOTHING, null=False, blank=False, related_name="%(class)s_credit")
    amount = models.FloatField()
    date = models.DateField()
    comment = models.CharField(max_length=200)
    person = models.CharField(max_length=100, null=True, default=None, blank=True)

    def __str__(self):
        return "[{}] {} => {} || {}  \"{}\"".format(self.date, self.debit, self.credit, self.amount, self.comment)
