import { useEffect, useState } from "react";
import SocialShare from "./social-share";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content?: string;
  title: string;
  url: string;
  containerId?: string;
}

export default function TableOfContents({ content = "", title, url, containerId }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    let headings: NodeListOf<Element> | Element[] = [] as any;
    if (containerId) {
      const container = document.getElementById(containerId);
      if (container) {
        headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
      }
    }
    if (!containerId || (headings as any).length === 0) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    }
    
    const items: TOCItem[] = Array.from(headings).map((heading, index) => {
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName.charAt(1));
      const id = heading.id || `heading-${index}`;
      
      if (containerId && !heading.id) {
        (heading as HTMLElement).id = id;
      }
      
      return { id, text, level };
    });

    setTocItems(items);
  }, [content, containerId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div className="xl:sticky xl:top-24 xl:mt-12 mt-6 space-y-6">
      <div className="bg-card rounded-xl border p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <h3 className="text-base xl:text-lg font-semibold text-foreground">Table of Contents</h3>
        </div>
        <nav className="space-y-2 xl:space-y-3 pl-2 border-l border-muted">
          {tocItems.map(({ id, text, level }) => (
            <button
              key={id}
              onClick={() => scrollToHeading(id)}
              className={`
                block w-full text-left text-xs xl:text-sm transition-colors duration-200 rounded-md px-2 xl:px-3 py-1
                ${level === 1 ? 'font-semibold text-foreground' : 'text-muted-foreground'}
                ${level === 2 ? 'ml-2 xl:ml-3' : ''}
                ${level >= 3 ? 'ml-4 xl:ml-6' : ''}
                ${activeId === id 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'hover:bg-muted/50 hover:text-foreground'
                }
              `}
            >
              {text}
            </button>
          ))}
        </nav>
        
        {/* Social Share Section */}
        <SocialShare title={title} url={url} />
      </div>
    </div>
  );
} 