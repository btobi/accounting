from rest_framework.response import Response
from rest_framework.views import APIView

from app.models import Account
from app.views.serializers import AccountSerializer


class Accounts(APIView):
    def get(self, request):
        data = AccountSerializer(Account.objects.all(), many=True).data
        return Response(data)


class AccountView(APIView):
    def post(self, request):
        account, created = Account.objects.update_or_create(number=request.data['number'], defaults=request.data)
        return Response()
