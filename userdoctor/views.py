from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, get_user_model
from .models import Patient, Appointment, Diagnosis, FaceImage,UploadedImage
from .serializers import (
    DoctorRegisterSerializer, DoctorProfileSerializer, PatientSerializer, 
    PatientUserRegisterSerializer, AppointmentSerializer, DiagnosisSerializer, FaceImageSerializer,UploadedImageSerializer
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

class ImageUploadView(generics.CreateAPIView):
    queryset = UploadedImage.objects.all()
    serializer_class = UploadedImageSerializer
    parser_classes = [MultiPartParser, FormParser] # สำคัญมากสำหรับรับไฟล์


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
@api_view(['POST'])
def validate_register_code(request):
    """
    API สำหรับตรวจสอบว่า register_code ถูกต้องและยังไม่ถูกใช้งานหรือไม่
    """
    code = request.data.get('register_code', '')
    if not code:
        return Response({'error': 'กรุณากรอกรหัส'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # ตรวจสอบว่ามี Patient ที่ใช้รหัสนี้และยังไม่มี user หรือไม่
        Patient.objects.get(register_code=code, user__isnull=True)
        return Response({'valid': True, 'message': 'รหัสถูกต้อง'}, status=status.HTTP_200_OK)
    except Patient.DoesNotExist:
        return Response({'valid': False, 'message': 'รหัสไม่ถูกต้อง หรือถูกใช้งานไปแล้ว'}, status=status.HTTP_404_NOT_FOUND)

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