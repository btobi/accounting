from django.contrib import admin
from .models import Stock, Account, AccountingRecord

admin.site.register(Account)
admin.site.register(AccountingRecord)
