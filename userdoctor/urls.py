from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # --- Auth ---
    path('register/doctor/', views.DoctorRegisterAPIView.as_view(), name='doctor-register'),
    path('register/patient/', views.PatientUserRegisterAPIView.as_view(), name='patient-user-register'),
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('upload-image/', views.ImageUploadView.as_view(), name='upload-image'),

    # --- Doctor Routes ---
    path('doctor/profile/', views.DoctorProfileView.as_view(), name='doctor-profile'),
    path('doctor/patients/', views.DoctorPatientListCreateView.as_view(), name='doctor-patient-list-create'),
    path('doctor/patients/<int:pk>/', views.DoctorPatientDetailView.as_view(), name='doctor-patient-detail'),
    # เพิ่ม URL สำหรับจัดการ Appointment, Diagnosis ของคนไข้แต่ละคนโดยหมอ
    
    # --- Patient Routes ---
    path('patient/profile/', views.PatientProfileView.as_view(), name='patient-profile'),
    path('patient/appointments/', views.PatientAppointmentListView.as_view(), name='patient-appointments-list'),
    path('validate-code/', views.validate_register_code, name='validate-code'),
    # เพิ่ม URL สำหรับจัดการ FaceImage, ดู Diagnosis ของตัวเอง
]
