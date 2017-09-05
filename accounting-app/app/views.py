from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Stock, Account, AccountingRecord
from .serializers import StockSerializer, AccountSerializer, AccountingRecordSerializer


class StockList(APIView):
    def get(self, request):
        stocks = Stock.objects.all()
        serializer = StockSerializer(stocks, many=True)
        return Response(serializer.data)

    def post(self):
        pass


class Accounts(APIView):
    def get(self, request):
        data = AccountSerializer(Account.objects.all(), many=True).data
        return Response(data)


class AccountingRecords(APIView):
    def get(self, request):
        data = AccountingRecordSerializer(AccountingRecord.objects.all(), many=True).data
        return Response(data)
