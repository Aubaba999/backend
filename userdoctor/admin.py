# your_app_name/admin.py
from django.contrib import admin
from .models import Doctor, Patient, Appointment, FaceImage, Diagnosis # ตรวจสอบให้แน่ใจว่า import ถูกต้อง

# ลงทะเบียน Model ของคุณ
admin.site.register(Doctor)
admin.site.register(Patient)
admin.site.register(Appointment)
admin.site.register(FaceImage)
admin.site.register(Diagnosis)

# ตัวอย่างการลงทะเบียนแบบกำหนดค่าเอง (Advanced)
# @admin.register(Doctor)
# class DoctorAdmin(admin.ModelAdmin):
#     list_display = ('username', 'fullName', 'email', 'is_doctor', 'licenseNumber')
#     search_fields = ('username', 'fullName', 'licenseNumber')