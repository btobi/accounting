from rest_framework import serializers

from .models import Stock, Account, AccountingRecord


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'
        # fields = ('ticker', 'volume')


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'


class AccountingRecordSerializer(serializers.ModelSerializer):

    debit = AccountSerializer(many=False)
    credit = AccountSerializer(many=False)

    class Meta:
        model = AccountingRecord
        fields = '__all__'
