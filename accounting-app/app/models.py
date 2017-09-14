from django.db import models
from django_pandas.managers import DataFrameManager

import app.util as util

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
    iban = models.CharField(max_length=28, null=True, default=None, blank=True)

    def __str__(self):
        return "[ {} | {} ] {}".format(self.number, self.type, self.name)

    def get_total_until(self, date):
        debit_entries = self.records_debit.filter(date__lt=date)
        credit_entries = self.records_credit.filter(date__lt=date)
        debit_sum = util.get_sum(debit_entries)
        credit_sum = util.get_sum(credit_entries)

        if self.type in ["LI", "RE"]:
            return debit_sum - credit_sum
        return credit_sum - debit_sum


class AccountingRecord(models.Model):
    debit = models.ForeignKey(Account, null=False, blank=False, related_name="records_debit")
    credit = models.ForeignKey(Account, null=False, blank=False, related_name="records_credit")
    amount = models.FloatField()
    date = models.DateField()
    comment = models.CharField(max_length=200)
    person = models.CharField(max_length=100, null=True, default=None, blank=True)

    def __str__(self):
        return "[{}] {} => {} || {}  \"{}\"".format(self.date, self.debit, self.credit, self.amount, self.comment)


class AccountingRecordBase(models.Model):
    record = models.ForeignKey(AccountingRecord, related_name="record_base", on_delete=models.CASCADE)
    amount = models.FloatField()
    date = models.DateField()
    comment = models.CharField(max_length=200)
    person = models.CharField(max_length=100, null=True, default=None, blank=True)
    account = models.ForeignKey(Account, related_name="record_base_account")
    counterAccount = models.ForeignKey(Account, related_name="record_base_counteraccount")
    isDebit = models.BooleanField()
    isCredit = models.BooleanField()

    @property
    def month(self):
        return self.date.month

    @property
    def year(self):
        return self.date.year

    @property
    def monthyear(self):
        return str(self.date.month) + " / " + str(self.date.year)

    @property
    def accountName(self):
        return self.account.name

    @property
    def accountType(self):
        return self.account.type

    @property
    def accountNumber(self):
        return self.account.number

    @property
    def accountId(self):
        return self.account.id


    objects = DataFrameManager()
