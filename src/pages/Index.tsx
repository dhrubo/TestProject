import SectionRenderer from "@/components/sections/SectionRenderer";
import { getPageContent } from "@/lib/content";
import { useEffect } from "react";
import "../animations.css";
import { usePageColor } from "@/hooks/usePageColor";

// Simple hook for meta (could be expanded later)
function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', description);
      else {
        const m = document.createElement('meta');
        m.name = 'description';
        m.content = description;
        document.head.appendChild(m);
      }
    }
  }, [title, description]);
}

const Index = () => {
  const content = getPageContent('index');
  usePageMeta(content?.meta.title, content?.meta.description);
  usePageColor('index');
  return (
    <div className="min-h-screen animate-fadeIn">
      {content?.sections?.map((s, i) => <SectionRenderer key={i} section={s} />)}
    </div>
  );
};

export default Index;
