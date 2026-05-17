
"use client";

import React, { useEffect, useRef, useState } from 'react';

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    // Enhanced star system
    const stars: { x: number; y: number; z: number; color: string; size: number }[] = [];
    for (let i = 0; i < 800; i++) {
      const colors = ['#ffffff', '#00ffff', '#ff00ff', '#ffff00', '#ff8000'];
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 3 + 1,
      });
    }

    // Floating particles
    const particles: { x: number; y: number; vx: number; vy: number; alpha: number; color: string }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.3,
        color: '#00ffff',
      });
    }

    // Grid lines for cyberpunk effect
    const gridLines: { x: number; y: number; width: number; height: number; alpha: number }[] = [];
    for (let i = 0; i < 20; i++) {
      gridLines.push({
        x: Math.random() * width,
        y: Math.random() * height,
        width: Math.random() * 200 + 100,
        height: Math.random() * 200 + 100,
        alpha: Math.random() * 0.3 + 0.1,
      });
    }

    // Neural network nodes
    const neuralNodes: { x: number; y: number; connections: number[]; pulse: number }[] = [];
    for (let i = 0; i < 8; i++) {
      neuralNodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        connections: [],
        pulse: Math.random() * Math.PI * 2,
      });
    }
    // Create random connections
    neuralNodes.forEach((node, i) => {
      const numConnections = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numConnections; j++) {
        const targetIndex = Math.floor(Math.random() * neuralNodes.length);
        if (targetIndex !== i && !node.connections.includes(targetIndex)) {
          node.connections.push(targetIndex);
        }
      }
    });

    // Digital rain/data streams
    const dataStreams: { x: number; y: number; chars: string[]; speed: number; alpha: number }[] = [];
    for (let i = 0; i < 15; i++) {
      const chars = ['0', '1', 'A', 'I', 'M', 'L', 'D', 'L', '∂', '∑', '∆', '∴', '∵', '∈'];
      dataStreams.push({
        x: Math.random() * width,
        y: Math.random() * height - 200,
        chars: Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]),
        speed: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let time = 0;

    const draw = () => {
      if (!ctx) return;

      time += 0.016;

      // Dark gradient background
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(0.5, '#1a0a1a');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (const line of gridLines) {
        ctx.globalAlpha = line.alpha * (0.5 + 0.5 * Math.sin(time + line.x * 0.01));
        ctx.strokeRect(line.x, line.y, line.width, line.height);
        
        // Move grid lines slowly
        line.x += 0.1;
        line.y += 0.05;
        if (line.x > width) line.x = -line.width;
        if (line.y > height) line.y = -line.height;
      }

      // Draw floating particles
      ctx.globalAlpha = 1;
      for (const particle of particles) {
        ctx.fillStyle = `rgba(0, 255, 255, ${particle.alpha * (0.5 + 0.5 * Math.sin(time * 2))})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x > width) particle.x = 0;
        if (particle.x < 0) particle.x = width;
        if (particle.y > height) particle.y = 0;
        if (particle.y < 0) particle.y = height;
      }

      // Draw neural network
      if (Math.sin(time * 0.3) > 0.8) { // Show occasionally
        ctx.strokeStyle = 'rgba(255, 0, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Draw connections
        for (const node of neuralNodes) {
          for (const connectionIndex of node.connections) {
            const targetNode = neuralNodes[connectionIndex];
            if (targetNode) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(targetNode.x, targetNode.y);
              ctx.stroke();
            }
          }
        }
        
        // Draw nodes
        for (const node of neuralNodes) {
          node.pulse += 0.1;
          const pulseSize = 3 + Math.sin(node.pulse) * 2;
          
          ctx.fillStyle = 'rgba(255, 0, 255, 0.6)';
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Add glow
          ctx.shadowColor = '#ff00ff';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseSize / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          
          // Slowly move nodes
          node.x += (Math.random() - 0.5) * 0.1;
          node.y += (Math.random() - 0.5) * 0.1;
          
          // Keep nodes on screen
          if (node.x < 0) node.x = width;
          if (node.x > width) node.x = 0;
          if (node.y < 0) node.y = height;
          if (node.y > height) node.y = 0;
        }
      }

      // Draw digital rain/data streams
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      for (const stream of dataStreams) {
        for (let i = 0; i < stream.chars.length; i++) {
          const char = stream.chars[i];
          const y = stream.y + i * 20;
          const alpha = stream.alpha * (1 - i / stream.chars.length);
          
          ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
          ctx.fillText(char, stream.x, y);
        }
        
        stream.y += stream.speed;
        if (stream.y > height + 200) {
          stream.y = -200;
          stream.x = Math.random() * width;
        }
        
        // Occasionally change characters
        if (Math.random() < 0.02) {
          const charIndex = Math.floor(Math.random() * stream.chars.length);
          const chars = ['0', '1', 'A', 'I', 'M', 'L', 'D', 'L', '∂', '∑', '∆', '∴', '∵', '∈'];
          stream.chars[charIndex] = chars[Math.floor(Math.random() * chars.length)];
        }
      }

      // Draw digital rain/data streams
      for (const stream of dataStreams) {
        ctx.fillStyle = `rgba(0, 255, 255, ${stream.alpha})`;
        ctx.font = '12px monospace';
        
        for (let i = 0; i < stream.chars.length; i++) {
          const y = stream.y + i * 15;
          if (y > 0 && y < height + 20) {
            const alpha = stream.alpha * (1 - i * 0.1);
            ctx.fillStyle = `rgba(0, 255, 255, ${Math.max(0, alpha)})`;
            ctx.fillText(stream.chars[i], stream.x, y);
          }
        }
        
        // Update stream position
        stream.y += stream.speed;
        
        // Reset when off screen
        if (stream.y > height + 100) {
          stream.y = -100;
          stream.x = Math.random() * width;
          // Change characters occasionally
          if (Math.random() < 0.1) {
            const chars = ['0', '1', 'A', 'I', 'M', 'L', 'D', 'L', '∂', '∑', '∆', '∴', '∵', '∈'];
            stream.chars = Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]);
          }
        }
      }

      // Enhanced starfield
      ctx.save();
      ctx.translate(width / 2, height / 2);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= 3; // Faster movement

        if (star.z < 1) {
          star.z = width * 2;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        const k = width / star.z;
        const px = star.x * k;
        const py = star.y * k;

        const size = (1 - star.z / (width * 2)) * star.size * 3;
        const alpha = 1 - star.z / (width * 2);
        
        // Create glowing effect for some stars
        if (i % 5 === 0) {
          ctx.shadowColor = star.color;
          ctx.shadowBlur = 15;
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();

        // Draw star trails for fast-moving stars
        if (size > 2) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = size / 2;
          ctx.globalAlpha = alpha * 0.3;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px - (star.x * k * 0.02), py - (star.y * k * 0.02));
          ctx.stroke();
        }

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      ctx.restore();

      // Add some random flashes/pulses
      if (Math.random() < 0.005) {
        const flashX = Math.random() * width;
        const flashY = Math.random() * height;
        const flashRadius = Math.random() * 100 + 50;
        
        const flashGradient = ctx.createRadialGradient(flashX, flashY, 0, flashX, flashY, flashRadius);
        flashGradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
        flashGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
        
        ctx.fillStyle = flashGradient;
        ctx.beginPath();
        ctx.arc(flashX, flashY, flashRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-50" />;
};

export default Starfield;
