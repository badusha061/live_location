from rest_framework import generics , status , viewsets
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView
import random 
import datetime 
from django.conf import settings
from django.utils import timezone
from rest_framework.decorators import action
from .serializer import * 
from user_auth.utils import send_otp
from user_auth.models import   UserModels
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.core.exceptions import ValidationError
import jwt


class UserViewSet(viewsets.ModelViewSet):
    queryset   = UserModels.objects.all()
    serializer_class = UserModelsSerializer



class Login(APIView):
    def post(self,request):
        number = request.data.get('phone')
        try:
            user_instance = UserModels.objects.get(phone_number = number)
        except Exception as e:
            return Response({"error":"User Does Not exit please Login"},status=status.HTTP_400_BAD_REQUEST)
        

        otp = random.randint(1000,9999)

        user_instance.otp = otp 
        user_instance.save()
        # send_otp(user_instance.phone_number,otp)
  
        return Response({"message":"OTP send Success Fully"},status=HTTP_200_OK)



class VerifyingUserOTP(APIView):
    def post(self,request):
        number = request.data.get('phone_number')
        otp = request.data.get('otp')

        try:
            user_instance = UserModels.objects.get(phone_number = number)
        except ValidationError:
            return Response({"error":"User Not Found"},status=status.HTTP_400_BAD_REQUEST)
        
        if user_instance.otp == otp:
                jwt_payload = {
                    'username': user_instance.username,
                    'phone_number': user_instance.phone_number,
                    'id':user_instance.id,
                    'location':user_instance.location
                }
                jwt_token = jwt.encode(jwt_payload, settings.SECRET_KEY)
                return Response({'token': jwt_token}, status=status.HTTP_200_OK)
        else:
            return Response({"error":"Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
        


class GetUser(generics.RetrieveDestroyAPIView):
    serializer_class = UserDetailsModelsSerializer
    queryset = UserModels.objects.all()