from django.contrib import admin
from app.models import Account, AccountingRecord, AccountingRecordBase

admin.site.register(Account)
admin.site.register(AccountingRecord)
admin.site.register(AccountingRecordBase)
