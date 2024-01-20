from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("User name already exists")
        return value  

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email address already exists")
        return value
    
    def validate_password(self, value):
        min_length = 6
        if len(value) < min_length:
            raise serializers.ValidationError("Password should be atleast {min_length} characters long")
        return value
     
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer): 
    email = serializers.CharField(required=True)
    password = serializers.CharField(required =True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email is None:
             raise serializers.ValidationError("Both email and password are required")
        if password is None:
             raise serializers.ValidationError("Both email and password are required")
        
        return data