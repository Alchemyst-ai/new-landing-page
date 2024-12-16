//"use client";
// import { cn } from "@/app/lib/utils";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";
// import { useState } from "react";

// export const HoverEffect = ({
//   items,
//   className,
// }: {
//   items: {
//     title: string;
//     description: string;
//     link: string;
//   }[];
//   className?: string;
// }) => {
//   let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   return (
//     <div
//       className={cn(
//         "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
//         className
//       )}
//     >
//       {items.map((item, idx) => (
//         <Link
//           href={item?.link}
//           key={item?.link}
//           className="relative group  block p-2 h-full w-full"
//           onMouseEnter={() => setHoveredIndex(idx)}
//           onMouseLeave={() => setHoveredIndex(null)}
//         >
//           <AnimatePresence>
//             {hoveredIndex === idx && (
//               <motion.span
//                 className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-[#fe9833]/[0.8] block rounded-3xl"
//                 layoutId="hoverBackground"
//                 initial={{ opacity: 0 }}
//                 animate={{
//                   opacity: 1,
//                   transition: { duration: 0.15 },
//                 }}
//                 exit={{
//                   opacity: 0,
//                   transition: { duration: 0.15, delay: 0.2 },
//                 }}
//               />
//             )}
//           </AnimatePresence>
//           <Card>
//             <CardTitle>{item.title}</CardTitle>
//             <CardDescription>{item.description}</CardDescription>
//           </Card>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export const Card = ({
//   className,
//   children,
// }: {
//   className?: string;
//   children: React.ReactNode;
// }) => {
//   return (
//     <div
//       className={cn(
//         "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
//         className
//       )}
//     >
//       <div className="relative z-50">
//         <div className="p-4">{children}</div>
//       </div>
//     </div>
//   );
// };
// export const CardTitle = ({
//   className,
//   children,
// }: {
//   className?: string;
//   children: React.ReactNode;
// }) => {
//   return (
//     <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
//       {children}
//     </h4>
//   );
// };
// export const CardDescription = ({
//   className,
//   children,
// }: {
//   className?: string;
//   children: React.ReactNode;
// }) => {
//   return (
//     <p
//       className={cn(
//         "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
//         className
//       )}
//     >
//       {children}
//     </p>
//   );
// };


"use client";
import { cn } from "@/app/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

// HoverEffect component to display items with hover animation
export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    image: string;
    link: string;
  }[];
  className?: string;
}) => {
  // State to track the currently hovered item index
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 py-10", className)}>
      <div className="grid grid-cols-1 gap-4">
        {items.slice(0, 2).map((item, idx) => (
          <Link
            href={item?.link}
            key={item?.link}
            className="relative group block h-1/2 w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Card className="h-full">
              <CardImage src={item.image} alt={item.title} />
              <CardTitle>{item.title}</CardTitle>
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black bg-opacity-50"
                  >
                    <div className="p-4">
                      <h3 className="text-white">{item.title}</h3>
                    </div>
                  </motion.span>
                )}
              </AnimatePresence>
            </Card>
          </Link>
        ))}
      </div>
      <div className="h-full">
        {items.slice(2, 3).map((item, idx) => (
          <Link
            href={item?.link}
            key={item?.link}
            className="relative group block h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Card className="h-full">
              <CardImage src={item.image} alt={item.title} />
              <CardTitle>{item.title}</CardTitle>
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black bg-opacity-50"
                  >
                    <div className="p-4">
                      <h3 className="text-white">{item.title}</h3>
                    </div>
                  </motion.span>
                )}
              </AnimatePresence>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Card component to display individual items
export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

// CardTitle component to display the title of the card
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h3 className={cn("text-xl font-bold text-white mt-4", className)}>
      {children}
    </h3>
  );
};

// CardImage component to display the image of the card
export const CardImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("w-full h-48 object-cover rounded-t-2xl", className)}
    />
  );
};


