import { getPageContent } from "@/lib/content";
import { usePageMeta } from "@/lib/usePageMeta";
import "../animations.css";
import InstagramFeed from "@/components/InstagramFeed";

interface InstagramHeader { title: string; subtitle: string; cta: { label: string; href: string } }
interface InstagramCta { heading: string; body: string; cta: { label: string; href: string } }

const Instagram = () => {
  const content = getPageContent('instagram');
  const header = content?.header as InstagramHeader | undefined;
  const cta = content?.cta as InstagramCta | undefined;
  usePageMeta(content?.meta.title, content?.meta.description);

  return (
    <div className="pt-20 animate-fadeIn">
      <header className="py-16 md:py-24 text-center bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-brand-tomato tracking-tighter">{header?.title}</h1>
          <p className="mt-4 text-xl md:text-2xl text-brand-black/80 max-w-3xl mx-auto">{header?.subtitle}</p>
          <a href={header?.cta.href} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-brand-tomato text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-tomato/90 transition-colors">
            {header?.cta.label}
          </a>
        </div>
      </header>

      <main className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <InstagramFeed />
        </div>
      </main>

      <section className="py-24 bg-brand-charcoal">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">{cta?.heading}</h2>
          <p className="max-w-2xl mx-auto text-xl text-white/90 mb-8">{cta?.body}</p>
          <a href={cta?.cta.href} target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-tomato text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-tomato/90 transition-colors">
            {cta?.cta.label}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Instagram;
