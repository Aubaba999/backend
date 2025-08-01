from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
import random
import string

def generate_register_code():
    """สร้างรหัสลงทะเบียนแบบสุ่มที่ไม่ซ้ำกัน"""
    while True:
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
        if not Patient.objects.filter(register_code=code).exists():
            return code

class Doctor(AbstractUser):
    """Custom User Model สำหรับหมอ"""
    # AbstractUser มี username, email, password, first_name, last_name อยู่แล้ว
    is_doctor = models.BooleanField(default=True)
    full_name = models.CharField(max_length=255, blank=True, null=True) # แนะนำให้ใช้ full_name แทน Name และ fullName
    license_number = models.CharField(max_length=50, unique=True, null=True, blank=True) # <-- เพิ่ม null=True และ blank=True # ควรเป็น unique
    hospital = models.CharField(max_length=255, blank=True, null=True)
    national_id = models.CharField(max_length=13, blank=True, null=True)
    hospital_email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=10, blank=True, null=True)

    def save(self, *args, **kwargs):
        # ทำให้ first_name, last_name, full_name สอดคล้องกัน (ถ้าต้องการ)
        if self.full_name:
            parts = self.full_name.split(' ', 1)
            self.first_name = parts[0]
            self.last_name = parts[1] if len(parts) > 1 else ''
        super().save(*args, **kwargs)


class Patient(models.Model):
    """โมเดลสำหรับคนไข้"""
    # ข้อมูลที่หมอสร้างให้ในตอนแรก
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='patients')
    full_name = models.CharField(max_length=255)
    national_id = models.CharField(max_length=13, unique=True) # ควรเป็น unique
    birthdate = models.DateField()
    gender = models.CharField(max_length=10, choices=[('M', 'ชาย'), ('F', 'หญิง'), ('O', 'อื่นๆ')])
    phone = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # ส่วนที่ใช้สำหรับให้คนไข้ลงทะเบียนเองภายหลัง
    register_code = models.CharField(max_length=5, unique=True, blank=True, default=generate_register_code)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='patient_profile')

    def __str__(self):
        return f"{self.full_name} (HN: {self.id})"

class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='appointments')
    appointment_date = models.DateTimeField()
    note = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Appointment for {self.patient.full_name} on {self.appointment_date.strftime('%d-%m-%Y %H:%M')}"

class Diagnosis(models.Model):
    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE, related_name='diagnosis',null=True)
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='diagnoses')
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Diagnosis for {self.appointment.patient.full_name} on {self.date.strftime('%d-%m-%Y')}"

class FaceImage(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='face_images')
    image = models.ImageField(upload_to='face_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image of {self.patient.full_name}"