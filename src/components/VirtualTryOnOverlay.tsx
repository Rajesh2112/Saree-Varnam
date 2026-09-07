import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Camera, 
  Sparkles, 
  FlipHorizontal, 
  Sliders, 
  Download, 
  RotateCcw, 
  ShieldCheck, 
  X, 
  User, 
  Upload, 
  Check, 
  Eye, 
  Layers, 
  Maximize2, 
  Minimize2,
  AlertCircle,
  Sun,
  VideoOff
} from 'lucide-react';
import { Saree, BlouseOption, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

export type DrapeStyleId = 'nivi' | 'gujarati' | 'bengali' | 'mermaid' | 'madisar';

interface DrapeStyleConfig {
  id: DrapeStyleId;
  name: string;
  regionalTitle: string;
  description: string;
  palluPlacement: 'Left Shoulder (Pleated)' | 'Right Shoulder (Fanned Seedha)' | 'Both Shoulders (Double Wrap)' | 'Contoured Hip & Shoulder' | 'Cross-Chest Temple Drape';
  recommendedFor: string;
}

export const DRAPE_STYLES: DrapeStyleConfig[] = [
  {
    id: 'nivi',
    name: 'Classic Nivi',
    regionalTitle: 'Timeless National Drape',
    description: 'Crisp vertical shoulder pleats cascading down the back with sculpted front waist pleats.',
    palluPlacement: 'Left Shoulder (Pleated)',
    recommendedFor: 'Muhurtham weddings, formal galas, and temple ceremonies'
  },
  {
    id: 'gujarati',
    name: 'Royal Gujarati',
    regionalTitle: 'Seedha Pallu Imperial',
    description: 'Pallu draped from back over the right shoulder and fanned out to display intricate pallu zari motifs.',
    palluPlacement: 'Right Shoulder (Fanned Seedha)',
    recommendedFor: 'Showcasing grand heirloom pallus and heavy zari artwork'
  },
  {
    id: 'bengali',
    name: 'Bengali Athpourey',
    regionalTitle: 'Traditional Box Pleat',
    description: 'Wide box pleats with the ornate pallu wrapped under the left arm and tossed over the left shoulder.',
    palluPlacement: 'Both Shoulders (Double Wrap)',
    recommendedFor: 'Durga Puja, cultural celebrations & royal heritage occasions'
  },
  {
    id: 'mermaid',
    name: 'Modern Mermaid',
    regionalTitle: 'Sculpted Cocktail Drape',
    description: 'Figure-hugging hip contour that flares at the knees with a slim, graceful pallu sweep.',
    palluPlacement: 'Contoured Hip & Shoulder',
    recommendedFor: 'Evening receptions, cocktail dinners & sangeet nights'
  },
  {
    id: 'madisar',
    name: 'South Indian Royal',
    regionalTitle: 'Gopuram Temple Drape',
    description: 'Layered festive bridal drape with rich contrast pleats and architectural border alignment.',
    palluPlacement: 'Cross-Chest Temple Drape',
    recommendedFor: 'Vedic rituals, temple festivals & ancestral weddings'
  }
];

// Fallback studio mannequin/model options if camera is denied or unavailable
const DEMO_STUDIO_MODELS = [
  {
    id: 'model-1',
    name: 'Studio Portrait (Bridal Pose)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'model-2',
    name: 'Heritage Stance (Graceful Front)',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'model-3',
    name: 'Festival Gala (Warm Tone)',
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
  }
];

interface VirtualTryOnOverlayProps {
  saree: Saree;
  currency: Currency;
  selectedBlouse?: BlouseOption;
  selectedContrastColor?: string;
  onClose?: () => void;
  onAddToCart?: () => void;
}

export const VirtualTryOnOverlay: React.FC<VirtualTryOnOverlayProps> = ({
  saree,
  currency,
  selectedBlouse,
  selectedContrastColor = '#ca8a04',
  onClose,
  onAddToCart
}) => {
  const [selectedStyle, setSelectedStyle] = useState<DrapeStyleId>('nivi');
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isMirrored, setIsMirrored] = useState<boolean>(true);
  const [activeStudioModel, setActiveStudioModel] = useState<string>(DEMO_STUDIO_MODELS[0].url);
  const [uploadedUserPhoto, setUploadedUserPhoto] = useState<string | null>(null);
  const [mode, setMode] = useState<'camera' | 'studio'>('camera');
  
  // AR Calibration Adjustments
  const [drapeScale, setDrapeScale] = useState<number>(100); // 80% to 125%
  const [verticalOffset, setVerticalOffset] = useState<number>(0); // -40px to +40px
  const [horizontalOffset, setHorizontalOffset] = useState<number>(0); // -30px to +30px
  const [drapeOpacity, setDrapeOpacity] = useState<number>(92); // 70% to 100%
  const [shimmerEnabled, setShimmerEnabled] = useState<boolean>(true);
  const [showBlouseOverlay, setShowBlouseOverlay] = useState<boolean>(true);
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  const [isCaptured, setIsCaptured] = useState<boolean>(false);
  const [capturedSnapshotUrl, setCapturedSnapshotUrl] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Determine Zari Accent Color based on saree.zariType
  const getZariColors = useCallback(() => {
    switch (saree.zariType) {
      case 'Pure Silver & Gold Zari':
        return {
          primary: '#e6c35c',
          highlight: '#fff2b2',
          shadow: '#8b6914',
          borderStripe: 'url(#goldSilverZariGrad)'
        };
      case 'Resham Antique Thread':
        return {
          primary: '#c98a58',
          highlight: '#ebd1b7',
          shadow: '#7a451d',
          borderStripe: 'url(#antiqueReshamGrad)'
        };
      case 'Antique Copper Zari':
        return {
          primary: '#b8623d',
          highlight: '#e89e7d',
          shadow: '#662a12',
          borderStripe: 'url(#copperZariGrad)'
        };
      default:
        return {
          primary: '#d4af37',
          highlight: '#fff4cc',
          shadow: '#856404',
          borderStripe: 'url(#pureGoldZariGrad)'
        };
    }
  }, [saree.zariType]);

  const zari = getZariColors();

  // Stop camera tracks helper
  const stopCameraStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  // Initialize camera
  const startCamera = useCallback(async () => {
    stopCameraStream();
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported on this device/browser');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 960 }
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraActive(true);
      setMode('camera');
    } catch (err: any) {
      console.warn('Camera access prevented or unavailable:', err);
      const isDenied = err?.name === 'NotAllowedError' || err?.name === 'PermissionDeniedError';
      setCameraError(
        isDenied 
          ? 'Camera permission was denied. You can still test all AR drape styles using our studio models or by uploading your photo below!'
          : 'Unable to start camera stream. Switched to Studio Mannequin Preview.'
      );
      setIsCameraActive(false);
      setMode('studio');
    }
  }, [stopCameraStream]);

  // Handle lifecycle of camera on component mount / unmount
  useEffect(() => {
    startCamera();
    return () => {
      stopCameraStream();
    };
  }, [startCamera, stopCameraStream]);

  // Handle User Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedUserPhoto(event.target.result as string);
          setMode('studio');
          stopCameraStream();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset Calibration to defaults
  const handleResetCalibration = () => {
    setDrapeScale(100);
    setVerticalOffset(0);
    setHorizontalOffset(0);
    setDrapeOpacity(92);
  };

  // Snapshot Capture Feature
  const captureSnapshot = () => {
    if (!containerRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1440;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background fill
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // If in camera mode and video is running
    if (mode === 'camera' && videoRef.current && isCameraActive) {
      ctx.save();
      if (isMirrored) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      // Draw video preserving aspect
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    } else {
      // Draw studio model or uploaded image
      const bgImg = new Image();
      bgImg.crossOrigin = 'anonymous';
      bgImg.src = uploadedUserPhoto || activeStudioModel;
      bgImg.onload = () => {
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        renderOverlayAndFinish(ctx, canvas);
      };
      return;
    }

    renderOverlayAndFinish(ctx, canvas);
  };

  const renderOverlayAndFinish = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Watermark & branding card
    ctx.save();
    
    // Bottom vignette overlay
    const gradient = ctx.createLinearGradient(0, canvas.height - 280, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(0.5, 'rgba(0,0,0,0.85)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.98)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, canvas.height - 280, canvas.width, 280);

    // Brand Name
    ctx.fillStyle = '#c5a059';
    ctx.font = 'bold 36px serif';
    ctx.fillText('VARNAM', 50, canvas.height - 180);

    ctx.fillStyle = '#ffffff';
    ctx.font = '28px sans-serif';
    ctx.fillText(saree.name, 50, canvas.height - 130);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '20px sans-serif';
    const activeStyleObj = DRAPE_STYLES.find(d => d.id === selectedStyle);
    ctx.fillText(
      `AR Drape: ${activeStyleObj?.name} • ${saree.fabric} • Silk Mark Certified`,
      50,
      canvas.height - 90
    );

    // Top Right Stamp
    ctx.fillStyle = 'rgba(10, 10, 10, 0.75)';
    ctx.strokeStyle = '#c5a059';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(canvas.width - 290, 40, 240, 60, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('✨ VIRTUAL TRY-ON', canvas.width - 270, 78);

    ctx.restore();

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setCapturedSnapshotUrl(dataUrl);
    setIsCaptured(true);
  };

  const currentDrape = DRAPE_STYLES.find(s => s.id === selectedStyle) || DRAPE_STYLES[0];

  return (
    <div 
      ref={containerRef}
      id="virtual-try-on-container"
      className={`relative w-full rounded-2xl overflow-hidden bg-[#0d0d0d] border border-[#262626] shadow-2xl flex flex-col select-none transition-all ${
        isFullscreen ? 'fixed inset-2 sm:inset-6 z-50 max-w-6xl mx-auto my-auto' : 'aspect-[3/4] sm:aspect-auto sm:min-h-[580px]'
      }`}
    >
      {/* Top Studio Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#262626] z-30 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#c5a059] animate-pulse" />
          <span className="text-[11px] font-bold text-white uppercase tracking-[0.18em] flex items-center gap-1.5 font-mono">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            AR Virtual Try-On Studio
          </span>
          <span className="hidden md:inline-block text-[10px] text-[#71717a] font-light">
            • Real-time Drape Visualizer
          </span>
        </div>

        {/* Mode Switcher & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mode Pill (Live Camera vs Studio Mannequin) */}
          <div className="flex items-center bg-[#171717] rounded-lg p-0.5 border border-[#2b2b2b] text-[10px]">
            <button
              type="button"
              onClick={() => {
                setMode('camera');
                startCamera();
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 cursor-pointer ${
                mode === 'camera' && isCameraActive
                  ? 'bg-[#c5a059] text-black font-bold shadow-xs'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              <Camera className="w-3 h-3" />
              <span>Camera</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('studio');
                stopCameraStream();
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 cursor-pointer ${
                mode === 'studio'
                  ? 'bg-[#c5a059] text-black font-bold shadow-xs'
                  : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              <User className="w-3 h-3" />
              <span>Studio Mannequin</span>
            </button>
          </div>

          {/* Mirror Flip Toggle */}
          {mode === 'camera' && (
            <button
              type="button"
              onClick={() => setIsMirrored(!isMirrored)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isMirrored 
                  ? 'bg-[#1a1710] border-[#c5a059] text-[#c5a059]' 
                  : 'bg-[#171717] border-[#262626] text-[#a1a1aa] hover:text-white'
              }`}
              title="Flip / Mirror Camera"
            >
              <FlipHorizontal className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Calibration Panel Toggle */}
          <button
            type="button"
            onClick={() => setIsCalibrating(!isCalibrating)}
            className={`px-2 py-1 rounded-lg border text-[10px] font-medium flex items-center gap-1 cursor-pointer transition-colors ${
              isCalibrating 
                ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold' 
                : 'bg-[#171717] border-[#262626] text-[#a1a1aa] hover:text-white'
            }`}
            title="Adjust Drape Position & Scale"
          >
            <Sliders className="w-3 h-3" />
            <span className="hidden sm:inline">Calibrate</span>
          </button>

          {/* Fullscreen Expand/Collapse */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-[#171717] border border-[#262626] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
            title={isFullscreen ? "Exit Studio Fullscreen" : "Expand Studio"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Close AR Studio */}
          {onClose && (
            <button
              type="button"
              onClick={() => {
                stopCameraStream();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-[#171717] border border-[#262626] text-[#a1a1aa] hover:text-white hover:bg-red-950/40 hover:border-red-500/40 transition-colors cursor-pointer"
              title="Close Virtual Try-On"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Viewport (Camera/Model Stage + AR Drape SVG Layer) */}
      <div className="relative flex-1 w-full bg-black overflow-hidden flex items-center justify-center min-h-[380px]">
        
        {/* Layer 1: Live Video Camera Feed */}
        {mode === 'camera' && (
          <video
            ref={videoRef}
            playsInline
            muted
            autoPlay
            className={`w-full h-full object-cover transition-all duration-300 ${
              isMirrored ? 'scale-x-[-1]' : ''
            }`}
          />
        )}

        {/* Layer 1 Alternative: Studio Model or Uploaded Photo */}
        {mode === 'studio' && (
          <img
            src={uploadedUserPhoto || activeStudioModel}
            alt="Virtual Try-On Mannequin Pose"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-95"
          />
        )}

        {/* Camera Permission Denied / Error Banner */}
        {cameraError && mode === 'camera' && (
          <div className="absolute inset-x-4 top-4 z-40 p-3 bg-[#1c1208]/95 border border-[#f59e0b]/50 rounded-xl text-xs text-[#fef3c7] flex items-start gap-2.5 backdrop-blur-md shadow-xl animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-white">Camera Preview Notice</p>
              <p className="text-[11px] text-[#fed7aa] mt-0.5">{cameraError}</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode('studio');
                    setCameraError(null);
                  }}
                  className="px-2.5 py-1 bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold rounded text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Use Studio Model
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 bg-[#262626] hover:bg-[#333333] text-white font-medium rounded text-[10px] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Upload className="w-3 h-3" />
                  Upload Photo
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCameraError(null)}
              className="text-[#fef3c7]/60 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Hidden File Input for Custom Photo Upload */}
        <input 
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoUpload}
        />

        {/* Layer 2: Real-Time AR Drape SVG Geometry (Calculated with Fabric, Zari, and Drape Style) */}
        <div 
          className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center transition-all duration-300"
          style={{
            transform: `translate(${horizontalOffset}px, ${verticalOffset}px) scale(${drapeScale / 100})`,
            opacity: drapeOpacity / 100
          }}
        >
          <svg
            viewBox="0 0 800 1000"
            className="w-full h-full object-contain"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Zari Metallic Gradients */}
              <linearGradient id="pureGoldZariGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="25%" stopColor="#fff6b3" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="75%" stopColor="#ffe680" />
                <stop offset="100%" stopColor="#997a15" />
              </linearGradient>

              <linearGradient id="goldSilverZariGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3e8c8" />
                <stop offset="30%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#9ca3af" />
              </linearGradient>

              <linearGradient id="copperZariGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c26d48" />
                <stop offset="40%" stopColor="#f4b193" />
                <stop offset="70%" stopColor="#994825" />
                <stop offset="100%" stopColor="#57220e" />
              </linearGradient>

              <linearGradient id="antiqueReshamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c59b6d" />
                <stop offset="50%" stopColor="#ebd7be" />
                <stop offset="100%" stopColor="#875d32" />
              </linearGradient>

              {/* Dynamic Silk Base Gradient matching the specific saree */}
              <linearGradient id="sareeSilkBase" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor={saree.colorHex} stopOpacity="0.95" />
                <stop offset="45%" stopColor={saree.colorHex} stopOpacity="0.88" />
                <stop offset="80%" stopColor="#121212" stopOpacity="0.85" />
              </linearGradient>

              <linearGradient id="silkSheenOverlay" x1="10%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                <stop offset="30%" stopColor="rgba(255,255,255,0.02)" />
                <stop offset="60%" stopColor={zari.highlight} stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
              </linearGradient>

              {/* Blouse Fabric Gradient */}
              <linearGradient id="blouseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={selectedContrastColor} stopOpacity="0.96" />
                <stop offset="60%" stopColor={selectedContrastColor} stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0d0d0d" stopOpacity="0.9" />
              </linearGradient>

              {/* Shimmer filter */}
              <filter id="zariGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Motif pattern for Pallu / Body */}
              <pattern id="brocadeMotif" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="3.5" fill={zari.primary} opacity="0.65" />
                <path d="M 20 12 L 24 20 L 20 28 L 16 20 Z" fill={zari.primary} opacity="0.45" />
                <circle cx="20" cy="20" r="1.5" fill="#ffffff" opacity="0.8" />
              </pattern>
            </defs>

            {/* Optional Tailored Blouse Overlay */}
            {showBlouseOverlay && (
              <g id="ar-blouse-layer" opacity="0.92">
                {/* Blouse Bodice */}
                <path
                  d="M 330 330 C 350 360, 450 360, 470 330 C 515 375, 525 450, 490 465 C 430 480, 370 480, 310 465 C 275 450, 285 375, 330 330 Z"
                  fill="url(#blouseGrad)"
                  stroke={zari.primary}
                  strokeWidth="2"
                />
                {/* Blouse Sleeves */}
                <path
                  d="M 320 340 C 265 370, 240 430, 250 470 C 275 465, 295 440, 305 410 Z"
                  fill="url(#blouseGrad)"
                  stroke={zari.primary}
                  strokeWidth="1.5"
                />
                <path
                  d="M 480 340 C 535 370, 560 430, 550 470 C 525 465, 505 440, 495 410 Z"
                  fill="url(#blouseGrad)"
                  stroke={zari.primary}
                  strokeWidth="1.5"
                />
                {/* Zari Sleeve & Neckline Trim */}
                <path
                  d="M 338 342 C 370 375, 430 375, 462 342"
                  fill="none"
                  stroke={zari.borderStripe}
                  strokeWidth="4"
                  filter={shimmerEnabled ? 'url(#zariGlow)' : undefined}
                />
                <line x1="245" y1="465" x2="275" y2="450" stroke={zari.borderStripe} strokeWidth="6" />
                <line x1="525" y1="450" x2="555" y2="465" stroke={zari.borderStripe} strokeWidth="6" />
              </g>
            )}

            {/* STYLE 1: CLASSIC NIVI DRAPE */}
            {selectedStyle === 'nivi' && (
              <g id="drape-nivi" className="transition-all duration-500">
                {/* Front Torso Wrap / Diagonal Flute */}
                <path
                  d="M 320 440 C 370 410, 430 460, 490 495 C 470 560, 450 630, 430 680 C 360 670, 330 570, 320 440 Z"
                  fill="url(#sareeSilkBase)"
                  stroke="rgba(0,0,0,0.3)"
                  strokeWidth="1.5"
                />
                {/* Diagonal Torso Silk Sheen */}
                <path
                  d="M 320 440 C 370 410, 430 460, 490 495 C 470 560, 450 630, 430 680 C 360 670, 330 570, 320 440 Z"
                  fill="url(#silkSheenOverlay)"
                />
                {/* Torso Diagonal Zari Border */}
                <path
                  d="M 320 435 C 375 408, 440 455, 495 498"
                  fill="none"
                  stroke={zari.borderStripe}
                  strokeWidth="14"
                  filter={shimmerEnabled ? 'url(#zariGlow)' : undefined}
                />
                <path
                  d="M 320 435 C 375 408, 440 455, 495 498"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  opacity="0.8"
                />

                {/* Left Shoulder Pleated Pallu Cascading Down Behind & Over Shoulder */}
                <path
                  d="M 325 435 C 305 385, 290 320, 275 290 C 255 310, 235 390, 230 480 C 220 590, 215 760, 210 920 C 245 930, 280 925, 305 910 C 295 760, 300 590, 325 435 Z"
                  fill="url(#sareeSilkBase)"
                />
                <path
                  d="M 325 435 C 305 385, 290 320, 275 290 C 255 310, 235 390, 230 480 C 220 590, 215 760, 210 920 C 245 930, 280 925, 305 910 C 295 760, 300 590, 325 435 Z"
                  fill="url(#brocadeMotif)"
                />
                {/* Shoulder Pleats Individual Creases */}
                <path d="M 285 305 C 270 380, 255 530, 245 740" stroke="rgba(0,0,0,0.5)" strokeWidth="2" fill="none" />
                <path d="M 295 320 C 280 400, 268 560, 260 760" stroke={zari.primary} strokeWidth="1" fill="none" />
                <path d="M 305 340 C 290 430, 280 580, 275 790" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" fill="none" />
                {/* Heavy Grand Pallu End Piece Border */}
                <path
                  d="M 210 880 C 245 890, 280 885, 305 870 L 305 910 C 280 925, 245 930, 210 920 Z"
                  fill={zari.borderStripe}
                  filter={shimmerEnabled ? 'url(#zariGlow)' : undefined}
                />
                {/* Hand-knotted Tassels along Pallu hem */}
                {[0, 15, 30, 45, 60, 75, 90].map((offset, i) => (
                  <line 
                    key={i} 
                    x1={215 + offset} 
                    y1={920} 
                    x2={213 + offset} 
                    y2={938} 
                    stroke={zari.primary} 
                    strokeWidth="2.5" 
                  />
                ))}

                {/* Waist Center Pleats (Waterfall Accordian Pleats) */}
                <path
                  d="M 360 480 C 440 480, 460 520, 480 680 C 460 810, 450 930, 440 980 C 380 985, 340 980, 310 970 C 325 890, 340 760, 350 630 C 355 540, 358 500, 360 480 Z"
                  fill="url(#sareeSilkBase)"
                />
                {/* Pleats Shadows & Creases */}
                <path d="M 380 490 L 375 975" stroke="rgba(0,0,0,0.5)" strokeWidth="3" fill="none" />
                <path d="M 398 490 L 392 978" stroke={zari.highlight} strokeWidth="1.5" fill="none" />
                <path d="M 415 492 L 410 980" stroke="rgba(0,0,0,0.5)" strokeWidth="3" fill="none" />
                <path d="M 432 495 L 428 980" stroke={zari.highlight} strokeWidth="1.5" fill="none" />
                <path d="M 450 500 L 445 979" stroke="rgba(0,0,0,0.4)" strokeWidth="2.5" fill="none" />
                {/* Skirt Bottom Zari Border */}
                <path
                  d="M 310 940 C 355 948, 400 950, 442 948 L 440 980 C 398 982, 355 980, 310 970 Z"
                  fill={zari.borderStripe}
                  filter={shimmerEnabled ? 'url(#zariGlow)' : undefined}
                />
              </g>
            )}

            {/* STYLE 2: ROYAL GUJARATI (SEEDHA PALLU) */}
            {selectedStyle === 'gujarati' && (
              <g id="drape-gujarati" className="transition-all duration-500">
                {/* Right Shoulder Coming Forward Broad Fanned Pallu across Chest */}
                <path
                  d="M 490 320 C 530 360, 545 420, 550 510 C 540 640, 520 730, 490 820 C 400 810, 330 730, 310 650 C 300 520, 340 430, 390 380 C 430 340, 460 320, 490 320 Z"
                  fill="url(#sareeSilkBase)"
                />
                <path
                  d="M 490 320 C 530 360, 545 420, 550 510 C 540 640, 520 730, 490 820 C 400 810, 330 730, 310 650 C 300 520, 340 430, 390 380 C 430 340, 460 320, 490 320 Z"
                  fill="url(#brocadeMotif)"
                />
                {/* Prominent Fanned Seedha Pallu Zari Border along Left Slant */}
                <path
                  d="M 490 320 C 430 400, 350 520, 310 650"
                  stroke={zari.borderStripe}
                  strokeWidth="20"
                  fill="none"
                  filter={shimmerEnabled ? 'url(#zariGlow)' : undefined}
                />
                {/* Grand Ornamental Corner Motif (Kalka / Paisley) */}
                <circle cx="335" cy="630" r="16" fill={zari.primary} opacity="0.9" />
                <path d="M 335 605 C 360 625, 350 655, 325 650 Z" fill={zari.highlight} />

                {/* Lower Skirt Pleats */}
                <path
                  d="M 320 660 C 370 660, 430 670, 470 680 C 465 790, 455 890, 440 980 C 370 985, 330 980, 305 970 C 310 870, 315 760, 320 660 Z"
                  fill="url(#sareeSilkBase)"
                />
                {/* Skirt Border */}
                <path
                  d="M 305 940 C 350 948, 395 950, 440 948 L 440 980 C 395 982, 350 980, 305 970 Z"
                  fill={zari.borderStripe}
                />
                {/* Seedha Pallu Bottom Hem Fringe */}
                <path
                  d="M 310 650 C 370 730, 440 790, 490 820"
                  stroke={zari.borderStripe}
                  strokeWidth="12"
                  fill="none"
                />
              </g>
            )}

            {/* STYLE 3: BENGALI ATHPOUREY */}
            {selectedStyle === 'bengali' && (
              <g id="drape-bengali" className="transition-all duration-500">
                {/* Broad Box Pleats Center */}
                <path
                  d="M 330 480 C 470 480, 490 520, 500 700 C 490 820, 475 920, 460 980 C 380 985, 340 980, 300 970 C 315 840, 325 660, 330 480 Z"
                  fill="url(#sareeSilkBase)"
                />
                {/* Iconic Broad Box Pleat Fold Lines */}
                <path d="M 360 510 L 345 975" stroke="rgba(0,0,0,0.6)" strokeWidth="4" fill="none" />
                <path d="M 430 510 L 415 978" stroke="rgba(0,0,0,0.6)" strokeWidth="4" fill="none" />
                <path d="M 400 515 L 385 977" stroke={zari.primary} strokeWidth="1.5" fill="none" />

                {/* Diagonal Wrap from Right Waist to Left Shoulder */}
                <path
                  d="M 490 530 C 440 480, 360 430, 315 410 C 290 370, 280 320, 260 290 C 235 340, 230 430, 240 540 C 275 510, 310 470, 330 450 Z"
                  fill="url(#sareeSilkBase)"
                />
                {/* Traditional Red/Gold Bengali Border Ribbon */}
                <path
                  d="M 490 525 C 440 475, 360 425, 315 405"
                  stroke={zari.borderStripe}
                  strokeWidth="16"
                  fill="none"
                  filter={shimmerEnabled ? 'url(#zariGlow)' : undefined}
                />

                {/* Athpourey Key Bunch / Chaabi Guchha Ornament at Shoulder Fold */}
                <circle cx="280" cy="350" r="8" fill="#ffd700" stroke="#8b6914" strokeWidth="2" />
                <path d="M 280 358 L 275 390 M 280 358 L 282 395 M 280 358 L 287 388" stroke="#ffd700" strokeWidth="2.5" />

                {/* Bottom Border */}
                <path
                  d="M 300 940 C 350 948, 410 950, 460 948 L 460 980 C 410 982, 350 980, 300 970 Z"
                  fill={zari.borderStripe}
                />
              </g>
            )}

            {/* STYLE 4: MODERN MERMAID / COCKTAIL */}
            {selectedStyle === 'mermaid' && (
              <g id="drape-mermaid" className="transition-all duration-500">
                {/* Form-fitting curved silhouette */}
                <path
                  d="M 350 470 C 450 470, 470 510, 455 620 C 440 710, 415 760, 465 850 C 490 900, 520 950, 510 980 C 410 985, 350 985, 270 980 C 265 950, 290 900, 315 850 C 350 780, 340 700, 330 620 C 320 540, 330 490, 350 470 Z"
                  fill="url(#sareeSilkBase)"
                />
                <path
                  d="M 350 470 C 450 470, 470 510, 455 620 C 440 710, 415 760, 465 850 C 490 900, 520 950, 510 980 C 410 985, 350 985, 270 980 C 265 950, 290 900, 315 850 C 350 780, 340 700, 330 620 C 320 540, 330 490, 350 470 Z"
                  fill="url(#silkSheenOverlay)"
                />

                {/* Ultra-Slim Accordian Pleated Pallu flowing over shoulder */}
                <path
                  d="M 330 440 C 300 370, 280 310, 265 290 C 255 310, 240 370, 235 440 C 220 570, 210 740, 195 910 C 215 915, 240 910, 255 900 C 250 750, 260 560, 285 440 Z"
                  fill="url(#sareeSilkBase)"
                />
                {/* Slim Shoulder Border */}
                <path
                  d="M 330 440 C 300 370, 280 310, 265 290"
                  stroke={zari.borderStripe}
                  strokeWidth="10"
                  fill="none"
                  filter={shimmerEnabled ? 'url(#zariGlow)' : undefined}
                />
                {/* Flared fishtail hem border */}
                <path
                  d="M 270 945 C 340 950, 420 950, 510 945 L 510 980 C 420 985, 340 985, 270 980 Z"
                  fill={zari.borderStripe}
                />
              </g>
            )}

            {/* STYLE 5: SOUTH INDIAN MADISAR / TEMPLE */}
            {selectedStyle === 'madisar' && (
              <g id="drape-madisar" className="transition-all duration-500">
                {/* Temple Border Korvai Layered Torso */}
                <path
                  d="M 315 425 C 380 400, 445 445, 495 480 C 480 580, 460 700, 445 800 C 370 790, 330 680, 315 425 Z"
                  fill="url(#sareeSilkBase)"
                />
                {/* Temple Gopuram Triangular Border Motifs */}
                <path
                  d="M 315 420 C 380 395, 445 440, 495 475"
                  stroke={zari.borderStripe}
                  strokeWidth="18"
                  fill="none"
                  filter={shimmerEnabled ? 'url(#zariGlow)' : undefined}
                />
                {/* Temple Spire / Triangle Notch Accents */}
                {[0, 25, 50, 75, 100, 125, 150].map((step, idx) => (
                  <polygon
                    key={idx}
                    points={`${340 + step * 0.9},${405 + step * 0.45} ${348 + step * 0.9},${393 + step * 0.45} ${356 + step * 0.9},${408 + step * 0.45}`}
                    fill={zari.highlight}
                  />
                ))}

                {/* Layered Kacham / Pleats */}
                <path
                  d="M 320 540 C 450 540, 470 600, 475 750 C 460 870, 450 940, 440 980 C 370 985, 330 980, 295 970 C 305 860, 315 720, 320 540 Z"
                  fill="url(#sareeSilkBase)"
                />
                <path d="M 350 560 L 335 975" stroke={zari.primary} strokeWidth="3" fill="none" />
                <path d="M 385 565 L 375 978" stroke="rgba(0,0,0,0.5)" strokeWidth="3" fill="none" />
                <path d="M 420 570 L 415 979" stroke={zari.primary} strokeWidth="3" fill="none" />

                {/* Madisar Cross-Waist Pallu Loop */}
                <path
                  d="M 470 620 C 430 680, 360 720, 290 690 C 275 640, 280 580, 305 520"
                  stroke={zari.borderStripe}
                  strokeWidth="16"
                  fill="none"
                />

                {/* Bottom Border */}
                <path
                  d="M 295 940 C 345 948, 395 950, 440 948 L 440 980 C 395 982, 345 980, 295 970 Z"
                  fill={zari.borderStripe}
                />
              </g>
            )}

            {/* Specular Light Reflection / Shimmer Sheen Beam */}
            {shimmerEnabled && (
              <rect
                x="200"
                y="260"
                width="400"
                height="700"
                fill="url(#silkSheenOverlay)"
                opacity="0.6"
                mixBlendMode="overlay"
                className="pointer-events-none"
              />
            )}
          </svg>
        </div>

        {/* Floating Badges on Main Stage */}
        <div className="absolute top-3 left-3 z-30 flex flex-col gap-1.5 pointer-events-auto">
          {/* Active Drape Style Badge */}
          <div className="bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#c5a059]/40 text-left shadow-lg">
            <p className="text-[9px] text-[#c5a059] uppercase tracking-wider font-mono flex items-center gap-1">
              <Layers className="w-2.5 h-2.5" />
              {currentDrape.name} Drape
            </p>
            <p className="text-[11px] text-white font-medium truncate max-w-[170px] sm:max-w-[220px]">
              {saree.name}
            </p>
          </div>

          {/* Saree Origin & Silk Mark */}
          <div className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#333333] text-[9px] text-[#4ade80] flex items-center gap-1.5 w-fit shadow-md">
            <ShieldCheck className="w-3 h-3 text-[#4ade80]" />
            <span>Silk Mark {saree.fabric}</span>
          </div>
        </div>

        {/* Top Right Floating Action: Snap Photo */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={captureSnapshot}
            className="px-3 py-2 bg-[#c5a059] hover:bg-[#d4b476] text-black rounded-xl text-xs font-bold uppercase tracking-wider shadow-xl flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer"
            title="Take a photo with this saree drape"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Snap Drape</span>
          </button>
        </div>

        {/* Bottom Floating Alignment Helper Pill */}
        <div className="absolute bottom-3 inset-x-0 mx-auto w-fit z-30 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] text-[#a1a1aa] shadow-lg flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
            <span>Align shoulders with the upper drape guidelines</span>
          </div>
        </div>
      </div>

      {/* Captured Snapshot Modal / Preview Overlay */}
      {isCaptured && capturedSnapshotUrl && (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#262626]">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#4ade80]" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Drape Snapshot Captured
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setIsCaptured(false)}
              className="p-1.5 rounded-lg bg-[#171717] hover:bg-[#262626] text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 my-3 flex items-center justify-center overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a]">
            <img 
              src={capturedSnapshotUrl} 
              alt="Virtual Try-On Saree Result" 
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl" 
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCaptured(false)}
              className="px-4 py-2.5 bg-[#171717] hover:bg-[#262626] text-[#a1a1aa] hover:text-white rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              Back to Live Try-On
            </button>

            <a
              href={capturedSnapshotUrl}
              download={`varnam-${saree.id}-${selectedStyle}-tryon.jpg`}
              className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#d4b476] text-black font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download High-Res Photo</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Calibration Controls Drawer */}
      {isCalibrating && (
        <div className="p-3.5 bg-[#121212]/95 backdrop-blur-md border-t border-[#262626] space-y-3 z-30 animate-in slide-in-from-bottom-2 duration-150 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a059] flex items-center gap-1.5">
              <Sliders className="w-3 h-3" />
              <span>AR Calibration & Fit Studio</span>
            </span>
            <button
              type="button"
              onClick={handleResetCalibration}
              className="text-[10px] text-[#a1a1aa] hover:text-[#c5a059] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Fit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            {/* Fit Scale / Size */}
            <div className="space-y-1 bg-[#171717] p-2 rounded-xl border border-[#262626]">
              <div className="flex justify-between text-[10px] text-[#a1a1aa]">
                <span>Drape Size</span>
                <span className="font-mono text-white">{drapeScale}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="125"
                value={drapeScale}
                onChange={(e) => setDrapeScale(Number(e.target.value))}
                className="w-full accent-[#c5a059] cursor-pointer"
              />
            </div>

            {/* Vertical Shoulder Alignment */}
            <div className="space-y-1 bg-[#171717] p-2 rounded-xl border border-[#262626]">
              <div className="flex justify-between text-[10px] text-[#a1a1aa]">
                <span>Shoulder Height</span>
                <span className="font-mono text-white">{verticalOffset > 0 ? `+${verticalOffset}` : verticalOffset}px</span>
              </div>
              <input
                type="range"
                min="-40"
                max="40"
                value={verticalOffset}
                onChange={(e) => setVerticalOffset(Number(e.target.value))}
                className="w-full accent-[#c5a059] cursor-pointer"
              />
            </div>

            {/* Silk Opacity / Blend */}
            <div className="space-y-1 bg-[#171717] p-2 rounded-xl border border-[#262626]">
              <div className="flex justify-between text-[10px] text-[#a1a1aa]">
                <span>Silk Opacity</span>
                <span className="font-mono text-white">{drapeOpacity}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="100"
                value={drapeOpacity}
                onChange={(e) => setDrapeOpacity(Number(e.target.value))}
                className="w-full accent-[#c5a059] cursor-pointer"
              />
            </div>

            {/* Feature Toggles (Zari Shimmer & Blouse Layer) */}
            <div className="flex items-center justify-between gap-2 bg-[#171717] p-2 rounded-xl border border-[#262626]">
              <label className="flex items-center gap-1.5 text-[10px] text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={shimmerEnabled}
                  onChange={(e) => setShimmerEnabled(e.target.checked)}
                  className="accent-[#c5a059] w-3.5 h-3.5"
                />
                <span>Zari Shimmer</span>
              </label>

              <label className="flex items-center gap-1.5 text-[10px] text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showBlouseOverlay}
                  onChange={(e) => setShowBlouseOverlay(e.target.checked)}
                  className="accent-[#c5a059] w-3.5 h-3.5"
                />
                <span>Blouse Layer</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Interactive Dock: Drape Style Selector & Studio Models */}
      <div className="p-3 sm:p-4 bg-[#0d0d0d] border-t border-[#262626] space-y-3 z-30 shrink-0">
        
        {/* Style Selector Tabs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a059] flex items-center gap-1.5">
              <Layers className="w-3 h-3" />
              <span>Select Drape Style</span>
            </span>
            <span className="text-[10px] text-[#a1a1aa]">
              {currentDrape.regionalTitle}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {DRAPE_STYLES.map((style) => {
              const isSelected = selectedStyle === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setSelectedStyle(style.id)}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1a1710] border-[#c5a059] text-white shadow-xs ring-1 ring-[#c5a059]/50'
                      : 'bg-[#141414] border-[#262626] text-[#a1a1aa] hover:text-white hover:border-[#383838]'
                  }`}
                >
                  <p className="text-xs font-semibold truncate">{style.name}</p>
                  <p className="text-[9px] text-[#71717a] mt-0.5 truncate">{style.palluPlacement}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mode-Specific Options: Studio Model selector if in Studio Mode */}
        {mode === 'studio' && (
          <div className="pt-2 border-t border-[#1f1f1f] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-[10px] text-[#71717a] uppercase tracking-wider whitespace-nowrap">
                Mannequin Pose:
              </span>
              {DEMO_STUDIO_MODELS.map((model) => (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => {
                    setActiveStudioModel(model.url);
                    setUploadedUserPhoto(null);
                  }}
                  className={`px-2.5 py-1 rounded-lg border text-[10px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                    activeStudioModel === model.url && !uploadedUserPhoto
                      ? 'bg-[#c5a059] text-black border-[#c5a059] font-bold'
                      : 'bg-[#171717] border-[#262626] text-[#a1a1aa] hover:text-white'
                  }`}
                >
                  {model.name.split(' (')[0]}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 bg-[#171717] hover:bg-[#262626] border border-[#333333] text-white text-[10px] rounded-lg transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <Upload className="w-3 h-3 text-[#c5a059]" />
              <span>{uploadedUserPhoto ? 'Change Photo' : 'Upload Your Photo'}</span>
            </button>
          </div>
        )}

        {/* Drape Description & Fast Add to Bag */}
        <div className="pt-2 border-t border-[#1f1f1f] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-[11px] text-[#a1a1aa] font-light leading-snug">
            <span className="text-white font-medium">Style Secret: </span>
            {currentDrape.description} <span className="text-[#c5a059] italic">({currentDrape.recommendedFor})</span>
          </p>

          {onAddToCart && (
            <button
              type="button"
              onClick={onAddToCart}
              className="px-4 py-2 bg-[#c5a059] hover:bg-[#d4b476] text-black text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shrink-0 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Add to Bag ({formatPrice(saree.price, currency)})</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
