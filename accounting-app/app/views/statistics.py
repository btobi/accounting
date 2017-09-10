from functools import reduce
from itertools import chain

from rest_framework.response import Response
from rest_framework.views import APIView


import app.util

from app.views.serializers import AccountSerializer, AccountingRecordSerializer


class AccountsView(APIView):
    def post(self, request):
        start, end = util.get_month_range(request)

        accounts = Account.objects.all()
        response = []

        for account in accounts:
            records_debit, records_credit = account.get_records(start, end)

            records = records_debit | records_credit
            records = records.order_by("date")

            response.append({
                'total': account.get_total_until(end),
                'account': AccountSerializer(account).data,
                'records': AccountingRecordSerializer(records, many=True).data
            })

        return Response(response)

