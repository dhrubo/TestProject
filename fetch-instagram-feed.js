import 'dotenv/config';
import fetch from 'node-fetch';
import fs from 'fs';

const userAccessToken = process.env.INSTAGRAM_LONG_LIVED_ACCESS_TOKEN;

if (!userAccessToken) {
  console.error('Error: INSTAGRAM_LONG_LIVED_ACCESS_TOKEN environment variable not set in .env file.');
  process.exit(1);
}

async function getInstagramFeed() {
  try {
    const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${userAccessToken}`);
    const data = await response.json();

    if (data.data) {
      fs.writeFileSync('src/data/instagram-feed.json', JSON.stringify(data.data, null, 2));
      console.log('Successfully fetched and saved Instagram feed.');
    } else {
      console.error('Error fetching Instagram feed:', data);
    }
  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
  }
}

getInstagramFeed();
