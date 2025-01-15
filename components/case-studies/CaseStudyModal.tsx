import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CaseStudyModalProps {
  study: {
    title: string;
    image: string;
    customerUrl: string;
    content: string;
  };
  onClose: () => void;
}

export default function CaseStudyModal({
  study,
  onClose,
}: CaseStudyModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black text-white w-full h-full overflow-auto p-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
          <Image
            src={study.image || "/placeholder.svg"}
            alt={study.title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover rounded-lg mb-8"
          />
          <Button variant="outline" asChild className="mb-8 transition-all duration-200 hover:scale-105 hover:bg-teal-600">
            <a
              href={study.customerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Customer Website
            </a>
          </Button>
          <h2 className="text-3xl font-bold mb-4">{study.title}</h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: study.content }}
          />
        </div>
      </div>
    </div>
  );
}
