import Image from "next/image";

import { cn } from "@/lib/utils";

interface SmartImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

/**
 * One image component used for every picture you add:
 *  - local raster files (/logos/…, /images/…) go through next/image (optimized)
 *  - remote URLs and .svg files are rendered as a plain <img>, so no image
 *    domain config and no dangerouslyAllowSVG flag is ever needed
 */
export function SmartImage({
  src,
  alt,
  width,
  height,
  className,
}: SmartImageProps) {
  const isRemote = /^https?:\/\//i.test(src);
  const isSvg = /\.svg(\?.*)?$/i.test(src);

  if (isRemote || isSvg) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={cn(className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(className)}
    />
  );
}
