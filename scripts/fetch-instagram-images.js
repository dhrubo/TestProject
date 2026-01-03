
// Simple script to fetch Instagram images and cache them locally
// Usage: node scripts/fetch-instagram-images.js

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const USER_ID = process.env.INSTAGRAM_USER_ID;
const OUT_DIR = path.resolve(__dirname, '../public/instagram-cache');

if (!ACCESS_TOKEN || !USER_ID) {
  console.error('Missing INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_USER_ID in .env');
  process.exit(1);
}

async function fetchInstagramMedia() {
  const url = `https://graph.instagram.com/${USER_ID}/media?fields=id,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${ACCESS_TOKEN}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch Instagram media: ${res.statusText}`);
  }
  const data = await res.json();
  return data.data || [];
}

async function downloadImage(url, filename) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download image: ${url}`);
  const dest = fs.createWriteStream(filename);
  await new Promise((resolve, reject) => {
    res.body.pipe(dest);
    res.body.on('error', reject);
    dest.on('finish', resolve);
  });
}

(async () => {
  try {
    if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
    const media = await fetchInstagramMedia();
    let count = 0;
    for (const item of media) {
      if (item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM') {
        const imgUrl = item.media_url;
        const ext = path.extname(imgUrl).split('?')[0] || '.jpg';
        const filename = path.join(OUT_DIR, `${item.id}${ext}`);
        await downloadImage(imgUrl, filename);
        count++;
      }
    }
    console.log(`Downloaded ${count} images to ${OUT_DIR}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
