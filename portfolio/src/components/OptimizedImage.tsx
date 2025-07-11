import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  quality?: number;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  fill = false,
  width,
  height,
  priority = false,
  sizes,
  onLoad,
  onError,
  quality = 85,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imgRef.current || priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate WebP source if the original is not WebP
  const getWebPSrc = (originalSrc: string) => {
    if (originalSrc.endsWith('.webp')) return originalSrc;
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  const shouldShowImage = isInView || priority;

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className}`}
      style={!fill ? { width, height } : undefined}
    >
      {/* Loading skeleton */}
      {!isLoaded && !hasError && shouldShowImage && (
        <div className="absolute inset-0 bg-gray-800/50 animate-pulse">
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-800/70 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-4xl mb-2">📷</div>
            <div className="text-sm">Image not available</div>
          </div>
        </div>
      )}

      {/* Main image with WebP support */}
      {shouldShowImage && !hasError && (
        <picture>
          {/* WebP source for better compression */}
          <source 
            srcSet={getWebPSrc(src)} 
            type="image/webp"
            sizes={sizes}
          />
          {/* Fallback to original format */}
          <Image
            src={src}
            alt={alt}
            fill={fill}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            className={`transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            priority={priority}
            quality={quality}
            sizes={sizes}
            {...props}
          />
        </picture>
      )}

      {/* Shimmer effect overlay */}
      {!isLoaded && shouldShowImage && !hasError && (
        <div className="absolute inset-0 shimmer" />
      )}
    </div>
  );
}

// Utility function to generate responsive sizes
export const generateSizes = (breakpoints: { [key: string]: string }) => {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(max-width: ${breakpoint}) ${size}`)
    .join(', ');
};
