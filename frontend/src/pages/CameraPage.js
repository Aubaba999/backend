import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import "./CameraPage.css";

// Import Components
import ProgressIndicator from "../components/ProgressIndicator";
import SessionCompleteOverlay from "../components/SessionCompleteOverlay";
import BackButton from "../components/BackButton";
import LightingIndicator from "../components/LightingIndicator";
import ScanFrame from "../components/ScanFrame";
import CameraStatus from "../components/CameraStatus";
import LoadingIndicator from "../components/LoadingIndicator";

function CameraPage({ setCurrentPage, currentUser, onSessionComplete }) {
  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const stableTimeoutRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  // State
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [stream, setStream] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [direction, setDirection] = useState("");
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [faceInFrame, setFaceInFrame] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lightingCondition, setLightingCondition] = useState("good");
  const [autoCapture, setAutoCapture] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCapturedImage, setShowCapturedImage] = useState(false);
  const [isCountingStable, setIsCountingStable] = useState(false);
  const [currentPose, setCurrentPose] = useState(0);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [nosePosition, setNosePosition] = useState({ x: 0, y: 0 });
  const [isNoseOnTarget, setIsNoseOnTarget] = useState(false);
  const [isPoseCorrect, setIsPoseCorrect] = useState(false);

  // Constants
  const [poseInstructions] = useState([
    "กรุณาหันหน้าตรง",
    "กรุณาหันหน้าไปทางซ้าย",
    "กรุณาหันหน้าไปทางขวา",
  ]);

  const [targetPositions] = useState([
    { x: 0.5, y: 0.5, label: "จมูกที่กึ่งกลาง" },
    { x: 0.35, y: 0.5, label: "หันซ้าย - จมูกไปทางซ้าย" },
    { x: 0.65, y: 0.5, label: "หันขวา - จมูกไปทางขวา" },
  ]);

  // Functions
  const checkNoseOnTarget = (nosePos, targetPos, videoWidth, videoHeight) => {
    const targetX = targetPos.x * videoWidth;
    const targetY = targetPos.y * videoHeight;
    const mirroredNoseX = videoWidth - nosePos.x;
    const distance = Math.sqrt(
      Math.pow(mirroredNoseX - targetX, 2) + Math.pow(nosePos.y - targetY, 2)
    );
    const tolerance = 150;
    return distance <= tolerance;
  };

  const detectFacePose = (landmarks) => {
    if (!landmarks || !landmarks.positions) return "unknown";
    try {
      const positions = landmarks.positions;
      const nose = positions[30];
      const leftEye = positions[36];
      const rightEye = positions[45];
      const eyeCenter = {
        x: (leftEye.x + rightEye.x) / 2,
        y: (leftEye.y + rightEye.y) / 2,
      };
      const eyeDistance = Math.abs(rightEye.x - leftEye.x);
      const noseOffsetRatio = (nose.x - eyeCenter.x) / eyeDistance;

      const frontThreshold = 0.13;
      if (Math.abs(noseOffsetRatio) < frontThreshold) {
        return "front";
      } else if (noseOffsetRatio > frontThreshold) {
        return "left";
      } else {
        return "right";
      }
    } catch (error) {
      console.error("Error detecting face pose:", error);
      return "unknown";
    }
  };

  const isPoseCorrectChecker = (detectedPose, requiredPose) => {
    const poseMap = {
      0: "front",
      1: "left",
      2: "right",
    };
    return detectedPose === poseMap[requiredPose];
  };

  const processFaceDetections = (detections, displaySize) => {
    if (detections.length > 0) {
      setFaceDetected(true);
      const detection = detections[0];
      const nose = detection.landmarks.positions[30];
      setNosePosition({ x: nose.x, y: nose.y });

      const currentTarget = targetPositions[currentPose];
      const noseOnTarget = checkNoseOnTarget(
        { x: nose.x, y: nose.y },
        currentTarget,
        displaySize.width,
        displaySize.height
      );
      setIsNoseOnTarget(noseOnTarget);

      const detectedPose = detectFacePose(detection.landmarks);
      const poseCorrect = isPoseCorrectChecker(detectedPose, currentPose);
      setIsPoseCorrect(poseCorrect);

      let newDirection = "";
      let finalInFrame = false;

      if (lightingCondition !== "good") {
        newDirection = "กรุณาไปยังบริเวณที่มีแสงสว่างพอดี";
        finalInFrame = false;
      } else {
        if (currentPose === 0) {
          if (!noseOnTarget) {
            newDirection = "กรุณาเลื่อนใบหน้าเพื่อนำจมูกไปแตะจุดแดง";
          } else if (!poseCorrect) {
            newDirection = `${poseInstructions[currentPose]}`;
          } else {
            newDirection = "ตำแหน่งดี! พร้อมถ่ายภาพ";
            finalInFrame = true;
          }
        } else {
          if (poseCorrect) {
            newDirection = "ตำแหน่งดี! พร้อมถ่ายภาพ";
            finalInFrame = true;
          } else {
            if (!noseOnTarget) {
              newDirection = `กรุณาเลื่อนใบหน้าไปที่เป้า แล้ว${poseInstructions[
                currentPose
              ].toLowerCase()}`;
            } else {
              newDirection = `${poseInstructions[currentPose]}`;
            }
          }
        }
      }

      setDirection(newDirection);
      setFaceInFrame(finalInFrame);
    } else {
      setFaceDetected(false);
      setDirection("กรุณาเอาใบหน้าเข้าในกรอบ");
      setFaceInFrame(false);
      setIsNoseOnTarget(false);
      setIsPoseCorrect(false);
    }
  };

  const detectLighting = (video) => {
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      return "good";
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let totalBrightness = 0;
    let pixelCount = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
      totalBrightness += brightness;
      pixelCount++;
    }
    const avgBrightness = totalBrightness / pixelCount;
    if (avgBrightness < 40) return "low";
    if (avgBrightness > 200) return "high";
    return "good";
  };

  const startCamera = async () => {
    if (stream) return;
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        setStream(newStream);
        videoRef.current.onloadedmetadata = () => {
          setIsCameraOn(true);
          if (canvasRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
          }
        };
      }
    } catch (err) {
      console.error("ไม่สามารถเปิดกล้องได้:", err);
      alert("ไม่สามารถเปิดกล้องได้");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
      setIsCameraOn(false);
      setFaceDetected(false);
      setFaceInFrame(false);
      cancelCountdown();
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current || isCapturing) return;
    setIsCapturing(true);
    cancelCountdown();

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.scale(-1, 1);
    context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL("image/jpeg", 0.8);
    const newImage = {
      id: currentPose,
      pose: poseInstructions[currentPose],
      image: imageDataURL,
      timestamp: Date.now(),
    };

    setCapturedImages((prev) => {
      const filtered = prev.filter((img) => img.id !== currentPose);
      return [...filtered, newImage];
    });

    setCapturedImage(imageDataURL);
    setShowCapturedImage(true);
    
    console.log(
      `Captured image for pose ${currentPose}: ${poseInstructions[currentPose]}`
    );

    setTimeout(() => {
      setShowCapturedImage(false);
      setCapturedImage(null);

      if (currentPose < poseInstructions.length - 1) {
        const nextPose = currentPose + 1;
        setCurrentPose(nextPose);
        resetStatesForNextPose();
      } else {
        console.log("All poses completed, showing session complete");
        setIsSessionComplete(true);
      }
      setIsCapturing(false);
    }, 1500);
  };

  const resetStatesForNextPose = () => {
    setFaceInFrame(false);
    setIsCountingStable(false);
    setAutoCapture(false);
    setCountdown(0);
    setIsCapturing(false);
    setIsNoseOnTarget(false);
    setIsPoseCorrect(false);
    cancelCountdown();
  };

  const resetSession = () => {
    setCurrentPose(0);
    setCapturedImages([]);
    setIsSessionComplete(false);
    setCapturedImage(null);
    setShowCapturedImage(false);
    setIsCapturing(false);
    resetStatesForNextPose();
    startCamera();
  };

  const cancelCountdown = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
    if (stableTimeoutRef.current) {
      clearTimeout(stableTimeoutRef.current);
      stableTimeoutRef.current = null;
    }
    setAutoCapture(false);
    setCountdown(0);
    setIsCountingStable(false);
  };

  const startCountdown = () => {
    if (isCapturing) return;
    cancelCountdown();
    setCountdown(3);
    setAutoCapture(true);
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
          setAutoCapture(false);
          captureImage();
          return 0;
        }
        return prev - 1;
      });
    }, 600);
  };

  const goHome = () => {
    stopCamera();
    onSessionComplete(capturedImages);
  };

  // Effects
  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsLoading(true);
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        setIsModelLoaded(true);
      } catch (error) {
        console.error("Error loading models:", error);
        alert("ไม่สามารถโหลด Face Detection Models ได้");
      } finally {
        setIsLoading(false);
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
    };
    const handleBeforeUnload = () => {
      stopCamera();
    };
    const handlePageHide = () => {
      stopCamera();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pagehide", handlePageHide);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);

  useEffect(() => {
    const runFaceDetection = async () => {
        if (
            videoRef.current &&
            canvasRef.current &&
            videoRef.current.readyState === 4 &&
            !isCapturing &&
            !showCapturedImage &&
            !isSessionComplete
        ) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const displaySize = {
                width: video.videoWidth,
                height: video.videoHeight,
            };
            faceapi.matchDimensions(canvas, displaySize);
            
            const detections = await faceapi
                .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptors();

            const resizedDetections = faceapi.resizeResults(
                detections,
                displaySize
            );

            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

            setLightingCondition(detectLighting(video));
            processFaceDetections(resizedDetections, displaySize);
        }
        if (!isCapturing && !showCapturedImage && !isSessionComplete && isCameraOn) {
            animationFrameIdRef.current = requestAnimationFrame(runFaceDetection);
        }
    };

    if (isPageVisible && isModelLoaded && !isCapturing && !showCapturedImage && !isSessionComplete) {
      startCamera();
      animationFrameIdRef.current = requestAnimationFrame(runFaceDetection);
    } else {
        stopCamera();
        if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = null;
        }
    }

    return () => {
        if (animationFrameIdRef.current) {
            cancelAnimationFrame(animationFrameIdRef.current);
        }
    };
  }, [isPageVisible, isModelLoaded, isCapturing, showCapturedImage, isSessionComplete, currentPose, lightingCondition, isCameraOn]);
  
  useEffect(() => {
    if (isSessionComplete || isCapturing) return;
    const isReadyForCapture = faceInFrame && lightingCondition === "good";
    if (isReadyForCapture) {
      if (!isCountingStable) {
        setIsCountingStable(true);
        stableTimeoutRef.current = setTimeout(() => {
          const finalCheck =
            faceInFrame &&
            lightingCondition === "good" &&
            !showCapturedImage &&
            !isCapturing &&
            !isSessionComplete;
          if (finalCheck) {
            console.log(
              `Ready to capture pose ${currentPose}: ${poseInstructions[currentPose]}`
            );
            startCountdown();
          }
          setIsCountingStable(false);
        }, 1500);
      }
    } else {
      cancelCountdown();
    }
  }, [
    faceInFrame,
    lightingCondition,
    showCapturedImage,
    isCapturing,
    isSessionComplete,
    currentPose,
  ]);
  
  useEffect(() => {
    return () => {
      stopCamera();
      cancelCountdown();
    };
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="camera-container">
      <BackButton
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
        stopCamera={stopCamera}
      />
      <video ref={videoRef} autoPlay playsInline muted className="camera-video" />
      <canvas ref={canvasRef} className="camera-canvas" />

      {faceDetected && !isSessionComplete && (
        <div
          className="nose-target"
          style={{
            position: "absolute",
            left: `${targetPositions[currentPose].x * 100}%`,
            top: `${targetPositions[currentPose].y * 100}%`,
            transform: "translate(-50%, -50%)",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: isNoseOnTarget
              ? "rgba(0, 255, 0, 0.6)"
              : "rgba(255, 0, 0, 0.6)",
            border: isNoseOnTarget ? "4px solid #00ff00" : "4px solid #ff0000",
            boxShadow: isNoseOnTarget
              ? "0 0 25px rgba(0, 255, 0, 0.8), inset 0 0 15px rgba(0, 255, 0, 0.3)"
              : "0 0 25px rgba(255, 0, 0, 0.8), inset 0 0 15px rgba(255, 0, 0, 0.3)",
            animation: isNoseOnTarget ? "target-success 1s infinite" : "target-pulse 2s infinite",
            zIndex: 50,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#fff",
            textShadow: "0 0 5px rgba(0,0,0,0.8)",
          }}
        >
          {isNoseOnTarget ? "✓" : "👃"}
        </div>
      )}

      {faceDetected && nosePosition.x > 0 && !isSessionComplete && (
        <div
          className="nose-indicator"
          style={{
            position: "absolute",
            left: `${((videoRef.current?.videoWidth || 1) - nosePosition.x) / (videoRef.current?.videoWidth || 1) * 100}%`,
            top: `${(nosePosition.y / (videoRef.current?.videoHeight || 1)) * 100}%`,
            transform: "translate(-50%, -50%)",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "rgba(255, 255, 0, 0.9)",
            border: "2px solid #ffff00",
            boxShadow: "0 0 10px rgba(255, 255, 0, 0.8)",
            zIndex: 60,
            pointerEvents: "none",
            animation: "nose-pulse 1s infinite",
          }}
        />
      )}

      {faceInFrame && !autoCapture && !isSessionComplete && !showCapturedImage && (
        <div className="green-overlay"></div>
      )}

      {autoCapture && countdown > 0 && !isSessionComplete && !showCapturedImage && (
        <div className="countdown-overlay">
          <div className="countdown-number">{countdown}</div>
          <div className="countdown-text">กำลังถ่ายภาพ...</div>
        </div>
      )}

      {isCountingStable && !autoCapture && !isSessionComplete && !showCapturedImage && (
        <div className="preparation-overlay">
          <div className="preparation-text">กำลังเตรียมถ่ายภาพ...</div>
          <div className="preparation-subtext">กรุณาอยู่นิ่งในกรอบ</div>
        </div>
      )}

      {showCapturedImage && capturedImage && (
        <div className="captured-image-overlay">
          <div className="captured-image-container">
            <img
              src={capturedImage}
              alt="Captured"
              className="captured-image"
            />
            <div className="captured-message">📸 ถ่ายภาพสำเร็จ!</div>
          </div>
        </div>
      )}

      <LightingIndicator lightingCondition={lightingCondition} />
      <ScanFrame
        faceInFrame={faceInFrame}
        direction={direction}
        isCountingStable={isCountingStable}
      />
      <CameraStatus isPageVisible={isPageVisible} />

      {!isSessionComplete && (
        <ProgressIndicator
          currentPose={currentPose}
          poseInstructions={poseInstructions}
        />
      )}

      {isSessionComplete && (
        <SessionCompleteOverlay
          capturedImages={capturedImages}
          resetSession={resetSession}
          goHome={goHome}
          poseInstructions={poseInstructions}
        />
      )}
    </div>
  );
}

export default CameraPage;