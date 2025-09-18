import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { useEffect, useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

type ImgProps = Omit<NextImageProps, 'src'> & {
  src?: string | null
  fallbackBgClass?: string
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackBgClass = 'bg-gray-100 dark:bg-gray-900',
  ...rest
}: ImgProps) {
  const [didError, setDidError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setDidError(false)
    setIsLoaded(false)
  }, [src])

  const onError = () => setDidError(true)
  const onLoad = () => setIsLoaded(true)

  if (!src || didError) {
    return (
      <div
        className={`inline-block rounded overflow-hidden ${fallbackBgClass} text-gray-700 dark:text-gray-200 w-full h-full ${className}`}
        role="img"
        aria-label={alt ?? 'Image failed to load'}
      >
        <div className="flex items-center justify-center w-full h-full p-4">
          <img src={ERROR_IMG_SRC} alt={alt ?? 'Error loading image'} />
        </div>
      </div>
    )
  }

  // If width/height passed, render regular NextImage. Otherwise use fill mode with a sensible default height.
  const hasDims = typeof (rest as NextImageProps).width === 'number' && typeof (rest as NextImageProps).height === 'number'

  return (
    <div className={`relative inline-block w-full ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 dark:bg-muted/30 z-10">
          <div className="w-10 h-10 rounded-full animate-pulse bg-muted/40 dark:bg-muted/60" />
        </div>
      )}

      {hasDims ? (
        <NextImage
          {...(rest as NextImageProps)}
          src={src}
          alt={alt ?? ''}
          onError={onError}
          onLoadingComplete={onLoad}
          className={`${!isLoaded ? 'opacity-0' : ''}`}
        />
      ) : (
        <div className="relative w-full h-56 sm:h-64 md:h-72">
          <NextImage
            {...(rest as NextImageProps)}
            src={src}
            alt={alt ?? ''}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            onError={onError}
            onLoadingComplete={onLoad}
            className={`${!isLoaded ? 'opacity-0' : ''}`}
          />
        </div>
      )}
    </div>
  )
}
