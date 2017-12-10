from django.forms import ModelForm

from app.models import AccountingRecord, Account


class RecordForm(ModelForm):
    class Meta:
        model = AccountingRecord
        exclude = []


class AccountForm(ModelForm):
    class Meta:
        model = Account
        exclude = []
