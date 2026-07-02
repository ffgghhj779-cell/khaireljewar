import Image, { type ImageProps } from 'next/image'
import { IMAGE_BLUR_DATA_URL, IMAGE_QUALITY, isLocalBrandImage } from '@/lib/constants/images'
import { cn } from '@/lib/utils/cn'

type PremiumImageProps = ImageProps & {
  withBlur?: boolean
}

/** Full-quality rendering for brand photography — skips lossy recompression on local assets */
export default function PremiumImage({
  className,
  withBlur = true,
  placeholder,
  unoptimized,
  quality,
  ...props
}: PremiumImageProps) {
  const local = typeof props.src === 'string' && isLocalBrandImage(props.src)

  return (
    <Image
      {...props}
      quality={quality ?? IMAGE_QUALITY}
      unoptimized={unoptimized ?? local}
      placeholder={withBlur ? placeholder ?? 'blur' : placeholder}
      blurDataURL={withBlur ? IMAGE_BLUR_DATA_URL : undefined}
      className={cn(className)}
    />
  )
}
