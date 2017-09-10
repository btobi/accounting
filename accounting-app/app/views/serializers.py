from rest_framework import serializers

from app.models import AccountingRecord, Account


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