from django.db.models import Q
from rest_framework.response import Response
from rest_framework.views import APIView

from app import util
from app.models import Account, AccountingRecordBase
from app.views.serializers import AccountSerializer, AccountingRecordBaseSerializer


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

            if account.type in ["AS", "LI"]:
                total = util.get_sum(records_until_now)
            else:
                total = util.get_sum(records)

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