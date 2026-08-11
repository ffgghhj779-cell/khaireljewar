import Image, { type ImageProps } from 'next/image'
import { IMAGE_BLUR_DATA_URL, IMAGE_QUALITY } from '@/lib/constants/images'
import { cn } from '@/lib/utils/cn'

type PremiumImageProps = ImageProps & {
  withBlur?: boolean
}

/** Brand photography via Next.js optimizer — AVIF/WebP + responsive srcset */
export default function PremiumImage({
  className,
  withBlur = true,
  placeholder,
  unoptimized = false,
  quality,
  ...props
}: PremiumImageProps) {
  return (
    <Image
      {...props}
      quality={quality ?? IMAGE_QUALITY}
      unoptimized={unoptimized || (typeof props.src === 'string' && props.src.endsWith('.webp') && props.src.includes('/images/brand/'))}
      placeholder={withBlur ? placeholder ?? 'blur' : placeholder}
      blurDataURL={withBlur ? IMAGE_BLUR_DATA_URL : undefined}
      className={cn(className)}
    />
  )
}
