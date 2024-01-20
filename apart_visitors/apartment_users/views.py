from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from . import serializers

# Create your views here.
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_user(request):
    loginSerializer = serializers.LoginSerializer(data=request.data)
    if loginSerializer.is_valid():
        email = loginSerializer.validated_data.get('email')
        password = request.data.get('password')
        try:
            user = User.objects.get(email=email)
            user = authenticate(username=user.username, password=password)
            if user is not None:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({
                    'auth_token': token.key
                })
            else:
                raise Exception('Invalid Credentials')

        except Exception as e:
            print("An error occurred:", str(e))
            return Response({
                'status': '01',
                'message': 'Invalid credentials'
            })    
        
    else:
        return Response({
            'status': '01',
            'message': 'invalid request',
            'data': loginSerializer.errors
        })

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def create_user(request):
    serializer = serializers.UserSerializer(data=request.data)
    if serializer.is_valid():
        try:
            user = User.objects.create_user(
                username=serializer.validated_data.get('username'),
                email=serializer.validated_data.get('email'),
                password=serializer.validated_data.get('password'),
            )
            return Response({
                        'status': '00',
                        'message': 'User registered'
                    })
        except Exception as e:
            print("an exception", str(e))
    else:
        return Response({
            "status": '01',
            "message": "Error creating user",
            "errors": serializer.errors
        })