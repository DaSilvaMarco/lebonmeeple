import React, { useState, CSSProperties } from 'react';
import NextImage from 'next/image';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  fallbackSrc?: string;
  className?: string;
  style?: CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
};

const Image = (props: Props) => {
  const {
    src,
    alt,
    width,
    height,
    fill = false,
    priority = false,
    quality = 75,
    sizes,
    objectFit = 'cover',
    fallbackSrc,
    className,
    style,
    onLoad,
    onError,
  } = props;
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (fallbackSrc && imageSrc !== fallbackSrc && !hasError) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
    onError?.();
  };

  const handleLoad = () => {
    setHasError(false);
    onLoad?.();
  };

  const imageStyle: CSSProperties = {
    objectFit,
    ...style,
  };

  if (fill) {
    return (
      <NextImage
        src={imageSrc}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        sizes={sizes}
        onError={handleError}
        onLoad={handleLoad}
        style={imageStyle}
        className={className}
      />
    );
  }

  console.log('NEXT IMAGE : ', src);

  return (
    <NextImage
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={quality}
      sizes={sizes}
      onError={handleError}
      onLoad={handleLoad}
      style={imageStyle}
      className={className}
    />
  );
};

export default Image;
