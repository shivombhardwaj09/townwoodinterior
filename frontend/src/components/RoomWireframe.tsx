"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function RoomWireframe() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const material = new THREE.LineBasicMaterial({
    color: 0xd4af37,
    transparent: true,
    opacity: 0.3,
  });

  // Create a simple room outline
  const geometry = new THREE.BoxGeometry(4, 3, 4);
  const edges = new THREE.EdgesGeometry(geometry);

  return (
    <group ref={groupRef}>
      <lineSegments geometry={edges} material={material} />
    </group>
  );
}
