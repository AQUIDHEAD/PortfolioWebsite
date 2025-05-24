// src/components/layout/three/Phone.jsx
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useGLTF, useTexture } from '@react-three/drei'; // Added useTexture
import { VideoTexture, SRGBColorSpace, RepeatWrapping, DoubleSide, MeshStandardMaterial, PlaneGeometry, CanvasTexture } from 'three'; // Added CanvasTexture for potential future use

const PHONE_MODEL_PATH = '/models/phone_model.glb';
const ALPHA_MAP_PATH = '/textures/rounded_alpha.png'; // Path to your alpha map image

export function Phone({ videoSrc, active, projectTitle, projectLink, ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF(PHONE_MODEL_PATH);

  // Load the alpha map texture
  const alphaMapTexture = useTexture(ALPHA_MAP_PATH);
  // Ensure the alpha map texture doesn't get color space conversion if it's just B&W
  if (alphaMapTexture) {
    // alphaMapTexture.encoding = SRGBColorSpace; // Usually not needed for alpha maps, but test if issues
  }


  useEffect(() => {
    if (nodes) {
      // console.log("--- Phone Model Nodes (Curved Edges) ---");
      // console.log("Available nodes in your phone model:", nodes);
      // console.log("---------------------------------------------");
    }
  }, [nodes]);

  const [videoElement, setVideoElement] = useState(null);
  const videoTexture = useMemo(() => {
    if (!videoElement) return null;
    const texture = new VideoTexture(videoElement);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.colorSpace = SRGBColorSpace;
    return texture;
  }, [videoElement]);

  useEffect(() => {
    if (!videoSrc) {
      setVideoElement(null);
      return;
    }
    const vid = document.createElement('video');
    vid.src = videoSrc;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    setVideoElement(vid);
    return () => {
      vid.pause();
      setVideoElement(null);
      videoTexture?.dispose();
    };
  }, [videoSrc]);

  useEffect(() => {
    if (videoElement) {
      if (active) {
        videoElement.play().catch(e => console.warn("Phone.jsx: Video autoplay prevented:", e, videoSrc));
      } else {
        videoElement.pause();
      }
    }
  }, [active, videoElement, videoSrc]);

  const bodyMeshNode = nodes.Phone_Case_PhoneCase_Mat_0;
  const originalScreenMeshNode = nodes.Phone_Case_PhoneFace_Mat_0;

  const [isScreenLit, setIsScreenLit] = useState(false);
  useEffect(() => {
    const shouldBeLit = active && !!videoSrc;
    if (shouldBeLit) {
      const timer = setTimeout(() => setIsScreenLit(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsScreenLit(false);
    }
  }, [active, videoSrc]);

  const handleScreenClick = (event) => {
    event.stopPropagation();
    if (projectLink && projectLink !== "#") {
      window.open(projectLink, '_blank', 'noopener,noreferrer');
    }
  };

  // Updated values:
  const videoAspectRatio = 9 / 18; 
  const videoPlaneWidth = 28.1;
  const videoPlaneHeight = videoPlaneWidth / videoAspectRatio;

  const videoPlaneRotationX = Math.PI / 2;
  const videoPlaneRotationY = Math.PI;

  const videoPlanePosition = [0, 2.3, 0];
  const videoPlaneRotation = [videoPlaneRotationX, videoPlaneRotationY, 0];


  if (!nodes || PHONE_MODEL_PATH.includes('your_phone_model_filename.glb')) {
    console.warn("Phone.jsx: Model not loaded or placeholder path is still in use. Path:", PHONE_MODEL_PATH);
    return ( <mesh {...props}><boxGeometry args={[0.4, 0.8, 0.05]} /><meshStandardMaterial color="red" wireframe={true} /></mesh> );
  }
  if (!bodyMeshNode || !originalScreenMeshNode || typeof originalScreenMeshNode.geometry === 'undefined') {
    console.error("Phone.jsx: CRITICAL - Phone body or original screen mesh (for bezel) not found or invalid.");
    return ( <mesh {...props} scale={props.scale || 0.5}><boxGeometry args={[0.4, 0.8, 0.05]} /><meshStandardMaterial color="orange" wireframe={true} /></mesh> );
  }

  const phoneRotationX = -Math.PI / 2;
  const phoneRotationZ = -Math.PI;

  return (
    <group ref={group} {...props} rotation={[phoneRotationX, 0, phoneRotationZ]} dispose={null}>
      <mesh
        geometry={bodyMeshNode.geometry}
        name="phone_body"
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          attach="material"
          color="mint-green"
          wireframe={true}
          transparent={true}
          opacity={0.75}
        />
      </mesh>

      <mesh
        geometry={originalScreenMeshNode.geometry}
        name="phone_screen_bezel"
      >
        <meshStandardMaterial
          color="mint-green"
          wireframe={true}
          transparent={true}
          opacity={0.15}
          emissive="mint-green"
          emissiveIntensity={0.3}
          side={DoubleSide}
        />
      </mesh>

      {/* Video Plane - Now with Alpha Map for rounded corners */}
      {isScreenLit && videoTexture && alphaMapTexture && ( // Check for alphaMapTexture too
        <mesh
          name="video_display_plane_active"
          position={videoPlanePosition}
          rotation={videoPlaneRotation}
          onClick={handleScreenClick}
          onPointerOver={(e) => {if(projectLink && projectLink !== "#") document.body.style.cursor = 'pointer'}}
          onPointerOut={(e) => {if(projectLink && projectLink !== "#") document.body.style.cursor = 'auto'}}
        >
          <planeGeometry args={[videoPlaneWidth, videoPlaneHeight]} />
          <meshBasicMaterial
            map={videoTexture}
            alphaMap={alphaMapTexture} // Apply the alpha map
            transparent={true}          // Material must be transparent for alphaMap to work
            toneMapped={false}
            side={DoubleSide}
          />
        </mesh>
      )}
      {/* Fallback dark plane when screen is not lit or no video */}
      {/* Also apply alpha map to the "off" state if you want its shape to be rounded */}
      {!isScreenLit && alphaMapTexture && (
          <mesh
            name="video_display_plane_off"
            position={videoPlanePosition}
            rotation={videoPlaneRotation}
          >
            <planeGeometry args={[videoPlaneWidth, videoPlaneHeight]} />
            <meshStandardMaterial
                color="#101010"
                alphaMap={alphaMapTexture}
                transparent={true}
                side={DoubleSide}
            />
          </mesh>
      )}
      {/* If alphaMapTexture hasn't loaded yet, you might show a simple non-alpha-mapped dark plane or nothing */}
      {!alphaMapTexture && !isScreenLit && (
           <mesh
            name="video_display_plane_off_no_alpha"
            position={videoPlanePosition}
            rotation={videoPlaneRotation}
          >
            <planeGeometry args={[videoPlaneWidth, videoPlaneHeight]} />
            <meshStandardMaterial color="#101010" side={DoubleSide} />
          </mesh>
      )}
    </group>
  );
}

// Preload model and alpha map texture
useGLTF.preload(PHONE_MODEL_PATH);
useTexture.preload(ALPHA_MAP_PATH);

export default Phone;
