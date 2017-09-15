from django.contrib import admin
from app.models import Account, AccountingRecord, AccountingRecordBase, Setting

admin.site.register(Account)
admin.site.register(AccountingRecord)
admin.site.register(AccountingRecordBase)
admin.site.register(Setting)
