from rest_framework import status
from rest_framework.views import exception_handler

from app.validation.validator import FormInvalidException


def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Now add the HTTP status code to the response.
    if response is not None:
        response.data['status_code'] = response.status_code

    if type(exc) is FormInvalidException:
        response.status_code = status.HTTP_400_BAD_REQUEST
        response.detail = "Formularwerte fehlerhaft."
        response.data['errors'] = exc.errors

    return response