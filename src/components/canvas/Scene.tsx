"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { useState, useRef, Suspense, useEffect } from "react";
import { useScroll } from "framer-motion";
import * as THREE from "three";

function ParticleField(props: any) {
  const ref = useRef<any>(null);
  // Generate random points in a sphere
  // 5001 is divisible by 3 (x,y,z per point) preventing NaN bounding errors
  const [sphere] = useState(() => random.inSphere(new Float32Array(5001), { radius: 1.5 }));
  
  // Use Framer Motion scroll to influence rotation
  const { scrollYProgress } = useScroll();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Base rotation
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
      
      // Mouse interaction for 3D cinematic effect
      // Smoothly interpolate current rotation towards target mouse rotation
      const targetRotationX = mouse.current.y * 0.2;
      const targetRotationY = mouse.current.x * 0.2;
      
      ref.current.rotation.x += (targetRotationX - ref.current.rotation.x) * 0.05;
      ref.current.rotation.y += (targetRotationY - ref.current.rotation.y) * 0.05;

      // Add slight parallax based on scroll
      const currentScroll = scrollYProgress.get();
      ref.current.position.y = currentScroll * 0.8; // Reduced parallax depth to keep particles in view longer
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}

