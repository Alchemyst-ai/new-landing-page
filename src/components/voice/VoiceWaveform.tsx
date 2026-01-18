"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function VoiceWaveform() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Camera - Low FOV for cinematic feel
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Waveform Configuration
    const BAR_COUNT = 300;
    const BAR_WIDTH = 0.04;
    const BAR_DEPTH = 0.15;
    const SPACING = 0.06;
    const WAVEFORM_WIDTH = BAR_COUNT * SPACING;

    // Geometry & Materials - Using CapsuleGeometry for rounded, sophisticated look
    const geometry = new THREE.CapsuleGeometry(BAR_WIDTH / 2, 1, 4, 8);
    
    // Left Material (Vibrant Orange / Gold)
    const orangeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffa500, // True Orange
      emissive: 0xff4500, // Orange Red for deep glow
      emissiveIntensity: 4.0, // Cranked up for "highlight" feel
      roughness: 0.05,
      metalness: 1.0,
      transparent: true,
      opacity: 1.0,
    });

    // Right Material (Gray)
    const grayMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd4d4d8, // Zinc 300
      emissive: 0x3f3f46, // Zinc 700
      emissiveIntensity: 0.2,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.9,
    });

    // Ghost Material (Muted Neutral)
    const ghostMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x27272a, // Zinc 800
      transparent: true,
      opacity: 0.05,
    });

    // Instanced Meshes
    const HALF_COUNT = Math.floor(BAR_COUNT / 2);
    const leftMesh = new THREE.InstancedMesh(geometry, orangeMaterial, HALF_COUNT);
    const rightMesh = new THREE.InstancedMesh(geometry, grayMaterial, BAR_COUNT - HALF_COUNT);
    
    const ghostMesh1 = new THREE.InstancedMesh(geometry, ghostMaterial, BAR_COUNT);
    const ghostMesh2 = new THREE.InstancedMesh(geometry, ghostMaterial, BAR_COUNT);
    
    scene.add(leftMesh);
    scene.add(rightMesh);
    scene.add(ghostMesh1);
    scene.add(ghostMesh2);

    // Glitter Particles
    const sparklesCount = 3500;
    const sparklesGeometry = new THREE.BufferGeometry();
    const sparklesPos = new Float32Array(sparklesCount * 3);
    const sparklesVel = new Float32Array(sparklesCount);
    
    for (let i = 0; i < sparklesCount; i++) {
      sparklesPos[i * 3] = (Math.random() - 0.5) * 35;
      sparklesPos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      sparklesPos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      sparklesVel[i] = Math.random();
    }
    
    sparklesGeometry.setAttribute('position', new THREE.BufferAttribute(sparklesPos, 3));
    
    const sparklesMaterial = new THREE.PointsMaterial({
      color: 0xffba08,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    const sparkles = new THREE.Points(sparklesGeometry, sparklesMaterial);
    scene.add(sparkles);

    // Initial positioning dummy
    const dummy = new THREE.Object3D();
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(5, 5, 10);
    scene.add(keyLight);

    // Warm accent on the left, cool on the right
    const leftLight = new THREE.PointLight(0xff8c00, 5, 20); // Stronger orange light
    leftLight.position.set(-8, 2, 5);
    scene.add(leftLight);

    const rightLight = new THREE.PointLight(0x71717a, 1, 15);
    rightLight.position.set(8, 2, 5);
    scene.add(rightLight);

    // Animation variables
    let time = 0;
    const colors = {
      orange: new THREE.Color(0xffa500),
      accent: new THREE.Color(0xff4500),
      gray: new THREE.Color(0xd4d4d8),
    };

    const animate = () => {
      time += 0.01;
      
      // Camera gentle drift
      camera.position.x = 0 + Math.sin(time * 0.2) * 0.4;
      camera.position.y = Math.cos(time * 0.15) * 0.2;
      camera.lookAt(0, 0, 0);

      // Animate Sparkles
      const positions = sparklesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < sparklesCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + i) * 0.005; // Gentle float
        // Twinkle effect by modulating color/opacity? PointsMaterial doesn't support per-point opacity easily without shaders
        // But we can modulate global material slightly
      }
      sparklesMaterial.opacity = 0.5 + Math.sin(time * 2.5) * 0.3;
      sparklesGeometry.attributes.position.needsUpdate = true;

        for (let i = 0; i < BAR_COUNT; i++) {
          const x = i * SPACING - WAVEFORM_WIDTH / 2;
          
          // Smoother, more natural envelope (Gaussian-like curve)
          const normalizedIdx = i / BAR_COUNT;
          const envelope = Math.exp(-Math.pow(normalizedIdx - 0.5, 2) / 0.08);
          
          // 1. Primary Waveform Calculations - Summing waves for organic motion
          const slowWave = Math.sin(time * 0.8 + i * 0.03);
          const midWave = Math.sin(time * 1.5 + i * 0.07) * 0.5;
          const fastWave = Math.sin(time * 3.0 + i * 0.12) * 0.2;
          const detailWave = Math.sin(time * 5.0 - i * 0.2) * 0.1;
          
          const amplitude = (slowWave + midWave + fastWave + detailWave + 1.8) * envelope;
          const scaleY = Math.max(0.1, amplitude * 3.8);
          
          dummy.position.set(x, 0, 0);
          dummy.scale.set(1, scaleY, 1);
          dummy.updateMatrix();

          // Smooth color transition based on position instead of hard cut
          const colorProgress = THREE.MathUtils.smoothstep(i / BAR_COUNT, 0.35, 0.65);

          if (i < HALF_COUNT) {
            leftMesh.setMatrixAt(i, dummy.matrix);
            // Dynamic orange-to-gold color
            const color = new THREE.Color().lerpColors(colors.orange, colors.accent, Math.min(1, amplitude / 3.0));
            // Apply slight fade-out toward the middle transition
            const opacity = 1.0 - Math.pow(colorProgress, 4);
            leftMesh.setColorAt(i, color);
          } else {
            rightMesh.setMatrixAt(i - HALF_COUNT, dummy.matrix);
            const color = new THREE.Color().copy(colors.gray).multiplyScalar(0.7 + Math.sin(time + i * 0.08) * 0.3);
            rightMesh.setColorAt(i - HALF_COUNT, color);
          }


        // 2. Ghost Waveform 1 (Slower, Larger, Deeper)
        const ghost1Time = time * 0.6;
        const g1Wave = Math.sin(ghost1Time + i * 0.04) * 0.8 + 0.5;
        const g1Amplitude = g1Wave * envelope;
        const g1ScaleY = Math.max(0.05, g1Amplitude * 4.5);
        
        dummy.position.set(x, 0, -1.5);
        dummy.scale.set(1.2, g1ScaleY, 1);
        dummy.updateMatrix();
        ghostMesh1.setMatrixAt(i, dummy.matrix);

        // 3. Ghost Waveform 2 (Even Slower, Deeper)
        const ghost2Time = time * 0.4;
        const g2Wave = Math.sin(ghost2Time - i * 0.03) * 0.6 + 0.4;
        const g2Amplitude = g2Wave * envelope;
        const g2ScaleY = Math.max(0.05, g2Amplitude * 5.5);
        
        dummy.position.set(x, 0, -3);
        dummy.scale.set(1.5, g2ScaleY, 1);
        dummy.updateMatrix();
        ghostMesh2.setMatrixAt(i, dummy.matrix);
      }
      
      leftMesh.instanceMatrix.needsUpdate = true;
      if (leftMesh.instanceColor) leftMesh.instanceColor.needsUpdate = true;
      
      rightMesh.instanceMatrix.needsUpdate = true;
      if (rightMesh.instanceColor) rightMesh.instanceColor.needsUpdate = true;
      
      ghostMesh1.instanceMatrix.needsUpdate = true;
      ghostMesh2.instanceMatrix.needsUpdate = true;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      orangeMaterial.dispose();
      grayMaterial.dispose();
      ghostMaterial.dispose();
      sparklesGeometry.dispose();
      sparklesMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full bg-black overflow-hidden" 
      style={{ touchAction: "none" }}
    />
  );
}
