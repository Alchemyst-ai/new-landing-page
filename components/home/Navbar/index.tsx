"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import Button from "../Button";
import DropdownMenu from "./DropdownMenu";
import { menuData, MenuObject } from "../../types/menu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setOpenSubmenus([]);
  };

  const handleMouseEnter = (title: string) => {
    setActiveMenu(title);
  };

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const renderMobileMenuItem = (item: MenuObject, depth: number = 0) => {
    const isSubmenuOpen = openSubmenus.includes(item.title);

    return (
      <div key={item.title} className={`w-full ${depth > 0 ? "ml-4" : ""}`}>
        <div className="flex items-center justify-between w-full">
          <Link
            href={item.link || "#"}
            className={`flex items-center py-2 text-white hover:text-orange-00 transition-colors duration-200 ${item.style
              ? Object.entries(item.style)
                .map(([k, v]) => `${k}:${v}`)
                .join(";")
              : ""
              }`}
            onClick={toggleMenu}
          >
            {item.icon && (
              <Image
                src={item.icon || "/placeholder.svg"}
                alt={item.title}
                width={24}
                height={24}
                className="mr-3"
              />
            )}
            <span>{item.title}</span>
          </Link>
          {item.children && (
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu(item.title);
              }}
              className="p-2"
            >
              {isSubmenuOpen ? (
                <ChevronUp className="w-4 h-4 text-white" />
              ) : (
                <ChevronDown className="w-4 h-4 text-white" />
              )}
            </button>
          )}
        </div>
        <AnimatePresence>
          {isSubmenuOpen && item.children && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {item.children.map((subItem) =>
                renderMobileMenuItem(subItem, depth + 1)
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <nav
      ref={navRef}
      className="top-0 py-4 px-8 flex justify-between items-center w-full md:w-[70%]"
    >
      {/* Alchemyst Logo */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="mr-4 -ml-4">
          <Image
            src="/logo/alchemyst_long_dark.svg"
            alt="Alchemyst AI"
            width={200}
            height={200}
            className="h-11 w-auto -mt-4"
          />
        </Link>

        {/* Nav Items Dropdown */}
        <div className="hidden md:flex items-center space-x-4">
          {menuData.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.title)}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  href={item.link || "#"}
                  className={`flex items-center space-x-1 hover:text-orange-00 transition-colors duration-200 ${activeMenu === item.title ? "text-orange-00" : ""
                    }`}
                >
                  <span>{item.title}</span>
                  {item.children && (
                    <motion.div
                      animate={{ rotate: activeMenu === item.title ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  )}
                </Link>
              </motion.div>
            </div>
          ))}

          {/* Pricing Link */}
          {/* <Link href="/pricing">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="hover:text-orange-00 transition-colors duration-200"
            >
              Pricing
            </motion.div>
          </Link> */}
        </div>

        {/* Centralized Dropdown Menu */}
        <AnimatePresence>
          {activeMenu && (
            <DropdownMenu
              item={menuData.find((item) => item.title === activeMenu)!}
              isOpen={!!activeMenu}
              onClose={() => setActiveMenu(null)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Partner with us button and Book a Demo */}
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-4">
          <Link href="https://tripetto.app/run/60HWNW0WQN" target="_blank">
            <Button
              variant="secondary"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0V11.25"
                  />
                </svg>
              }
            >
              Get in Touch
            </Button>
          </Link>
          <Link
            href="https://calendly.com/sid-bains-alchemystai"
            target="_blank"
          >
            <Button variant="primary">Book a demo</Button>
          </Link>
        </div>
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mounted && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-start pt-4 px-8 space-y-4 overflow-y-auto"
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center w-full mb-6">
                <Link href="/" onClick={toggleMenu}>
                  <Image
                    src="/logo/alchemyst_long_dark.svg"
                    alt="Alchemyst AI"
                    width={150}
                    height={150}
                    className="h-8 w-auto"
                  />
                </Link>
                <button
                  className="focus:outline-none"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              <div className="flex space-x-2 w-full mb-6">
                <Link href="/partner-with-us" className="flex-1">
                  <Button variant="secondary" className="w-full text-sm py-2">
                    Partner with us
                  </Button>
                </Link>
                <Link
                  href="https://calendly.com/sid-bains-alchemystai"
                  className="flex-1"
                >
                  <Button variant="primary" className="w-full text-sm py-2">
                    Book a demo
                  </Button>
                </Link>
              </div>
              <motion.div
                key="mainmenu"
                initial={{ opacity: 0, x: "-100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "-100%" }}
                transition={{ duration: 0.3 }}
                className="w-full space-y-2"
              >
                {menuData.map((item) => renderMobileMenuItem(item))}
                <Link
                  href="/pricing"
                  className="block py-2 text-white hover:text-orange-00 transition-colors duration-200"
                  onClick={toggleMenu}
                >
                  Pricing
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </nav>
  );
};

export default Navbar;

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { ChevronDown, ChevronRight, ChevronLeft, Menu, X } from "lucide-react";
// import Button from "../Button";
// import DropdownMenu from "./DropdownMenu";
// import { menuData, MenuObject } from "../../types/menu";

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [mounted, setMounted] = useState(false);
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);
//   const [mobileSubmenu, setMobileSubmenu] = useState<MenuObject | null>(null);
//   const navRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (navRef.current && !navRef.current.contains(event.target as Node)) {
//         setActiveMenu(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//     setMobileSubmenu(null);
//   };

//   const handleMouseEnter = (title: string) => {
//     setActiveMenu(title);
//   };

//   const handleMobileSubmenu = (item: MenuObject) => {
//     setMobileSubmenu(item);
//   };

//   const handleBackToMainMenu = () => {
//     setMobileSubmenu(null);
//   };

//   const renderMobileMenuItem = (item: MenuObject) => {
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.2 }}
//         className="w-full py-2"
//       >
//         {item.children ? (
//           <button
//             onClick={() => handleMobileSubmenu(item)}
//             className="flex items-center justify-between w-full text-white hover:text-orange-00 transition-colors duration-200"
//           >
//             <span>{item.title}</span>
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         ) : (
//           <Link
//             href={item.link || "#"}
//             className="flex items-center w-full text-white hover:text-orange-00 transition-colors duration-200"
//             onClick={toggleMenu}
//           >
//             {item.icon && (
//               <Image
//                 src={item.icon}
//                 alt={item.title}
//                 width={24}
//                 height={24}
//                 className="mr-3"
//               />
//             )}
//             <span>{item.title}</span>
//           </Link>
//         )}
//       </motion.div>
//     );
//   };

//   const renderMobileSubmenu = (item: MenuObject) => {
//     return (
//       <motion.div
//         key="submenu"
//         initial={{ opacity: 0, x: "100%" }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: "100%" }}
//         transition={{ duration: 0.3 }}
//         className="w-full"
//       >
//         <motion.button
//           onClick={handleBackToMainMenu}
//           className="flex items-center bg-gray-400 text-white py-1 px-4 pl-2 rounded-2xl mb-6"
//           whileTap={{ scale: 0.95 }}
//         >
//           <ChevronLeft className="w-5 h-5 mr-2" />
//           Back
//         </motion.button>
//         <h2 className="text-xl font-bold mb-4">{item.title}</h2>
//         {item.children?.map((subItem, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2, delay: index * 0.05 }}
//           >
//             {item.title === "Solutions" ? (
//               <div className="mb-4">
//                 <Link
//                   href={subItem.link || "#"}
//                   className="flex items-start text-white hover:text-orange-00 transition-colors duration-200"
//                   onClick={toggleMenu}
//                 >
//                   {subItem.icon && (
//                     <Image
//                       src={subItem.icon}
//                       alt={subItem.title}
//                       width={24}
//                       height={24}
//                       className="mr-3 mt-1"
//                     />
//                   )}
//                   <div>
//                     <span className="font-semibold">{subItem.title}</span>
//                     {subItem.description && (
//                       <p className="text-sm text-gray-400 mt-1">
//                         {subItem.description}
//                       </p>
//                     )}
//                   </div>
//                 </Link>
//               </div>
//             ) : (
//               renderMobileMenuItem(subItem)
//             )}
//           </motion.div>
//         ))}
//       </motion.div>
//     );
//   };

//   return (
//     <nav
//       ref={navRef}
//       className="top-0 py-4 px-8 flex justify-between items-center w-full md:w-[70%]"
//     >
//       {/* Alchemyst Logo */}
//       <div className="flex items-center space-x-4">
//         <Link href="/" className="mr-4 -ml-4">
//           <Image
//             src="/logo/alchemyst_long_dark.svg"
//             alt="Alchemyst AI"
//             width={200}
//             height={200}
//             className="h-11 w-auto -mt-4"
//           />
//         </Link>

//         {/* Nav Items Dropdown */}
//         <div className="hidden md:flex items-center space-x-4">
//           {menuData.map((item, index) => (
//             <div
//               key={index}
//               className="relative"
//               onMouseEnter={() => handleMouseEnter(item.title)}
//             >
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//               >
//                 <Link
//                   href={item.link || "#"}
//                   className={`flex items-center space-x-1 hover:text-orange-00 transition-colors duration-200 ${
//                     activeMenu === item.title ? "text-orange-00" : ""
//                   }`}
//                 >
//                   <span>{item.title}</span>
//                   {item.children && (
//                     <motion.div
//                       animate={{ rotate: activeMenu === item.title ? 180 : 0 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <ChevronDown className="w-4 h-4" />
//                     </motion.div>
//                   )}
//                 </Link>
//               </motion.div>
//             </div>
//           ))}

//           {/* Pricing Link */}
//           <Link href="/pricing">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.3, delay: 0.3 }}
//               className="hover:text-orange-00 transition-colors duration-200"
//             >
//               Pricing
//             </motion.div>
//           </Link>
//         </div>

//         {/* Centralized Dropdown Menu */}
//         <AnimatePresence>
//           {activeMenu && (
//             <DropdownMenu
//               item={menuData.find((item) => item.title === activeMenu)!}
//               isOpen={!!activeMenu}
//               onClose={() => setActiveMenu(null)}
//             />
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Partner with us button and Book a Demo */}
//       <div className="flex items-center space-x-4">
//         <div className="hidden md:flex items-center space-x-4">
//           <Link href="/partner-with-us">
//             <Button
//               variant="secondary"
//               icon={
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="w-4 h-4"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4.5 19.5l15-15m0 0H8.25m11.25 0V11.25"
//                   />
//                 </svg>
//               }
//             >
//               Partner with us
//             </Button>
//           </Link>
//           <Link href="https://calendly.com/sid-bains-alchemystai">
//             <Button variant="primary">Book a demo</Button>
//           </Link>
//         </div>
//         <button
//           className="md:hidden focus:outline-none"
//           onClick={toggleMenu}
//           aria-label="Toggle menu"
//         >
//           {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mounted && (
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               className="md:hidden fixed top-0 left-0 w-full h-screen bg-black flex flex-col items-start pt-4 px-8 space-y-4 overflow-y-auto"
//               initial={{ opacity: 0, x: "-100%" }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: "-100%" }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="flex justify-between items-center w-full mb-6">
//                 <Link href="/" onClick={toggleMenu}>
//                   <Image
//                     src="/logo/alchemyst_long_dark.svg"
//                     alt="Alchemyst AI"
//                     width={150}
//                     height={150}
//                     className="h-8 w-auto"
//                   />
//                 </Link>
//                 <button
//                   className="focus:outline-none"
//                   onClick={toggleMenu}
//                   aria-label="Close menu"
//                 >
//                   <X className="w-6 h-6 text-white" />
//                 </button>
//               </div>
//               <div className="flex space-x-2 w-full mb-6">
//                 <Link href="/partner-with-us" className="flex-1">
//                   <Button variant="secondary" className="w-full text-sm py-2">
//                     Partner with us
//                   </Button>
//                 </Link>
//                 <Link
//                   href="https://calendly.com/sid-bains-alchemystai"
//                   className="flex-1"
//                 >
//                   <Button variant="primary" className="w-full text-sm py-2">
//                     Book a demo
//                   </Button>
//                 </Link>
//               </div>
//               <AnimatePresence mode="wait">
//                 {mobileSubmenu ? (
//                   renderMobileSubmenu(mobileSubmenu)
//                 ) : (
//                   <motion.div
//                     key="mainmenu"
//                     initial={{ opacity: 0, x: "-100%" }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: "-100%" }}
//                     transition={{ duration: 0.3 }}
//                     className="w-full"
//                   >
//                     {menuData.map((item, index) => renderMobileMenuItem(item))}
//                     <Link
//                       href="/pricing"
//                       className="block py-2 text-white hover:text-orange-00 transition-colors duration-200"
//                       onClick={toggleMenu}
//                     >
//                       Pricing
//                     </Link>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
