from django.conf.urls import url

from app.views import accounts, records, statistics, demo

urlpatterns = [
    url(r'^accounts/$', accounts.Accounts.as_view()),
    url(r'^account/$', accounts.AccountView.as_view()),
    url(r'^accounting/records/$', records.AccountingRecords.as_view()),
    url(r'^accounting/record/$', records.AccountingRecordView.as_view()),
    url(r'^statistics/accounts/$', statistics.AccountsView.as_view()),
    url(r'^statistics/spreadsheet/$', statistics.Spreadsheet.as_view()),

    url(r'^demodata/$', demo.DemoData.as_view())
]
