import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { MenuObject } from "../../types/menu";

interface DropdownMenuProps {
  item: MenuObject;
  isOpen: boolean;
  onClose: () => void;
}

//  This component renders a dropdown menu for the main navigation.
const DropdownMenu: React.FC<DropdownMenuProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // This useEffect adds the mouseleave event listener to the menu element when the menu is opened. The event listener is removed when the menu is closed.
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

  useEffect(() => {
    /**
     * This useEffect sets the activeSubMenu state when the menu is opened. It does this by finding the first child of the item
     * and setting the activeSubMenu state to the title of that child.
     * The component uses the isOpen state to determine whether the menu should be rendered or not.
     */
    if (isOpen && item.title === "Product" && item.children) {
      setActiveSubMenu(item.children[0].title);
    }
  }, [isOpen, item]);

  const handleSubMenuEnter = (title: string) => {
    /**
     * This function sets the activeSubMenu state when the user enters a submenu.
     * It does this by setting the title of the submenu as the activeSubMenu state.
     */
    setActiveSubMenu(title);
  };

  // This function renders the content of the product dropdown menu.
  const renderProductContent = () => {
    // The menu is rendered based on the children of the item passed to the component. */
    const activeContent = item.children?.find(
      (child) => child.title === activeSubMenu
    );
    // If the item has no children, the component renders nothing.
    if (!activeContent) return null;

    return (
      <div className="grid grid-cols-3 gap-8">
        {activeContent.children?.map((column, index) => (
          <div key={index} className="space-y-4">
            <h4 className="font-semibold text-lg">{column.title}</h4>
            <ul className="space-y-2">
              {column.children?.map((link, idx) => (
                <li key={idx} className="list-none">
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
    // AnimatePresence to animate the nav bar menu in and out.
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
                          <h3 className="font-semibold text-lg">
                            {child.title}
                          </h3>
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

                  {/* embedding the demo yt video */}
                  <iframe
                    width="252"
                    height="142"
                    src="https://www.youtube.com/embed/m7qiEo9AXT8"
                    title="Alchemyst AI Walkthrough"
                    // @ts-ignore
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                    className="rounded-md border-b-[2px] border-yellow-700"
                  ></iframe>
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