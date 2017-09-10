from functools import reduce
from itertools import chain

from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView


import app.util
from app import util
from app.models import Account, AccountingRecordBase

from app.views.serializers import AccountSerializer, AccountingRecordSerializer, AccountingRecordBaseSerializer


class AccountsView(APIView):
    def post(self, request):
        start, end = util.get_month_range(request)

        accounts = Account.objects.all()
        response = []

        for account in accounts:

            records = AccountingRecordBase.objects.filter(Q(account=account))\
                .filter(date__range=[start, end]).order_by("-date").all()

            records_until_now = AccountingRecordBase.objects.filter(Q(account=account))\
                .filter(date__lt=end).order_by("-date").all()

            total = util.get_sum(records_until_now)

            response.append({
                'total': total,
                'account': AccountSerializer(account).data,
                'records': AccountingRecordBaseSerializer(records, many=True).data
            })

        return Response(response)

