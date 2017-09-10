from rest_framework.response import Response
from rest_framework.views import APIView

from app import util
from app.models import AccountingRecord
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
    def post(self, request):
        record, created = AccountingRecord.objects.update_or_create(id=util.get_id(request), defaults=request.data)
        return Response()

    def delete(self, request):
        AccountingRecord.objects.get(pk=get_id(request)).delete()
        return Response()
