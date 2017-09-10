from django.db import models
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

    def get_records(self, start, end):
        debit_entries = self.records_debit.filter(date__range=[start, end])
        credit_entries = self.records_credit.filter(date__range=[start, end])
        return debit_entries, credit_entries


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
    record = models.ForeignKey(AccountingRecord)
    amount = models.FloatField()
    date = models.DateField()
    comment = models.CharField(max_length=200)
    person = models.CharField(max_length=100, null=True, default=None, blank=True)
    isDebit = models.BooleanField()
    isCredit = models.BooleanField()
    account = models.ForeignKey(Account, related_name="record_base_account")
    counterAccount = models.ForeignKey(Account, related_name="record_base_counteraccount")
