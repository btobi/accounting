from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^stocks/$', views.StockList.as_view()),
    url(r'^accounts/$', views.Accounts.as_view()),
    url(r'^accounting/records$', views.AccountingRecords.as_view())
]
