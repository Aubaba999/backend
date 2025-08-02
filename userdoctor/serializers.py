from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import Patient, Appointment, Diagnosis, FaceImage
User = get_user_model()
Doctor = get_user_model() # ใช้วิธีนี้เพื่อเรียก Custom User Model

class DoctorRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Doctor
        fields = [
            'username', 'email', 'password', 'confirm_password',
            'full_name', 'license_number', 'hospital', 'national_id', 'hospital_email', 'phone'
        ]

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = Doctor.objects.create_user(**validated_data)
        user.is_doctor = True
        user.save()
        return user

class DoctorProfileSerializer(serializers.ModelSerializer):
    """Serializer สำหรับแสดงข้อมูลโปรไฟล์หมอ (ไม่รวมรหัสผ่าน)"""
    class Meta:
        model = Doctor
        fields = [
            'id', 'username', 'email', 'full_name', 'license_number', 
            'hospital', 'national_id', 'hospital_email', 'phone'
        ]

class PatientSerializer(serializers.ModelSerializer):
    """Serializer หลักสำหรับข้อมูลคนไข้"""
    doctor_name = serializers.CharField(source='doctor.full_name', read_only=True)
    
    class Meta:
        model = Patient
        fields = [
            'id', 'full_name', 'national_id', 'birthdate', 'gender', 'phone', 
            'register_code', 'created_at', 'doctor', 'doctor_name'
        ]
        read_only_fields = ['register_code', 'doctor', 'doctor_name']



# --- Serializers สำหรับส่วนอื่นๆ ---
class FaceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaceImage
        fields = '__all__'
        read_only_fields = ['patient']

class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.full_name', read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ['doctor']

class DiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnosis
        fields = '__all__'
        read_only_fields = ['doctor', 'appointment']
    
class PatientUserRegisterSerializer(serializers.Serializer):
    """
    Serializer สำหรับให้คนไข้ใช้ register_code สร้าง User ของตัวเอง
    โดยใช้ Email เป็น Username และมี Confirm Password
    """
    register_code = serializers.CharField(max_length=5, required=True)
    email = serializers.EmailField(required=True,write_only=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    def validate_register_code(self, value):
        try:
            patient = Patient.objects.get(register_code=value, user__isnull=True)
        except Patient.DoesNotExist:
            raise serializers.ValidationError("รหัสลงทะเบียนไม่ถูกต้อง หรือถูกใช้งานไปแล้ว")
        return value

    def validate(self, attrs):
        # ตรวจสอบว่า password และ confirm_password ตรงกันหรือไม่
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "รหัสผ่านไม่ตรงกัน"})
        return attrs

    def create(self, validated_data):
        # ดึง Patient profile ออกมาก่อน
        patient = Patient.objects.get(register_code=validated_data['register_code'])
        
        # สร้าง User โดยใช้ email เป็น username
        user = User.objects.create_user(
            username=validated_data['email'], # <--- **ใช้ email เป็น username**
            email=validated_data['email'],
            password=validated_data['password']
        )
        user.is_doctor = False
        user.full_name = patient.full_name
        user.save()
        
        # ผูก User ใหม่เข้ากับ Patient profile
        patient.user = user
        patient.save()
        
        return patient