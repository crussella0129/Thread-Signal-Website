import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WireframeGeometry() {
  const meshRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Create icosahedron edges
  const { edgePositions, particlePositions } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.5, 1);
    const edges = new THREE.EdgesGeometry(geo);
    const edgePos = edges.getAttribute('position');

    // Create particles at each vertex of the icosahedron
    const vertices = geo.getAttribute('position');
    const particlePos = new Float32Array(vertices.count * 3);
    for (let i = 0; i < vertices.count; i++) {
      particlePos[i * 3] = vertices.getX(i);
      particlePos[i * 3 + 1] = vertices.getY(i);
      particlePos[i * 3 + 2] = vertices.getZ(i);
    }

    geo.dispose();

    return { edgePositions: edgePos, particlePositions: particlePos };
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.12;
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Wireframe edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[edgePositions.array as Float32Array, 3]}
            count={edgePositions.count}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.6} />
      </lineSegments>

      {/* Vertex particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
            count={particlePositions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial color="#f0a030" size={0.08} sizeAttenuation />
      </points>

      {/* Inner glow sphere */}
      <mesh>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.03} wireframe />
      </mesh>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <WireframeGeometry />
      </Canvas>
    </div>
  );
}
