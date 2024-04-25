from django.db import models
from django.core.validators import RegexValidator   
from django.contrib.auth.models import User , AbstractUser

# Create your models here.


phone_regex = RegexValidator(
    regex=r"^\d{10}", message="Phone number must be 10 digits only."
)



class UserModels(AbstractUser):
    phone_number = models.CharField(
        max_length=50,
        blank = True,
        null = True,
        unique = True,
        validators = [phone_regex]
        )
    location = models.CharField(max_length=150,null = True)
    otp = models.CharField( max_length=6 , null = True)
    live_location = models.CharField( max_length=150,null=True)


