// src/components/layout/three/Laptop.jsx
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { VideoTexture, SRGBColorSpace, RepeatWrapping, DoubleSide, MeshStandardMaterial, PlaneGeometry } from 'three';
import { useFrame } from '@react-three/fiber';

const LAPTOP_MODEL_PATH = '/models/laptop_model.glb';

export function Laptop({ videoSrc, active, projectTitle, projectLink, ...props }) {
  const group = useRef(); // Overall group for the entire laptop model
  const screenHingeRef = useRef(); // This group will act as the hinge for rotation

  const { nodes, materials } = useGLTF(LAPTOP_MODEL_PATH);

  useEffect(() => {
    if (nodes) {
      // console.log("Laptop Model Nodes (Bezel Update):", nodes);
    }
  }, [nodes]);

  const baseMeshNode = nodes.Frame_ComputerFrame_0;
  const originalScreenMeshNode = nodes.Screen_ComputerScreen_0; // The screen mesh from your GLB, will act as bezel

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
        videoElement.play().catch(e => console.warn("Laptop video autoplay prevented:", e, videoSrc));
      } else {
        videoElement.pause();
      }
    }
  }, [active, videoElement, videoSrc]);

  useFrame((state, delta) => {
    if (screenHingeRef.current) {
      const targetRotationX = active ? 0 : Math.PI / 2.2;
      screenHingeRef.current.rotation.x += (targetRotationX - screenHingeRef.current.rotation.x) * (delta * 10);
    }
  });

  const [isScreenLit, setIsScreenLit] = useState(false);
  useEffect(() => {
    if (active && videoSrc) {
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
    } else {
      console.log("No project link defined for this laptop project:", projectTitle);
    }
  };

  // Values from previous adjustments for the *original* screen mesh's pivot and orientation
  const originalScreenMeshTranslateY = 0.0;
  const originalScreenMeshTranslateZ = -0.1;
  const originalScreenVisualRotationY = Math.PI; // 180 degrees

  // --- Video Plane Parameters ---
  const videoAspectRatio = 16 / 9.5;
  const videoPlaneWidth = 0.29;
  const videoPlaneHeight = videoPlaneWidth / videoAspectRatio;

  const videoPlanePosition = [
    0,
    originalScreenMeshTranslateY + 0.1,
    originalScreenMeshTranslateZ - 0.004 // This places it slightly "behind" the original screen's Z
  ];
  const videoPlaneRotation = [
    0,
    0,
    0
  ];

  if (!nodes || LAPTOP_MODEL_PATH.includes('your_laptop_model_filename.glb')) {
    console.warn("Laptop.jsx: Model not loaded or placeholder path is still in use. Path:", LAPTOP_MODEL_PATH);
    return ( <mesh {...props}><boxGeometry args={[1.5,0.1,1]} /><meshStandardMaterial color="red" wireframe={true} /></mesh> );
  }
  if (!baseMeshNode || !originalScreenMeshNode) {
    console.error("Laptop.jsx: CRITICAL - Base or original screen mesh (for bezel) not found.");
    return ( <mesh {...props}><boxGeometry args={[1.5,0.1,1]} /><meshStandardMaterial color="purple" wireframe={true} /></mesh> );
  }

  const baseRotationX = -Math.PI / 2;

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={baseMeshNode.geometry}
        name="laptop_base"
        rotation={[baseRotationX, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          attach="material"
          color="mint-green"
          wireframe={true}
          transparent={true}
          opacity={0.7} // Opacity of the base wireframe faces
        />
      </mesh>

      <group
        ref={screenHingeRef}
        // position={[0, 0.05, -0.65]} // Adjust this to position the hinge correctly on the base
      >
        {/* Original screen mesh from GLB - now styled as a wireframe bezel */}
        <mesh
          geometry={originalScreenMeshNode.geometry}
          name="laptop_screen_bezel"
          position={[0, originalScreenMeshTranslateY, originalScreenMeshTranslateZ]}
          rotation={[0, originalScreenVisualRotationY, 0]}
          // visible={true} // Ensure it's visible (default is true)
        >
          <meshStandardMaterial
            color="mint-green"      // This will be the color of the wireframe lines
            wireframe={true}
            transparent={true}      // Make the faces transparent
            opacity={0.15}          // Low opacity for faces, so wireframe is more prominent
                                    // You can set to 0 if you ONLY want the wireframe lines and no faces.
            emissive="mint-green"   // Makes the wireframe lines glow slightly
            emissiveIntensity={0.3} // Adjust glow intensity
            side={DoubleSide}       // Render both sides, useful for wireframes
          />
        </mesh>

        {/* NEW Video Plane - Child of the Hinge, positioned behind the bezel */}
        {isScreenLit && videoTexture && (
          <mesh
            name="video_display_plane_active"
            position={videoPlanePosition} // Uses your adjusted position
            rotation={videoPlaneRotation} // Uses your adjusted rotation
            onClick={handleScreenClick}
            onPointerOver={(e) => {if(projectLink && projectLink !== "#") document.body.style.cursor = 'pointer'}}
            onPointerOut={(e) => {if(projectLink && projectLink !== "#") document.body.style.cursor = 'auto'}}
          >
            <planeGeometry args={[videoPlaneWidth, videoPlaneHeight]} />
            <meshBasicMaterial map={videoTexture} toneMapped={false} side={DoubleSide} />
          </mesh>
        )}
        {/* Fallback dark plane when screen is not lit or no video */}
        {!isScreenLit && (
            <mesh
              name="video_display_plane_off"
              position={videoPlanePosition} // Uses your adjusted position
              rotation={videoPlaneRotation} // Uses your adjusted rotation
            >
              <planeGeometry args={[videoPlaneWidth, videoPlaneHeight]} />
              <meshStandardMaterial color="#101010" side={DoubleSide} />
            </mesh>
        )}
      </group>
    </group>
  );
}

useGLTF.preload(LAPTOP_MODEL_PATH);
export default Laptop;
