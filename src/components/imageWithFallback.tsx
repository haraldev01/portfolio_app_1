"use client";

import { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {}

export default function ImageWithFallback({
  children,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [props.src]);

  return error ? (
    children
  ) : (
    <Image onError={() => setError(true)} alt={alt} {...props} />
  );
}
