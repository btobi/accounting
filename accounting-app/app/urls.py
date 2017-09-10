from . import statistics

from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^accounts/$', views.Accounts.as_view()),
    url(r'^account/$', views.AccountView.as_view()),
    url(r'^accounting/records/$', views.AccountingRecords.as_view()),
    url(r'^accounting/record/$', views.AccountingRecordView.as_view()),
    url(r'^statistics/accounts/$', statistics.AccountsView.as_view())
]
