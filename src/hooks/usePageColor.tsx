import { useEffect } from "react";

const pageColors: Record<string, string> = {
  index: "bg-brand-off-white",
  about: "bg-brand-story-bg",
  contact: "bg-brand-contact-bg",
};

export function usePageColor(page: string) {
  useEffect(() => {
    const color = pageColors[page] || "bg-brand-off-white";
    document.body.className = color;
    return () => {
      document.body.className = "";
    };
  }, [page]);
}
