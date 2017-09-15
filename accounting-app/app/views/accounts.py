from rest_framework.response import Response
from rest_framework.views import APIView

from app.models import Account, Setting
from app.views.serializers import AccountSerializer


class Accounts(APIView):
    def get(self, request):
        setting = Setting.objects.get(key="showOpenings")
        if setting and setting.value == "True":
            types = ["AS", "LI", "RE", "EX", "OP"]
        else:
            types = ["AS", "LI", "RE", "EX"]
        data = AccountSerializer(Account.objects.filter(type__in=types).all(), many=True).data
        return Response(data)


class AccountView(APIView):
    def post(self, request):
        account, created = Account.objects.update_or_create(number=request.data['number'], defaults=request.data)
        return Response()
