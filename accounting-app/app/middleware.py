from django.http import QueryDict, HttpResponseRedirect
from django.urls import reverse
from django.utils.deprecation import MiddlewareMixin

class HttpPostTunnelingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if 'HTTP_X_METHODOVERRIDE' in request.META:
            http_method = request.META['HTTP_X_METHODOVERRIDE']
            if http_method.lower() == 'put':
                request.method = 'PUT'
                request.META['REQUEST_METHOD'] = 'PUT'
                request.PUT = QueryDict(request.body)
            if http_method.lower() == 'delete':
                request.method = 'DELETE'
                request.META['REQUEST_METHOD'] = 'DELETE'
                request.DELETE = QueryDict(request.body)
        return None


class AuthenticationMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        if request.path.startswith(reverse('login')):
            return self.get_response(request)

        if not request.user.is_authenticated():
            print("redirect to login")
            return HttpResponseRedirect(reverse('login'))

        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response