import 'dotenv/config';
import https from 'https';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const appId = process.env.INSTAGRAM_APP_ID;
const appSecret = process.env.INSTAGRAM_APP_SECRET;
const redirectUri = 'https://localhost:3000/auth/facebook/callback'; // This can be any valid URI

if (!appId || !appSecret) {
  console.error('Error: INSTAGRAM_APP_ID and INSTAGRAM_APP_SECRET environment variables not set in .env file.');
  process.exit(1);
}

const authUrl = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=instagram_basic,pages_show_list`;

console.log('Please open the following URL in your browser and authorize the app:');
console.log(authUrl);

rl.question('Please paste the "code" from the redirect URL: ', (code) => {
  getShortLivedToken(code);
  rl.close();
});

function getShortLivedToken(code) {
  const options = {
    hostname: 'graph.facebook.com',
    path: `/v13.0/oauth/access_token?client_id=${appId}&redirect_uri=${redirectUri}&client_secret=${appSecret}&code=${code}`,
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200) {
        const accessToken = JSON.parse(data).access_token;
        console.log('Successfully obtained short-lived access token.');
        getLongLivedToken(accessToken);
      } else {
        console.error(`Error getting short-lived token: API returned status code ${res.statusCode}`);
        console.error('Response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error making request to get short-lived token:', error);
  });

  req.end();
}

function getLongLivedToken(shortLivedToken) {
    const options = {
        hostname: 'graph.facebook.com',
        path: `/v13.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedToken}`,
        method: 'GET'
    };

    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            if (res.statusCode === 200) {
                const longLivedToken = JSON.parse(data).access_token;
                console.log('Successfully obtained long-lived access token:');
                console.log(longLivedToken);
            } else {
                console.error(`Error getting long-lived token: API returned status code ${res.statusCode}`);
                console.error('Response:', data);
            }
        });
    });

    req.on('error', (error) => {
        console.error('Error making request to get long-lived token:', error);
    });

    req.end();
}
