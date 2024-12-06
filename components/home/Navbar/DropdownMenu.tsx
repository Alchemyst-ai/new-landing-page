import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from 'lucide-react';
import { MenuObject } from "../../types/menu";

// Props interface for the DropdownMenu component
interface DropdownMenuProps {
  item: MenuObject;
  isOpen: boolean;
  onClose: () => void;
}

// DropdownMenu component
const DropdownMenu: React.FC<DropdownMenuProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);


  // useEffect to handle mouse leave to close the menu
  useEffect(() => {
    const handleMouseLeave = () => {
      onClose();
    };

    if (menuRef.current) {
      menuRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (menuRef.current) {
        menuRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [onClose]);


  // Function to set active submenu on hover
  const handleSubMenuEnter = (title: string) => {
    setActiveSubMenu(title);
  };


  // Function to render the content of the "Product" submenu
  const renderProductContent = () => {
    const activeContent = item.children?.find(
      (child) => child.title === activeSubMenu
    );
    if (!activeContent) return null;


    return (
      <div className="grid grid-cols-3 gap-8">
        {activeContent.children?.map((column, index) => (
          <div key={index} className="space-y-4">
            <h4 className="font-semibold text-lg">{column.title}</h4>
            <ul className="space-y-2">
              {column.children?.map((link, idx) => (
                <li
                  key={idx}
                  className="list-none"
                >
                  <Link
                    href={link.link || "#"}
                    className="flex items-center space-x-2 hover:text-yellow-500 transition-colors duration-200"
                  >
                    {link.icon && (
                      <Image
                        src={link.icon}
                        alt={link.title}
                        width={20}
                        height={20}
                      />
                    )}
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="flex absolute left-36 w-[80%] h-fit top-full bg-gradient-to-b from-[#0a0a0a] to-[#2c2c2c] rounded-[10px] border-b-[2px] border-yellow-700"
        >
          <div className="container mx-auto px-6 py-6">
            {item.title === "Product" ? (
              <div>
                <div className="flex space-x-4 mb-6">
                  {item.children?.map((subMenu, index) => (
                    <div
                      key={index}
                      className="relative"
                      onMouseEnter={() => handleSubMenuEnter(subMenu.title)}
                    >
                      <button
                        className={`flex items-center space-x-1 hover:text-yellow-500 transition-colors duration-200 ${
                          activeSubMenu === subMenu.title
                            ? "text-yellow-500"
                            : ""
                        }`}
                        style={subMenu.style}
                      >
                        <span>{subMenu.title}</span>
                        <motion.div
                          animate={{
                            rotate: activeSubMenu === subMenu.title ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>
                    </div>
                  ))}
                </div>
                {renderProductContent()}
              </div>
            ) : item.title === "Solutions" ? (
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 grid grid-cols-2 gap-6">
                  {item.children?.map((child, index) => (
                    <div key={index} className="space-y-2">
                      <Link
                        href={child.link || "#"}
                        className="flex items-start hover:text-yellow-500 transition-colors duration-200"
                      >
                        {child.icon && (
                          <Image
                            src={child.icon}
                            alt={child.title}
                            width={30}
                            height={30}
                            className="mr-3 mt-1"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold text-lg">{child.title}</h3>
                          {child.description && (
                            <p className="text-sm text-gray-400">
                              {child.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center justify-center">
                  <h3 className="font-semibold text-lg mb-4">
                    Watch our latest demo
                  </h3>
                  <a
                    href="https://youtu.be/_HZM0QiuUS8?si=qaXE1-2fUBMfFtVS"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      width={200}
                      height={200}
                      src="/demo-img.png"
                      alt="Demo Image"
                      className="rounded-md border-b-[2px] border-yellow-700"
                    />
                  </a>
                </div>
              </div>
            ) : item.title === "Resources" ? (
              <div className="grid grid-cols-3 gap-6">
                {item.children?.map((child, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="font-semibold text-lg">{child.title}</h3>
                    {child.children && (
                      <ul className="space-y-2 list-none">
                        {child.children.map((grandchild, idx) => (
                          <li key={idx} className="list-none">
                            <Link
                              href={grandchild.link || "#"}
                              className="flex items-center space-x-2 hover:text-yellow-500 transition-colors duration-200"
                            >
                              {grandchild.icon && (
                                <Image
                                  src={grandchild.icon}
                                  alt={grandchild.title}
                                  width={20}
                                  height={20}
                                />
                              )}
                              <span>{grandchild.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {item.children?.map((child, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="font-semibold text-lg">{child.title}</h3>
                    {child.children ? (
                      <ul className="space-y-2 list-none">
                        {child.children.map((grandchild, idx) => (
                          <li key={idx} className="list-none">
                            <Link
                              href={grandchild.link || "#"}
                              className="flex items-center space-x-2 hover:text-yellow-500 transition-colors duration-200"
                            >
                              {grandchild.icon && (
                                <Image
                                  src={grandchild.icon}
                                  alt={grandchild.title}
                                  width={20}
                                  height={20}
                                />
                              )}
                              <span>{grandchild.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <Link
                        href={child.link || "#"}
                        className="flex items-center space-x-2 hover:text-yellow-500 transition-colors duration-200"
                      >
                        {child.icon && (
                          <Image
                            src={child.icon}
                            alt={child.title}
                            width={50}
                            height={50}
                            className="mr-2"
                          />
                        )}
                        <div>
                          <span>{child.title}</span>
                          {child.description && (
                            <p className="text-sm text-gray-400">
                              {child.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;

