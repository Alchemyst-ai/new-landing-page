import Image from 'next/image'

interface UseCaseFeatureProps {
  title: string
  description: string
  imagePath: string
  imageAlt: string
}

export function UseCaseFeature({ title, description, imagePath, imageAlt }: UseCaseFeatureProps) {
  return (
    <div className="rounded-2xl bg-[#1C1C1C] overflow-hidden">
      <div className="relative w-[500px] h-[600px] bg-[#242424]">
        <Image
          src={imagePath}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-400 text-base">
          {description}
        </p>
      </div>
    </div>
  )
} 