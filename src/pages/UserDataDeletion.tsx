import { getPageContent } from "@/lib/content";
import { usePageMeta } from "@/lib/usePageMeta";
import "../animations.css";
import { useEffect, useState } from "react";

declare global {
    interface Window {
        FB: any;
        handleDataDeletion: () => void;
    }
}

interface UserDataDeletionHeader { title: string; subtitle: string }
interface UserDataDeletionContent { heading: string; body: string }

const UserDataDeletion = () => {
  const content = getPageContent('user-data-deletion');
  const header = content?.header as UserDataDeletionHeader | undefined;
  const deletionContent = content?.content as UserDataDeletionContent[] | undefined;
  usePageMeta(content?.meta.title, content?.meta.description);
  const [deletionStatus, setDeletionStatus] = useState('');
  const [isTestMode, setIsTestMode] = useState(false);

  const handleDataDeletion = () => {
    let userId = localStorage.getItem('instagram_user_id');
    let accessToken = localStorage.getItem('instagram_access_token');

    if (isTestMode) {
        // Use dummy data for testing
        userId = 'TEST_USER_ID';
        accessToken = 'TEST_ACCESS_TOKEN';
    }

    if (!userId || !accessToken) {
      setDeletionStatus('No user data found to delete.');
      return;
    }

    if (isTestMode) {
        // In test mode, we don't call the Facebook API
        localStorage.removeItem('instagram_user_id');
        localStorage.removeItem('instagram_access_token');
        setDeletionStatus('Test data has been successfully deleted.');
        return;
    }

    // Call Facebook's API to revoke permissions
    window.FB.api(`/${userId}/permissions`, 'delete', { access_token: accessToken }, (response: any) => {
      if (response && !response.error) {
        // Clear local storage
        localStorage.removeItem('instagram_user_id');
        localStorage.removeItem('instagram_access_token');
        setDeletionStatus('Your data has been successfully deleted.');
      } else {
        setDeletionStatus('An error occurred while deleting your data.');
        console.error('Error revoking permissions:', response.error);
      }
    });
  };

  useEffect(() => {
    window.handleDataDeletion = handleDataDeletion;
  }, []);

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
              <div className="text-center p-4 border-2 border-dashed border-gray-400 rounded-md">
                <h3 className="text-2xl font-bold text-brand-tomato mb-4">For App Reviewers</h3>
                <p className="mb-4">To test the data deletion callback, please enable Test Mode. This will simulate a logged-in user.</p>
                <label className="flex items-center justify-center">
                    <input type="checkbox" checked={isTestMode} onChange={() => setIsTestMode(!isTestMode)} className="mr-2" />
                    Enable Test Mode
                </label>
              </div>
              <div className="text-center">
                <button onClick={handleDataDeletion} className="bg-brand-tomato text-white px-6 py-3 rounded-md">
                  Delete My Data
                </button>
                {deletionStatus && <p className="mt-4">{deletionStatus}</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDataDeletion;
