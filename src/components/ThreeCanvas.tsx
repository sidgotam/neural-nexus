import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene with dark, ambient futuristic fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020208, 0.012);

    // Camera setup with broad perspective
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.set(0, 3, 20);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Main layout group for mouse-parallax scaling
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Digital Ground Matrix Grid
    const gridHelper = new THREE.GridHelper(150, 75, 0x00FFAA, 0x7700FF);
    gridHelper.position.y = -7.5;
    if (gridHelper.material instanceof THREE.Material) {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.15;
    }
    mainGroup.add(gridHelper);

    // 2. Futuristic Cyberpunk City Skyline (Holographic Wireframe Extrusions)
    const buildingsGroup = new THREE.Group();
    buildingsGroup.position.set(0, -7.5, -45);
    mainGroup.add(buildingsGroup);

    const numBuildings = 65;
    const buildingMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < numBuildings; i++) {
      const bWidth = 2 + Math.random() * 5;
      const bHeight = 10 + Math.random() * 32;
      const bDepth = 2 + Math.random() * 5;

      const geo = new THREE.BoxGeometry(bWidth, bHeight, bDepth);
      const mat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.4 ? 0x00F0FF : 0x7700FF,
        wireframe: true,
        transparent: true,
        opacity: 0.06 + Math.random() * 0.08,
      });

      const building = new THREE.Mesh(geo, mat);
      // Scatter buildings in grid structure behind the main sphere
      building.position.set(
        (Math.random() - 0.5) * 110,
        bHeight / 2,
        (Math.random() - 0.5) * 45
      );
      buildingsGroup.add(building);
      buildingMeshes.push(building);
    }

    // 3. Central Pulsing 3D AI Core Sphere & Orbital Stabilizers
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 2, -5);
    mainGroup.add(coreGroup);

    // Central Sphere Core (Highly detailed segments)
    const coreGeo = new THREE.SphereGeometry(3.5, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00FFAA,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreSphere);

    // Pulsing inner nucleus
    const nucleusGeo = new THREE.SphereGeometry(1.6, 16, 16);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xFF0066,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    const nucleusSphere = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleusSphere);

    // Stabilizer Rings (Intersecting Torus Rings)
    const ringGeo1 = new THREE.TorusGeometry(5.2, 0.06, 8, 48);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(5.9, 0.04, 8, 48);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x7700FF,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    coreGroup.add(ring2);

    // 4. Volumetric Cyber Traffic / Drones
    const droneGroup = new THREE.Group();
    mainGroup.add(droneGroup);

    const numDrones = 12;
    const drones: { mesh: THREE.Points; pathSpeed: number; pathRadius: number; pathOffset: number; altitude: number }[] = [];

    for (let i = 0; i < numDrones; i++) {
      const dGeo = new THREE.BufferGeometry();
      dGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
      
      const dMat = new THREE.PointsMaterial({
        color: Math.random() > 0.5 ? 0xFF0066 : 0x00F0FF,
        size: 0.45,
        transparent: true,
        opacity: 0.9,
      });

      const dMesh = new THREE.Points(dGeo, dMat);
      droneGroup.add(dMesh);

      drones.push({
        mesh: dMesh,
        pathSpeed: 0.005 + Math.random() * 0.01,
        pathRadius: 15 + Math.random() * 25,
        pathOffset: Math.random() * Math.PI * 2,
        altitude: -4 + Math.random() * 14,
      });
    }

    // 5. 3D Volumetric Falling Rain Particle System
    const numRaindrops = 220;
    const rainPositions = new Float32Array(numRaindrops * 3);
    const rainSpeeds: number[] = [];

    for (let i = 0; i < numRaindrops; i++) {
      // Coordinate scatter
      rainPositions[i * 3] = (Math.random() - 0.5) * 85;
      rainPositions[i * 3 + 1] = 15 + Math.random() * 30; // High in sky
      rainPositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      
      rainSpeeds.push(0.35 + Math.random() * 0.4);
    }

    const rainGeo = new THREE.BufferGeometry();
    rainGeo.setAttribute('position', new THREE.Float32BufferAttribute(rainPositions, 3));
    const rainMat = new THREE.PointsMaterial({
      color: 0x00F0FF,
      size: 0.08,
      transparent: true,
      opacity: 0.35,
    });
    const rainSystem = new THREE.Points(rainGeo, rainMat);
    mainGroup.add(rainSystem);

    // 6. Neural Network Dust Network
    const dustCount = 120;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 90;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      dustPositions[i * 3 + 2] = -15 - Math.random() * 35;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.Float32BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x7700FF,
      size: 0.15,
      transparent: true,
      opacity: 0.45,
    });
    const dustSystem = new THREE.Points(dustGeo, dustMat);
    mainGroup.add(dustSystem);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    const pinkSpotlight = new THREE.SpotLight(0xFF0066, 2, 45, Math.PI / 4, 0.5, 1);
    pinkSpotlight.position.set(-15, 12, 10);
    scene.add(pinkSpotlight);

    const cyanSpotlight = new THREE.SpotLight(0x00F0FF, 2, 45, Math.PI / 4, 0.5, 1);
    cyanSpotlight.position.set(15, 12, 10);
    scene.add(cyanSpotlight);

    // Parallax Coordinates
    let mouseX = 0;
    let mouseY = 0;
    const targetX = 0;
    const targetY = 3;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.015;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.015;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // High-performance timer replaces THREE.Clock
    let lastTime = performance.now();
    let elapsed = 0;
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = (now - lastTime) * 0.001;
      lastTime = now;
      elapsed += delta;

      // Rotate Main Core elements
      coreSphere.rotation.y = elapsed * 0.12;
      coreSphere.rotation.z = elapsed * 0.04;
      nucleusSphere.rotation.y = -elapsed * 0.25;
      
      // Pulse nucleus scale dynamically
      const pulseScale = 1.0 + Math.sin(elapsed * 4) * 0.12;
      nucleusSphere.scale.set(pulseScale, pulseScale, pulseScale);

      // Rotate stabilizers in opposite axes
      ring1.rotation.z = elapsed * 0.25;
      ring2.rotation.z = -elapsed * 0.35;

      // Animate flying cyber-traffic / drones
      drones.forEach(d => {
        const angle = elapsed * d.pathSpeed + d.pathOffset;
        const x = Math.sin(angle) * d.pathRadius;
        const z = Math.cos(angle) * d.pathRadius - 10;
        const y = d.altitude + Math.sin(elapsed * 2 + d.pathOffset) * 2;
        
        const posAttr = d.mesh.geometry.getAttribute('position') as THREE.BufferAttribute;
        posAttr.setXYZ(0, x, y, z);
        posAttr.needsUpdate = true;
      });

      // Animate rain falling down
      const rainPosAttr = rainSystem.geometry.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < numRaindrops; i++) {
        let y = rainPosAttr.getY(i);
        y -= rainSpeeds[i];
        // Reset when raindrop hits base
        if (y < -8) {
          y = 20 + Math.random() * 20;
        }
        rainPosAttr.setY(i, y);
      }
      rainPosAttr.needsUpdate = true;

      // Parallax smooth camera drift based on mouse
      camera.position.x += (targetX + mouseX - camera.position.x) * 0.06;
      camera.position.y += (targetY - mouseY - camera.position.y) * 0.06;
      camera.lookAt(0, 1.5, -5);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full -z-10 bg-cyber-black pointer-events-none"
    />
  );
};
