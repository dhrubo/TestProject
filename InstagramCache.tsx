import React, { useEffect, useState } from "react";

const CACHE_DIR = "/instagram-cache";

const InstagramCache: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the list of images from the cache directory
    async function fetchImages() {
      try {
        const res = await fetch(`${CACHE_DIR}/index.json`);
        if (!res.ok) throw new Error("No index.json found");
        const files = await res.json();
        setImages(files.filter((f: string) => f.match(/\.(jpg|jpeg|png|webp)$/i)));
      } catch {
        // fallback: try to guess file names (not robust)
        setImages([]);
      }
    }
    fetchImages();
  }, []);

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Instagram Cached Images</h1>
      {images.length === 0 ? (
        <div>No images found in cache.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {images.map((img) => (
            <div key={img} className="rounded shadow p-2 bg-white">
              <img src={`${CACHE_DIR}/${img}`} alt="Instagram cached" className="w-full h-auto object-cover rounded" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstagramCache;
