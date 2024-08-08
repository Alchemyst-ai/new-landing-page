/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

interface CoverageCardProps {
  title: string;
  description: string;
  imgSrc: string;
  link: string;
  date: string;
}

const CoverageCard: React.FC<CoverageCardProps> = ({
  title,
  description,
  imgSrc,
  link,
  date,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full h-[40vh]">
      <img
        src={imgSrc}
        alt={title}
        className="object-cover w-full md:w-2/5 h- rounded-l-2xl -mr-4"
      />
      <div className="p-4 md:p-12 rounded-2xl bg-gray-200 space-y-5 h-full md:w-3/5 flex flex-col justify-evenly ">
        <h3 className="text-3xl font-bold text-black">{title}</h3>
        <p className="text-gray-600 text-base">
          {description.length > 300
            ? description.substring(0, 300)
            : description}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-gray-400">{date}</p>
          <Link
            passHref
            target="_blank"
            className="text-sm text-blue-500"
            href={link}
          >
            <p className="flex justify-center items-center gap-1">
              Read more{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoverageCard;
