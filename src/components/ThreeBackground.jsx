'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const ThreeBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance

        // Check if container still exists before appending
        if (!containerRef.current) return;
        containerRef.current.appendChild(renderer.domElement);

        camera.position.z = 200;

        // Particle System
        const particleCount = 100; // Reduced for performance with lines
        const particles = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleVelocities = [];

        // Initial Positions & Velocities
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * 400 - 200;
            const y = Math.random() * 400 - 200;
            const z = Math.random() * 400 - 200;

            particlePositions[i * 3] = x;
            particlePositions[i * 3 + 1] = y;
            particlePositions[i * 3 + 2] = z;

            particleVelocities.push({
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5,
                z: (Math.random() - 0.5) * 0.5
            });
        }

        particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

        // Particle Material
        const particleMaterial = new THREE.PointsMaterial({
            color: 0x06b6d4, // Cyan
            size: 2,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);

        // Lines Geometry
        const linesGeometry = new THREE.BufferGeometry();
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x06b6d4,
            transparent: true,
            opacity: 0.15
        });

        const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
        scene.add(linesMesh);

        // Tech Icons/Logos (Text Sprites)
        const techSymbols = ['</>', '{ }', 'JS', 'TS', 'React', 'Node', 'HTML', 'CSS', 'Next', 'Tailwind'];
        const sprites = [];

        const createTextTexture = (text, color) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 256;
            canvas.height = 128; // Rectangular shape

            ctx.fillStyle = 'rgba(0,0,0,0)'; // Transparent background
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = 'Bold 60px Arial'; // Larger font
            ctx.fillStyle = color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);

            const texture = new THREE.CanvasTexture(canvas);
            texture.needsUpdate = true;
            return texture;
        };

        techSymbols.forEach(symbol => {
            const color = Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6'; // Randomly Cyan or Violet
            const texture = createTextTexture(symbol, color);
            const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.7 });
            const sprite = new THREE.Sprite(material);

            sprite.position.set(
                (Math.random() - 0.5) * 300,
                (Math.random() - 0.5) * 300,
                (Math.random() - 0.5) * 300
            );

            // Random scales
            const scale = Math.random() * 20 + 10;
            sprite.scale.set(scale * 2, scale, 1); // Maintain aspect ratio roughly

            sprite.velocity = {
                x: (Math.random() - 0.5) * 0.2,
                y: (Math.random() - 0.5) * 0.2,
                z: (Math.random() - 0.5) * 0.2
            };

            sprites.push(sprite);
            scene.add(sprite);
        });

        // Interaction
        let mouseX = 0;
        let mouseY = 0;

        const onMouseMove = (event) => {
            mouseX = (event.clientX - window.innerWidth / 2) * 0.5;
            mouseY = (event.clientY - window.innerHeight / 2) * 0.5;
        };

        document.addEventListener('mousemove', onMouseMove);

        // Animation Loop
        const animate = () => {
            const positions = particleSystem.geometry.attributes.position.array;

            // Move Particles
            for (let i = 0; i < particleCount; i++) {
                // Update position
                positions[i * 3] += particleVelocities[i].x;
                positions[i * 3 + 1] += particleVelocities[i].y;
                positions[i * 3 + 2] += particleVelocities[i].z;

                // Boundary check (bounce back)
                if (positions[i * 3] < -200 || positions[i * 3] > 200) particleVelocities[i].x = -particleVelocities[i].x;
                if (positions[i * 3 + 1] < -200 || positions[i * 3 + 1] > 200) particleVelocities[i].y = -particleVelocities[i].y;
                if (positions[i * 3 + 2] < -200 || positions[i * 3 + 2] > 200) particleVelocities[i].z = -particleVelocities[i].z;
            }

            particleSystem.geometry.attributes.position.needsUpdate = true;

            // Connect Particles with Lines
            const linePositions = [];
            const connectionDistance = 60;

            for (let i = 0; i < particleCount; i++) {
                for (let j = i + 1; j < particleCount; j++) {
                    const dx = positions[i * 3] - positions[j * 3];
                    const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                    const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (distance < connectionDistance) {
                        linePositions.push(
                            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                        );
                    }
                }
            }

            linesMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

            // Move Sprites (Floating Logos)
            sprites.forEach(sprite => {
                sprite.position.x += sprite.velocity.x;
                sprite.position.y += sprite.velocity.y;
                sprite.position.z += sprite.velocity.z;

                // Boundary Wrap (Infinite Float)
                if (sprite.position.x > 200) sprite.position.x = -200;
                if (sprite.position.x < -200) sprite.position.x = 200;
                if (sprite.position.y > 200) sprite.position.y = -200;
                if (sprite.position.y < -200) sprite.position.y = 200;
                if (sprite.position.z > 200) sprite.position.z = -200;
                if (sprite.position.z < -200) sprite.position.z = 200;
            });

            // System Rotation & Mouse Interaction
            scene.rotation.y += 0.001;
            scene.rotation.x += 0.0005;

            // Smooth camera/scene movement based on mouse
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        // Resize Handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', onMouseMove);

            // Dispose of all resources properly
            particles.dispose();
            linesGeometry.dispose();
            particleMaterial.dispose();
            lineMaterial.dispose();

            // Dispose sprite materials and textures
            sprites.forEach(sprite => {
                if (sprite.material.map) sprite.material.map.dispose();
                sprite.material.dispose();
            });

            // Remove renderer DOM element
            if (containerRef.current && renderer.domElement) {
                try {
                    containerRef.current.removeChild(renderer.domElement);
                } catch (e) {
                    // Element may already be removed
                }
            }

            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
    );
};

export default ThreeBackground;
