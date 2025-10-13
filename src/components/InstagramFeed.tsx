import { useState, useEffect } from 'react';
import instagramFeed from '@/data/instagram-feed.json';

const InstagramFeed = () => {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    setImages(instagramFeed);
  }, []);

  return (
    <div>
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="aspect-w-1 aspect-h-1">
              <a href={image.permalink} target="_blank" rel="noopener noreferrer">
                <img src={image.media_url} alt={image.caption} className="object-cover w-full h-full rounded-lg" />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No images to display.</p>
      )}
    </div>
  );
};

export default InstagramFeed;
