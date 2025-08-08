import Image from 'next/image'

interface UseCaseFeatureProps {
  title: string
  description: string
  imagePath: string
  imageAlt: string
}

export function UseCaseFeature({ title, description, imagePath, imageAlt }: UseCaseFeatureProps) {
  return (
    <div className="rounded-2xl bg-card overflow-hidden">
      <div className="relative w-full h-[320px] bg-muted flex items-center justify-center">
        <div className="relative w-full h-full max-w-full max-h-full">
          <Image
            src={imagePath}
            alt={imageAlt}
            fill
            className="object-contain h-full w-full"
          />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-foreground mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground text-base">
          {description}
        </p>
      </div>
    </div>
  )
} 