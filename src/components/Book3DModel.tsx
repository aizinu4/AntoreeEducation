import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const BookModel = () => {
  const gltf = useGLTF('/3d/green3d.glb');
  const modelRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive 
      object={gltf.scene} 
      ref={modelRef}
      scale={[0.07, 0.07, 0.07]} 
      position={[0, 0.1, 0]} 
      rotation={[1, 0, 0.2]} // Thêm góc nghiêng ban đầu
    />
  );
};

const Book3DModel: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <React.Suspense fallback={null}>
          <BookModel />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate={false}
          />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default Book3DModel; 