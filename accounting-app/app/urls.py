from django.conf.urls import url

from app.views import accounts, records, demo
from app.views.statistics.accounts import AccountsView
from app.views.statistics.spreadsheet import Spreadsheet
from app.views.statistics.third import ThirdParties

urlpatterns = [
    url(r'^accounts/$', accounts.Accounts.as_view()),
    url(r'^account/$', accounts.AccountView.as_view()),
    url(r'^accounting/records/$', records.AccountingRecords.as_view()),
    url(r'^accounting/record/$', records.AccountingRecordView.as_view()),
    url(r'^statistics/accounts/$', AccountsView.as_view()),
    url(r'^statistics/spreadsheet/$', Spreadsheet.as_view()),
    url(r'^statistics/third/$', ThirdParties.as_view()),

    url(r'^demodata/$', demo.DemoData.as_view())
]
