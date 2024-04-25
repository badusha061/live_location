from rest_framework.serializers import ModelSerializer
from user_auth.models import  UserModels

class UserModelsSerializer(ModelSerializer):
    class Meta:
        model = UserModels
        fields = (
            "id",
            "username",
            "phone_number",
            "location",
        )
        read_only_fields = ["id"]
    

class UserDetailsModelsSerializer(ModelSerializer):
    class Meta:
        model = UserModels
        fields = (
            "id",
            "username",
            "phone_number",
            "location",
            "live_location"
        )
        read_only_fields = ["id"]





