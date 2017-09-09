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

    debit = AccountSerializer(many=False, read_only=True)
    credit = AccountSerializer(many=False, read_only=True)

    debit_id = serializers.PrimaryKeyRelatedField(many=False, queryset=Account.objects.all(), source='debit')
    credit_id = serializers.PrimaryKeyRelatedField(many=False, queryset=Account.objects.all(), source='credit')

    class Meta:
        model = AccountingRecord
        fields = '__all__'
