import pandas as pd
from pandas import pivot_table
from rest_framework.response import Response
from rest_framework.views import APIView

from app.models import AccountingRecordBase
from app.views.serializers import AccountingRecordBaseSerializer

indices = ['accountType', 'accountName', 'accountId', 'accountNumber']
column_order = [[i for i in range(1, 13)]]


class Spreadsheet(APIView):
    def get(self, request):
        base = AccountingRecordBase.objects.order_by("date").all()

        data = AccountingRecordBaseSerializer(base, many=True).data

        df = pd.DataFrame.from_dict(data)

        table1 = get_table(df, ["AS", "LI"], True)
        table2 = get_table(df, ["EX", "RE"], False)

        table1.reset_index(inplace=True)
        table2.reset_index(inplace=True)

        cols = [i for i in range(1, 13)] + indices

        table = pd.merge(table1, table2, 'outer', on=cols)

        return Response(pd.json.loads(table.to_json(orient='records')))


def get_table(df, cols, cum_sum):
    df = df[df["accountType"].isin(cols)]

    table = pivot_table(df, values='amount', index=indices,
                        columns=['month'], aggfunc=pd.np.sum)

    if cum_sum:
        table = table.cumsum(axis=1)

    table = table.reindex_axis(column_order, axis=1)

    table = table.reindex_axis([["AS", "LI", "RE", "EX"]], axis=0, level=0)

    return table

