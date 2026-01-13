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

    const width = window.innerWidth;
    const height = window.innerHeight;

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
    const BAR_WIDTH = 0.06;
    const BAR_DEPTH = 0.2;
    const SPACING = 0.1;
    const WAVEFORM_WIDTH = BAR_COUNT * SPACING;

    // Geometry & Materials
    const geometry = new THREE.BoxGeometry(BAR_WIDTH, 1, BAR_DEPTH);
    
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
    const sparklesCount = 2000;
    const sparklesGeometry = new THREE.BufferGeometry();
    const sparklesPos = new Float32Array(sparklesCount * 3);
    const sparklesVel = new Float32Array(sparklesCount);
    
    for (let i = 0; i < sparklesCount; i++) {
      sparklesPos[i * 3] = (Math.random() - 0.5) * 30;
      sparklesPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      sparklesPos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      sparklesVel[i] = Math.random();
    }
    
    sparklesGeometry.setAttribute('position', new THREE.BufferAttribute(sparklesPos, 3));
    
    const sparklesMaterial = new THREE.PointsMaterial({
      color: 0xffba08, // Golden/Orange Glitter
      size: 0.04,
      transparent: true,
      opacity: 0.6,
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
      camera.position.x = Math.sin(time * 0.2) * 0.4;
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
      sparklesMaterial.opacity = 0.4 + Math.sin(time * 2) * 0.2;
      sparklesGeometry.attributes.position.needsUpdate = true;

      for (let i = 0; i < BAR_COUNT; i++) {
        const x = i * SPACING - WAVEFORM_WIDTH / 2;
        const envelope = Math.pow(Math.sin((i / BAR_COUNT) * Math.PI), 0.6);
        
        // 1. Primary Waveform Calculations
        const slowWave = Math.sin(time * 1.2 + i * 0.05);
        const fastWave = Math.sin(time * 3.5 + i * 0.2) * 0.4;
        const microWave = Math.sin(time * 8.0 - i * 0.1) * 0.15;
        const amplitude = (slowWave + fastWave + microWave + 1.2) * envelope;
        const scaleY = Math.max(0.05, amplitude * 3.5);
        
        dummy.position.set(x, 0, 0);
        dummy.scale.set(1, scaleY, 1);
        dummy.updateMatrix();

        if (i < HALF_COUNT) {
          leftMesh.setMatrixAt(i, dummy.matrix);
          const color = new THREE.Color().lerpColors(colors.orange, colors.accent, Math.min(1, amplitude / 2.5));
          leftMesh.setColorAt(i, color);
        } else {
          rightMesh.setMatrixAt(i - HALF_COUNT, dummy.matrix);
          // Zinc/Silver tones for the right side
          const color = new THREE.Color().copy(colors.gray).multiplyScalar(0.8 + Math.sin(time + i * 0.1) * 0.2);
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
      const w = window.innerWidth;
      const h = window.innerHeight;
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

