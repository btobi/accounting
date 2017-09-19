from rest_framework.response import Response
from rest_framework.views import APIView
from app.demo import demo


class DemoData(APIView):
    def get(self, request):
        demo.make_demo_data()
        return Response("finish")

