import { getPageContent } from "@/lib/content";
import { usePageMeta } from "@/lib/usePageMeta";
import "../animations.css";

interface UserDataDeletionHeader { title: string; subtitle: string }
interface UserDataDeletionContent { heading: string; body: string }

const UserDataDeletion = () => {
  const content = getPageContent('user-data-deletion');
  const header = content?.header as UserDataDeletionHeader | undefined;
  const deletionContent = content?.content as UserDataDeletionContent[] | undefined;
  usePageMeta(content?.meta.title, content?.meta.description);

  return (
    <div className="pt-20 animate-fadeIn">
      <header className="py-16 md:py-24 text-center bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-brand-tomato tracking-tighter">{header?.title}</h1>
          <p className="mt-4 text-xl md:text-2xl text-brand-black/80 max-w-3xl mx-auto">{header?.subtitle}</p>
        </div>
      </header>

      <main className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-lg text-brand-black/80 leading-relaxed space-y-8">
              {deletionContent?.map((section: UserDataDeletionContent, i: number) => (
                <div key={i}>
                  <h2 className="text-3xl font-bold text-brand-tomato mb-4">{section.heading}</h2>
                  <p>{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDataDeletion;
