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
    <div className="sm:flex sm:flex-col md:flex-row justify-center items-center w-full max-h-max sm:h-[40vh]">
      {/* <div className="border-2 border-red-600 sm:visible"> */}
        <img
          src={imgSrc}
          alt={title}
          className="w-full md:w-2/5 rounded-t-2xl sm:rounded-l-2xl sm:-mr-4 h-[12rem] object-cover object-top"
        />
      {/* </div> */}
      <div className="p-4 md:p-12 rounded-t-none rounded-b-2xl sm:rounded-2xl bg-gray-200 space-y-5 h-[22rem] sm:h-full md:w-3/5 flex flex-col justify-between">
        <div className="w-full flex flex-col gap-4">
          <h3 className="text-xl sm:text-3xl font-bold text-black">{title}</h3>
          <p className="text-gray-600 text-base">
            {description.length > 300
              ? description.substring(0, 300)
              : description}
          </p>
        </div>
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
