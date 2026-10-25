import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ArgentParticleVortexProps {
  scrollProgress: number;
  scrollVelocity: number;
}

export const ArgentParticleVortex: React.FC<ArgentParticleVortexProps> = ({
  scrollProgress,
  scrollVelocity,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(scrollProgress);
  const velocityRef = useRef(scrollVelocity);

  useEffect(() => {
    progressRef.current = scrollProgress;
    velocityRef.current = scrollVelocity;
  }, [scrollProgress, scrollVelocity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 540;
    const height = 540;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 320;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const particleCount = 750;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const particleData: Array<{
      radius: number;
      baseRadius: number;
      angle: number;
      speed: number;
      zSpeed: number;
      radialDrift: number;
    }> = [];

    const colorArgent = new THREE.Color(0xff562d);
    const colorCyan = new THREE.Color(0x00dbe9);
    const colorHot = new THREE.Color(0xffdad2);

    for (let i = 0; i < particleCount; i++) {
      const radius = 30 + Math.random() * 190;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 60;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = z;

      const rand = Math.random();
      let c = colorArgent;
      if (rand > 0.82) c = colorCyan;
      else if (rand > 0.65) c = colorHot;

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      particleData.push({
        radius,
        baseRadius: radius,
        angle,
        speed: (0.015 + Math.random() * 0.035) * (Math.random() > 0.3 ? 1 : -0.7),
        zSpeed: (Math.random() - 0.5) * 0.5,
        radialDrift: (Math.random() - 0.5) * 0.4,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circular glow particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const ctx = pCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(255, 86, 45, 0.85)');
      grad.addColorStop(0.7, 'rgba(255, 86, 45, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }

    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const material = new THREE.PointsMaterial({
      size: 8.5,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Core inner glow ring
    const ringGeo = new THREE.RingGeometry(38, 42, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff562d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const coreRing = new THREE.Mesh(ringGeo, ringMat);
    scene.add(coreRing);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const posAttr = geometry.attributes.position;
      const posArray = posAttr.array as Float32Array;

      const currentScrollProgress = progressRef.current;
      const currentVelocity = velocityRef.current;

      const speedMult = 1.0 + currentScrollProgress * 3.5 + currentVelocity * 0.12;
      const swirlAngle = 0.008 * speedMult;

      points.rotation.z += swirlAngle;
      coreRing.rotation.z -= swirlAngle * 1.5;

      const scaleVal = 1.0 + currentScrollProgress * 0.35;
      points.scale.set(scaleVal, scaleVal, scaleVal);

      material.opacity = Math.min(1.0, 0.45 + currentScrollProgress * 0.55);
      material.size = 7.5 + currentScrollProgress * 5.0 + Math.min(4.0, currentVelocity * 0.25);

      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];
        p.angle += p.speed * speedMult;
        p.radius += p.radialDrift;

        if (p.radius > 220) p.radius = 35;
        if (p.radius < 30) p.radius = 215;

        const idx = i * 3;
        posArray[idx] = Math.cos(p.angle) * p.radius;
        posArray[idx + 1] = Math.sin(p.angle) * p.radius;
        posArray[idx + 2] += p.zSpeed;

        if (posArray[idx + 2] > 35) posArray[idx + 2] = -35;
        if (posArray[idx + 2] < -35) posArray[idx + 2] = 35;
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="argent-particle-canvas"
      className="w-full h-full block pointer-events-none"
      width={540}
      height={540}
    />
  );
};
