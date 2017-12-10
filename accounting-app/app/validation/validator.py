from rest_framework import status
from rest_framework.exceptions import APIException

from rest_framework.views import exception_handler


class FormInvalidException(APIException):
    def __init__(self, errors):
        super(FormInvalidException, self).__init__(detail='Formularwerte fehlerhaft.', code=status.HTTP_400_BAD_REQUEST)
        self.errors = errors


class FormValidator(object):

    def __init__(self, formClass, data):
        self.form = formClass(data)
        self.is_valid = self.form.is_valid()
        self.cleaned_data = self.form.cleaned_data
        self.errors = self.form.errors

    def validate(self):
        if self.is_valid:
            return self.cleaned_data
        raise FormInvalidException(self.errors)



