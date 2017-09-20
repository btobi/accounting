import datetime

from django.conf import settings

import random
from app.models import Account, AccountingRecord, AccountingRecordBase
import itertools

from dateutil.relativedelta import relativedelta

from app.views.records import convert_record

account_no = itertools.count(1)


def make_demo_data():
    if settings.PROFILE == "production" and settings.PROFILE not in ["local", "develop"]:
        return

    Account.objects.all().delete()
    AccountingRecord.objects.all().delete()
    AccountingRecordBase.objects.all().delete()

    bank1 = get_account("Bankkonto 1", "AS")
    ex1 = get_account("Freizeit", "EX")
    make_records(ex1, bank1, 20, ["Kino", "Freizeit", "Party", "Ausflug"], 10)

    ex2 = get_account("Miete", "EX")
    make_records(ex2, bank1, 1000, ["Miete"], 32)

    ex3 = get_account("Essen", "EX")
    make_records(ex3, bank1, 5, ["Essen"], 1)

    re1 = get_account("Gehalt", "RE")
    make_records(bank1, re1, 2000, ["Gehalt"])

    bank2 = get_account("Sparkonto", "AS")
    make_records(bank2, bank1, 150, ["Sparen"], 32)


def get_account(name, account_type):
    account = Account(number=next(account_no), name=name, type=account_type)
    account.save()
    return account


def make_records(debit, credit, amount, comments, days_avg=0):
    current_year = datetime.datetime.now().year

    now = datetime.date(current_year, 1, 1)
    year_end = now + relativedelta(years=1) - relativedelta(days=1)

    no = 0

    while now < year_end:
        record = AccountingRecord.objects.create(debit=debit, credit=credit, amount=get_random_amount(amount),
                                                 comment=random.choice(comments), date=now)
        debit_r, credit_r = convert_record(record)
        debit_r.save()
        credit_r.save()
        next_days = get_next_day(days_avg) if days_avg > 0 else 32
        now = now + relativedelta(days=next_days)

        no += 1

    print("=============================")
    print("Created Records:")
    print(debit, credit, amount, days_avg)
    print("{} records".format(no))


def get_next_day(avg):
    return max(1, random.gauss(avg, avg / 3))


def get_random_amount(avg):
    # return avg
    return round(max(1, random.gauss(avg, avg / 3)), 2)
