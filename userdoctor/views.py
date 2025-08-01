from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, get_user_model
from .models import Patient, Appointment, Diagnosis, FaceImage
from .serializers import (
    DoctorRegisterSerializer, DoctorProfileSerializer, PatientSerializer, 
    PatientUserRegisterSerializer, AppointmentSerializer, DiagnosisSerializer, FaceImageSerializer
)

User = get_user_model()

# Custom Permission เพื่อตรวจสอบว่าเป็นหมอหรือไม่
class IsDoctorUser(IsAuthenticated):
    def has_permission(self, request, view):
        return super().has_permission(request, view) and request.user.is_doctor

# -------------------- Authentication Views --------------------

class DoctorRegisterAPIView(generics.CreateAPIView):
    serializer_class = DoctorRegisterSerializer

class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username") # รับได้ทั้ง username หรือ email
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "is_doctor": user.is_doctor,
                "user_id": user.pk,
                "full_name": user.full_name
            })
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
class PatientUserRegisterAPIView(generics.CreateAPIView):
    serializer_class = PatientUserRegisterSerializer


# -------------------- Doctor-Specific Views --------------------

class DoctorProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsDoctorUser]
    serializer_class = DoctorProfileSerializer
    
    def get_object(self):
        return self.request.user

class DoctorPatientListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsDoctorUser]
    serializer_class = PatientSerializer

    def get_queryset(self):
        return Patient.objects.filter(doctor=self.request.user)

    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user) # กำหนดหมอเป็น user ที่ login อยู่

class DoctorPatientDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsDoctorUser]
    serializer_class = PatientSerializer

    def get_queryset(self):
        return Patient.objects.filter(doctor=self.request.user)

# -------------------- Patient-Specific Views --------------------

class PatientProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PatientSerializer

    def get_object(self):
        try:
            # ดึง Patient profile ที่ผูกกับ User ที่ login อยู่
            return Patient.objects.get(user=self.request.user)
        except Patient.DoesNotExist:
            return None # หรือ raise Http404

class PatientAppointmentListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        return Appointment.objects.filter(patient__user=self.request.user)