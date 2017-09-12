from functools import reduce
from itertools import chain

import pandas as pd
from django.db.models import Q
from pandas import pivot_table
from rest_framework.response import Response
from rest_framework.views import APIView

import app.util
from app import util
from app.models import Account, AccountingRecordBase

from app.views.serializers import AccountSerializer, AccountingRecordSerializer, AccountingRecordBaseSerializer


class AccountsView(APIView):
    def post(self, request):
        start, end = util.get_month_range(request)

        print(start, end)

        accounts_db = Account.objects.all()
        accounts = []

        for account in accounts_db:
            records = AccountingRecordBase.objects.filter(Q(account=account)) \
                .filter(date__range=[start, end]).order_by("-date").all()

            records_until_now = AccountingRecordBase.objects.filter(Q(account=account)) \
                .filter(date__lt=end).order_by("-date").all()

            total = util.get_sum(records_until_now)

            accounts.append({
                'total': total,
                'account': AccountSerializer(account).data,
                'records': AccountingRecordBaseSerializer(records, many=True).data
            })

        return Response({
            'accounts': accounts,
            'year': start.year,
            'month': start.month
        })


class Spreadsheet(APIView):
    def get(self, request):
        base = AccountingRecordBase.objects.order_by("date").all()

        data = AccountingRecordBaseSerializer(base, many=True).data

        df = pd.DataFrame.from_dict(data)

        column_order = [[i for i in range(1, 13)]]

        table = pivot_table(df, values='amount',
                            index=['accountType', 'accountName', 'accountId', 'accountNumber'], columns=['month'],
                            aggfunc=pd.np.sum).cumsum(axis=1)

        table = table.reindex_axis(column_order, axis=1)

        table = table.reindex_axis([["AS", "LI", "RE", "EX"]], axis=0, level=0)

        return Response(pd.json.loads(table.to_json(orient='split')))
