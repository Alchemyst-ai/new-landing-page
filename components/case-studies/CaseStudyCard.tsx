import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CaseStudyCardProps {
  title: string;
  image: string;
  imagePosition: "left" | "right";
  customerUrl: string;
  onVisitStudy: () => void;
}

export default function CaseStudyCard({
  title,
  image,
  imagePosition,
  customerUrl,
  onVisitStudy,
}: CaseStudyCardProps) {
  const imageColumn = (
    <div
      className={`w-full ${imagePosition === "left" ? "md:w-1/3" : "md:w-1/3"}`}
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        width={400}
        height={300}
        className="w-full h-auto object-cover rounded-lg border border-transparent bg-gradient-to-r from-orange-500 to-white"
      />
    </div>
  );

  const contentColumn = (
    <div
      className={`w-full ${
        imagePosition === "left" ? "md:w-2/3" : "md:w-2/3"
      } space-y-4`}
    >
      <h3 className="text-2xl font-bold">{title}</h3>
      <div className="space-x-4 pt-5">
        <Button
          variant="outline"
          onClick={onVisitStudy}
          className="transition-all duration-200 hover:scale-110 hover:bg-teal-600"
        >
          Visit the study
        </Button>
        <Button
          variant="outline"
          asChild
          className="transition-all duration-200 hover:scale-110 hover:bg-teal-600"
        >
          <a
            href={customerUrl}
            target="_blank"
            rel="noopener noreferrer hover:bg-teal-600"
          >
            Visit Customer
          </a>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center bg-black p-8 rounded-xl shadow-lg border border-gray-500">
      {imagePosition === "left" ? (
        <>
          {imageColumn}
          {contentColumn}
        </>
      ) : (
        <>
          {contentColumn}
          {imageColumn}
        </>
      )}
    </div>
  );
}
