from django.db import transaction
from rest_framework.response import Response
from rest_framework.views import APIView

from app import util
from app.models import AccountingRecord, AccountingRecordBase
from app.views.serializers import AccountingRecordSerializer


class AccountingRecords(APIView):
    def post(self, request):
        start, end = util.get_month_range(request)

        query = AccountingRecord.objects.filter(date__range=[start, end]).order_by("-date", "-id").all()
        data = AccountingRecordSerializer(query, many=True).data

        return Response({
            'start': start,
            'end': end,
            'month': start.month,
            'year': start.year,
            'data': data,
        })


class AccountingRecordView(APIView):
    @transaction.atomic
    def post(self, request):
        record, created = AccountingRecord.objects.update_or_create(id=util.get_id(request), defaults=request.data)
        record.record_base.all().delete()

        base_debit, base_credit = convert_record(record)
        base_debit.save()
        base_credit.save()

        return Response()

    def delete(self, request):
        AccountingRecord.objects.get(pk=util.get_id(request)).delete()
        return Response()


def convert_record(record):
    debit = convert_record_commons(record, True)
    credit = convert_record_commons(record, False)

    return debit, credit


def convert_record_commons(record, is_debit):
    base = AccountingRecordBase()
    base.record = record
    base.date = record.date
    base.comment = record.comment
    base.person = record.person

    base.isDebit = is_debit
    base.isCredit = not is_debit

    base.account = record.debit if is_debit else record.credit
    base.counterAccount = record.debit if not is_debit else record.credit

    base.amount = convert_record_amount(record.amount, is_debit, base.account.type)

    return base


def convert_record_amount(amount, is_debit, account_type):
    amount = float(amount)
    if is_debit:
        if account_type in ['LI', 'RE']:
            return -1 * amount
        return amount
    if account_type in ['LI', 'RE']:
        return amount
    return -1 * amount
