from django.conf.urls import url

from app import views

urlpatterns = [
    url(r'^stocks/$', views.StockList.as_view())
]
