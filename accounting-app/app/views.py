import datetime

from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Stock, Account, AccountingRecord
from .serializers import StockSerializer, AccountSerializer, AccountingRecordSerializer

from dateutil.relativedelta import relativedelta


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


class AccountView(APIView):
    def post(self, request):
        account, created = Account.objects.update_or_create(number=request.data['number'], defaults=request.data)
        return Response()


class AccountingRecords(APIView):
    def post(self, request):
        year = get_param(request, 'year', datetime.datetime.now().year)
        month = get_param(request, 'month', datetime.datetime.now().month)

        get_next = get_param(request, 'next', False);
        get_previous = get_param(request, 'previous', False)

        start = datetime.date(year, month, 1)

        if get_next:
            start = start + relativedelta(months=1)

        if get_previous:
            start = start - relativedelta(months=1)

        end = start + relativedelta(months=1)

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
        record, created = AccountingRecord.objects.update_or_create(id=get_id(request), defaults=request.data)
        return Response()

    def delete(self, request):
        AccountingRecord.objects.get(pk=get_id(request)).delete()
        return Response()


def get_id(request):
    return request.data['id'] if 'id' in request.data else None


def get_param(request, param, optional):
    return request.data[param] if param in request.data else optional

# def pages(request, query_set):
#     page = request.data.page
#     paginator = Paginator(query_set, 30)
#
#     try:
#         pageList = paginator.page(page)
#     except PageNotAnInteger:
#         # If page is not an integer, deliver first page.
#         pageList = paginator.page(1)
#     except EmptyPage:
#         # If page is out of range (e.g. 9999), deliver last page of results.
#         pageList = paginator.page(paginator.num_pages)
#
#     return pageList
