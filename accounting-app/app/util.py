import datetime
from functools import reduce

from dateutil.relativedelta import relativedelta


def get_month_range(request):
    year = get_param(request, 'year', datetime.datetime.now().year)
    month = get_param(request, 'month', datetime.datetime.now().month)

    get_next = get_param(request, 'next', False)
    get_previous = get_param(request, 'previous', False)

    start = datetime.date(year, month, 1)

    if get_next:
        start = start + relativedelta(months=1)
    if get_previous:
        start = start - relativedelta(months=1)

    end = start + relativedelta(months=1)

    return start, end


def get_param(request, param, optional):
    return request.data[param] if param in request.data and request.data[param] is not None else optional


def get_sum(entries):
    return 0 if len(entries) == 0 else reduce(lambda x, y: x + y, [x.amount for x in entries])


def get_id(request):
    return request.data['id'] if 'id' in request.data else None